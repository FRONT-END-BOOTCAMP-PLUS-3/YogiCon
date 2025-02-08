import { createAlarmUseCase } from '@/application/usecases/alarm/createAlarmUseCase';
import { deleteAlarmUseCase } from '@/application/usecases/alarm/deleteAlarmUseCase';
import { AlarmDto } from '@/application/usecases/alarm/dto/AlarmDto';
import { getAlarmsUseCase } from '@/application/usecases/alarm/getAlarmsUseCase';
import { AlarmRepository } from '@/domain/repositories/AlarmRepository';
import { SbAlarmRepository } from '@/infrastructure/repositories/SbAlarmRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const alarmRepository: AlarmRepository = new SbAlarmRepository();

  const AlarmsDto: AlarmDto[] = await getAlarmsUseCase(alarmRepository);

  return NextResponse.json(AlarmsDto);
}

export async function POST(req: Request) {
  const newAlarm = await req.json();

  if (!newAlarm) {
    return NextResponse.json(
      { error: '알람 정보가 필요합니다.' },
      { status: 400 }
    );
  }

  const alarmRepository: AlarmRepository = new SbAlarmRepository();

  await createAlarmUseCase(newAlarm, alarmRepository);

  return NextResponse.json({ message: `알람 생성 완료` }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: 'alarmId가 필요합니다.' },
      { status: 400 }
    );
  }

  const alarmRepository: AlarmRepository = new SbAlarmRepository();

  await deleteAlarmUseCase(id, alarmRepository);

  return NextResponse.json(
    { message: `id=${id} 알람 삭제 완료` },
    { status: 200 }
  );
}
