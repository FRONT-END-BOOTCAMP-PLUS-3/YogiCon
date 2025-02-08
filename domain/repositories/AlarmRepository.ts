import { Alarm } from '../entities/Alarm';

export interface AlarmRepository {
  getAll(userId: string): Promise<Alarm[]>;
  createOne(alarmInfo: Alarm): Promise<void>;
  deleteOne(alarmId: string): Promise<void>;
}
