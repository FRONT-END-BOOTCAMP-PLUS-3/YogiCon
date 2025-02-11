import { useUserStore } from '@/stores/userStore';

export async function getUserInfo(accessToken: string) {
  if (!accessToken) {
    throw new Error('access token 없음');
  }

  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

  try {
    const response = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch user info');
    }

    //zustand 저장
    useUserStore.getState().setUserData(data);

    //localStorage.setItem('user_info', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('사용자 정보 요청 중 오류 발생:', error);
    throw error;
  }
}
