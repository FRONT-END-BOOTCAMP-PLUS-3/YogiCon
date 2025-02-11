export async function getAccessToken(authCode: string) {
  if (!authCode) {
    throw new Error('Authorization code is missing');
  }

  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const redirectUri = 'http://localhost:3000/auth/callback';
  const tokenUrl = 'https://kauth.kakao.com/oauth/token';

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId!,
    redirect_uri: redirectUri!,
    code: authCode,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: params.toString(),
    });

    const data: { access_token?: string; error?: string } =
      await response.json();

    if (!response.ok || !data.access_token) {
      throw new Error(data.error);
    }
    return data.access_token;
  } catch (error) {
    throw error;
  }
}
