// /app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { loginUsecase } from '@/application/usecases/user/logInUseCase';
import { loadUserUsecase } from '@/application/usecases/user/loadUserUsecase';
import { deleteUserUsecase } from '@/application/usecases/user/deleteUserUseCase';
import { SbUserRepository } from '@/infrastructure/repositories/SbUserRepository';

export async function POST(request: NextRequest) {
  try {
    const { action, authCode, accessToken, userId } = await request.json();

    if (action === 'login') {
      const token = await loginUsecase(authCode);
      return NextResponse.json({ token });
    } else if (action === 'loadUser') {
      const userInfo = await loadUserUsecase(accessToken);
      const registeredUserInfo = await SbUserRepository(userInfo);
      return NextResponse.json(registeredUserInfo);
    } else if (action === 'deleteAccount') {
      await deleteUserUsecase(accessToken, userId);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
