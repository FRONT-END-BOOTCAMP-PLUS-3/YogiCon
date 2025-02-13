import { NextResponse } from 'next/server';
import { sendNotifications } from '../../../cron/sendNotifications';

export async function GET() {
  try {
    await sendNotifications();
    return NextResponse.json({ message: '알림 전송 완료' }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
