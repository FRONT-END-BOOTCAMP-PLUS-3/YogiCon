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

// 구독 정보를 저장할 파일 경로
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const subscriptionsFile = join(__dirname, 'subscriptions.json');

app.prepare().then(() => {
  const server = express();
  server.use(json());

  // 🔹 푸시 구독 엔드포인트
  server.post('/api/user/subscription', (req, res) => {
    const subscription = req.body;

    let subscriptions = [];
    if (existsSync(subscriptionsFile)) {
      subscriptions = JSON.parse(readFileSync(subscriptionsFile, 'utf8'));
    }

    if (!subscriptions.some((sub) => sub.endpoint === subscription.endpoint)) {
      subscriptions.push(subscription);
      writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
    }

    res.status(201).json({ message: '구독 완료' });
  });

  // 🔹 푸시 메시지 전송 엔드포인트
  server.post('/api/user/notifications', (req, res) => {
    if (!existsSync(subscriptionsFile)) {
      return res.status(404).json({ message: '구독자가 없습니다.' });
    }

    const subscriptions = JSON.parse(readFileSync(subscriptionsFile, 'utf8'));
    const notificationPayload = JSON.stringify({
      title: '📢 새로운 푸시 알림!',
      message: 'Next.js에서 FCM 없이 푸시 알림을 보냅니다!',
    });

    Promise.all(
      subscriptions.map((sub) =>
        webpush.sendNotification(sub, notificationPayload)
      )
    ).then(() => {
      res.status(200).json({ message: '푸시 전송 완료' });
    });
  });

  // 🔹 Next.js의 페이지 요청 처리
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // http 서버 실행
  // server.listen(PORT, (err) => {
  //   if (err) throw err;
  //   console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  // });

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
