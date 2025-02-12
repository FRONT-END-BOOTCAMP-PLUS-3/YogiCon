export async function loadUserUsecase(accessToken: string): Promise<any> {
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

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

  return data;
}
