import { Alarm } from '../entities/Alarm';

export interface AlarmRepository {
  getAll(userId: string): Promise<Alarm[]>;
  createOne(alarmInfo: Alarm): Promise<Alarm>;
  deleteOne(alarmId: string): Promise<void>;
}
