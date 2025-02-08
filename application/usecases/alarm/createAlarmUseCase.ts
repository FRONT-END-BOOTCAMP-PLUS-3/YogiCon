import { AlarmRepository } from '@/domain/repositories/AlarmRepository';
import { CreateAlarmDto } from './dto/CreateAlarmDto';
import { AlarmDto } from './dto/AlarmDto';

export const createAlarmUseCase = async (
  alarmInfo: CreateAlarmDto,
  alarmRepository: AlarmRepository
): Promise<AlarmDto> => {
  const userId = 'fc0e7623-88a7-4312-969f-7d57b8df2501';

  const newAlarm = {
    id: '',
    daysBefore: alarmInfo.daysBefore,
    hour: alarmInfo.period === '오후' ? alarmInfo.time + 12 : alarmInfo.time,
    userId: userId,
  };

  const createdAlarm = await alarmRepository.createOne(newAlarm);
  const createdAlarmDto = {
    id: createdAlarm.id,
    daysBefore: createdAlarm.daysBefore,
    period: (createdAlarm.hour < 12 ? '오전' : '오후') as '오전' | '오후',
    time: createdAlarm.hour % 12,
  };

  return createdAlarmDto;
};
