import { sendPushNotification } from '@/utils/webPush';
import { NextResponse } from 'next/server';
import webPush from 'web-push';

// VAPID 키 (환경 변수에서 불러오기)
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webPush.setVapidDetails(
  'mailto:mac52485@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(req: Request) {
  try {
    const { subscription, title, body } = await req.json(); // 클라이언트에서 받은 구독 정보

    await sendPushNotification(subscription, title, body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('푸시 전송 실패:', error);
    return NextResponse.json({ error: '푸시 전송 실패' }, { status: 500 });
  }
}
