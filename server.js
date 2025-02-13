import dotenv from 'dotenv';
import express, { json } from 'express';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import https from 'https';
import next from 'next';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import webpush from 'web-push';

dotenv.config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

webpush.setVapidDetails(
  'mailto:mac52485@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabaseHeader = {
  apikey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, // Supabase API 키
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`, // 인증 토큰
  'Content-Type': 'application/json',
};

// 구독 정보를 저장할 파일 경로
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const subscriptionsFile = join(__dirname, 'subscriptions.json');

app.prepare().then(() => {
  const server = express();
  server.use(json());

  // 푸시 구독 엔드포인트
  server.post('/api/user/subscription', (req, res) => {
    const { userId } = req.query;
    const subscription = req.body;

    let subscriptions = [];
    if (existsSync(subscriptionsFile)) {
      subscriptions = JSON.parse(readFileSync(subscriptionsFile, 'utf8'));
    }

    if (
      !subscriptions.some(
        (sub) => sub.subscription.endpoint === subscription.endpoint
      )
    ) {
      subscriptions.push({ userId, subscription });
      writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
    }

    res.status(201).json({ message: '구독 완료' });
  });

  // Next.js의 페이지 요청 처리
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // HTTPS 서버 생성 및 실행
  const httpsOptions = {
    key: readFileSync('localhost-key.pem'),
    cert: readFileSync('localhost.pem'),
  };
  https.createServer(httpsOptions, server).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`🚀 HTTPS 서버 실행 중: https://localhost:${PORT}`);
  });
});

/* ------------------------------------ - ----------------------------------- */

// 현재 시간으로부터 다음 정각까지의 시간 차이를 계산하는 함수
function getTimeUntilNextHour() {
  const now = new Date();
  const nextHour = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes() + 1,
    0,
    0
  );
  return nextHour - now;
}

// 목표 시간이 되었는지 확인하는 함수
function isAlarmTime(currentTime = new Date(), alarm, gift) {
  const targetTime = new Date(gift.due_date);
  targetTime.setDate(targetTime.getDate() - alarm.days_before);
  targetTime.setHours(alarm.hour, 0, 0, 0);

  return currentTime.getTime() === targetTime.getTime();
}

// 알림을 보내는 함수
async function sendNotifications(currentTime, userId, subscription) {
  if (!existsSync(subscriptionsFile)) {
    return;
  }

  const alarmResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/alarm?select=*&user_id=eq.${userId}&order=days_before.asc%2Chour.asc`,
    {
      method: 'GET',
      headers: supabaseHeader,
    }
  );
  if (!alarmResponse.ok) {
    throw new Error(`Supabase 요청 실패: ${alarmResponse.statusText}`);
  }
  const alarms = await alarmResponse.json();

  const giftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/gift?select=*&owner_user_id=eq.${userId}&order=due_date.asc`,
    {
      method: 'GET',
      headers: supabaseHeader,
    }
  );
  if (!giftResponse.ok) {
    throw new Error(`Supabase 요청 실패: ${giftResponse.statusText}`);
  }
  const gifts = await giftResponse.json();

  let alarmGifts = [];

  alarms.forEach((alarm) => {
    gifts.forEach((gift) => {
      if (isAlarmTime(currentTime, alarm, gift))
        alarmGifts.push({ ...gift, days_before: alarm.days_before });
    });
  });

  await Promise.all(
    alarmGifts.map((alarmGift) => {
      const notificationPayload = JSON.stringify({
        title: '📢 기프티콘 유효기간이 얼마 남지 않았어요!',
        body: `${alarmGift.product_name} 기프티콘이 ${alarmGift.days_before}일 뒤에 사라져요!`,
        link: `/user/gifts/${alarmGift.id}`,
      });

      return webpush.sendNotification(subscription, notificationPayload);
    })
  ).catch((err) => {
    console.error(err);
  });
}

// 매 시 정각에 실행될 함수
async function runScheduledNotifications() {
  const now = new Date();
  const currentTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    0,
    0
  );

  for (const { userId, subscription } of subscriptions) {
    try {
      await sendNotifications(currentTime, userId, subscription);
      console.log('알림 전송 완료');
    } catch (err) {
      console.error(`알림 전송 실패: ${err.message}`);
    }
  }

  // 다음 정각에 맞춰 다시 실행되도록 `setTimeout`으로 재설정
  const timeUntilNextHour = getTimeUntilNextHour();
  setTimeout(runScheduledNotifications, timeUntilNextHour);
}

// 첫 실행 (정각에 맞춰 실행)
const timeUntilNextHour = getTimeUntilNextHour();
setTimeout(runScheduledNotifications, timeUntilNextHour); // 첫 실행
