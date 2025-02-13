import webpush from 'web-push';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const subscriptionsFile = join(process.cwd(), 'subscriptions.json');

webpush.setVapidDetails(
  'mailto:mac52485@gmail.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendNotifications() {
  if (!existsSync(subscriptionsFile)) return;

  const subscriptions = JSON.parse(readFileSync(subscriptionsFile, 'utf8'));
  for (const { userId, subscription } of subscriptions) {
    try {
      const alarms = await fetchAlarms(userId);
      const gifts = await fetchGifts(userId);
      const notifications = prepareNotifications(alarms, gifts);

      await Promise.all(
        notifications.map((notification) =>
          webpush.sendNotification(subscription, JSON.stringify(notification))
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) console.error(`알림 전송 실패: ${err.message}`);
    }
  }
}

async function fetchAlarms(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/alarm?select=*&user_id=eq.${userId}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  return res.ok ? res.json() : [];
}

async function fetchGifts(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/gift?select=*&owner_user_id=eq.${userId}`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    }
  );
  return res.ok ? res.json() : [];
}

function prepareNotifications(alarms: any[], gifts: any[]) {
  const now = new Date();
  const currentTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    0,
    0,
    0
  );

  return alarms.flatMap((alarm) =>
    gifts
      .filter((gift) => isAlarmTime(currentTime, alarm, gift))
      .map((gift) => ({
        title: '📢 기프티콘 유효기간 알림',
        body: `${gift.product_name} 기프티콘이 ${alarm.days_before}일 뒤에 만료됩니다!`,
        link: `/user/gifts/${gift.id}`,
      }))
  );
}

function isAlarmTime(currentTime: Date, alarm: any, gift: any) {
  const targetTime = new Date(gift.due_date);
  targetTime.setDate(targetTime.getDate() - alarm.days_before);
  targetTime.setHours(alarm.hour, 0, 0, 0);

  return currentTime.getTime() === targetTime.getTime();
}
