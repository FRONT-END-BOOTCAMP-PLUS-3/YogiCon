import { AlarmRepository } from '@/domain/repositories/AlarmRepository';

export const deleteAlarmUseCase = async (
  alarmId: string,
  alarmRepository: AlarmRepository
): Promise<void> => {
  await alarmRepository.deleteOne(alarmId);
};
