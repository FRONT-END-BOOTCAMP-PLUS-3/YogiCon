// /app/api/user/subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const subscriptionsFile = join(process.cwd(), 'subscriptions.json');

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const subscription = await req.json();

  let subscriptions = [];
  if (existsSync(subscriptionsFile)) {
    subscriptions = JSON.parse(readFileSync(subscriptionsFile, 'utf8'));
  }

  if (
    !subscriptions.some(
      (sub: { userId: string; subscription: PushSubscription }) =>
        sub.subscription.endpoint === subscription.endpoint
    )
  ) {
    subscriptions.push({ userId, subscription });
    writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
  }

  return NextResponse.json({ message: '구독 완료' }, { status: 201 });
}
