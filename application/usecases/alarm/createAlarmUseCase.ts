import { AlarmRepository } from '@/domain/repositories/AlarmRepository';
import { CreateAlarmDto } from './dto/CreateAlarmDto';

export const createAlarmUseCase = async (
  alarmInfo: CreateAlarmDto,
  alarmRepository: AlarmRepository
): Promise<void> => {
  const userId = 'fc0e7623-88a7-4312-969f-7d57b8df2501';

  const newAlarm = {
    id: alarmInfo.id,
    daysBefore: alarmInfo.daysBefore,
    hour: alarmInfo.period === '오후' ? alarmInfo.time + 12 : alarmInfo.time,
    userId: userId,
  };

  alarmRepository.createOne(newAlarm);
};
