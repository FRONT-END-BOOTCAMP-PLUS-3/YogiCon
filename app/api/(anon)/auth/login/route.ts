// app/api/login/auth/kakao/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Kakao 설정이 누락되었습니다.' },
      { status: 500 }
    );
  }

  // Kakao OAuth 인가 URL 구성
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code`;

  // 카카오 인증 페이지로 리다이렉트
  return NextResponse.redirect(kakaoAuthUrl);
}
