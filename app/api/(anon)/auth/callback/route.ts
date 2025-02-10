import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('[Kakao Callback] 요청 URL:', request.url);

  // URL에서 query parameter 추출
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  console.log('[Kakao Callback] 전달된 코드:', code);

  if (!code) {
    console.error('[Kakao Callback] 인가 코드가 누락되었습니다.');
    return NextResponse.json(
      { error: '인가 코드가 전달되지 않았거나 올바르지 않습니다.' },
      { status: 400 }
    );
  }

  try {
    console.log('[Kakao Callback] 토큰 교환 요청 시작');
    // 1. 인가 코드를 액세스 토큰으로 교환
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        code: code,
      }),
    });
    const tokenData = await tokenResponse.json();
    console.log('[Kakao Callback] 토큰 응답:', tokenData);

    if (tokenData.error) {
      console.error(
        '[Kakao Callback] 토큰 에러:',
        tokenData.error,
        tokenData.error_description
      );
      return NextResponse.json(
        {
          error: tokenData.error,
          error_description: tokenData.error_description,
        },
        { status: 400 }
      );
    }

    const { access_token } = tokenData;
    console.log('[Kakao Callback] Access Token:', access_token);

    console.log('[Kakao Callback] 사용자 정보 요청 시작');
    // 2. 액세스 토큰으로 카카오 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const kakaoUser = await userResponse.json();
    console.log('[Kakao Callback] Kakao 사용자 정보:', kakaoUser);

    const kakaoId = kakaoUser.id;
    const kakaoAccount = kakaoUser.kakao_account || {};
    const email = kakaoAccount.email;
    const nickname = kakaoAccount.profile?.nickname;
    const profile_image = kakaoAccount.profile?.profile_image_url;
    console.log('[Kakao Callback] 파싱된 사용자 정보:', {
      kakaoId,
      email,
      nickname,
      profile_image,
    });

    console.log('[Kakao Callback] Supabase에서 사용자 조회 시작');
    // 3. Supabase의 users 테이블에서 해당 카카오 ID로 사용자 조회 (없으면 생성)
    let { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', kakaoId)
      .single();
    console.log('[Kakao Callback] Supabase 조회 결과:', { user, error });

    if (error || !user) {
      console.log(
        '[Kakao Callback] 사용자가 존재하지 않습니다. 새 사용자 삽입 시도'
      );
      const { data: newUser, error: insertError } = await supabase
        .from('user')
        .insert({
          id: kakaoId,
          email: email,
          nickname: nickname,
          profile_image: profile_image,
        })
        .select('*')
        .single();

      if (insertError) {
        console.error(
          '[Kakao Callback] 사용자 삽입 에러:',
          insertError.message
        );
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
      user = newUser;
      console.log('[Kakao Callback] 새 사용자 생성 완료:', user);
    } else {
      console.log('[Kakao Callback] 기존 사용자 조회 완료:', user);
    }

    return NextResponse.redirect(new URL('/user', request.url));
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
