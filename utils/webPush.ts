import webPush from 'web-push';

webPush.setVapidDetails(
  'mailto:mac52485@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const sendPushNotification = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription: any,
  title: string,
  body: string
) => {
  const payload = JSON.stringify({ title, body });

  await webPush.sendNotification(subscription, payload);
};
