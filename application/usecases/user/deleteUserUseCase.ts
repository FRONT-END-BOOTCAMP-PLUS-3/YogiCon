// /usecases/logoutUsecase.ts
import { supabase } from '@/utils/supabase/supabase';

export async function deleteUserUsecase(
  accessToken: string,
  userId: string
): Promise<void> {
  // 카카오 계정 연동 해제 요청
  const kakaoResponse = await fetch('https://kapi.kakao.com/v1/user/unlink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  const kakaoData = await kakaoResponse.json();
  if (!kakaoResponse.ok) {
    throw new Error(
      kakaoData.error_description || 'Failed to unlink Kakao account'
    );
  }

  // Supabase에서 사용자 삭제
  const { error } = await supabase.from('user').delete().eq('id', userId);
  if (error) {
    throw new Error(error.message);
  }
}
