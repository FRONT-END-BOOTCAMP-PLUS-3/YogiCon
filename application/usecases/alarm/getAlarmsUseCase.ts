import { AlarmRepository } from '@/domain/repositories/AlarmRepository';
import { AlarmDto } from './dto/AlarmDto';

export const getAlarmsUseCase = async (
  alarmRepository: AlarmRepository,
  userId: string
): Promise<AlarmDto[]> => {
  const alarms = await alarmRepository.getAll(userId);

  return alarms.map((alarm) => ({
    id: alarm.id,
    daysBefore: alarm.daysBefore,
    period: alarm.hour < 12 ? '오전' : '오후',
    time: alarm.hour % 12,
  }));
};
