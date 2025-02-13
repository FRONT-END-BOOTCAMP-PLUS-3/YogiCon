import { Alarm } from '@/domain/entities/Alarm';
import { AlarmRepository } from '@/domain/repositories/AlarmRepository';
import { createClient } from '@/utils/supabase/server';

export class SbAlarmRepository implements AlarmRepository {
  async getAll(userId: string): Promise<Alarm[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('alarm')
      .select('*')
      .eq('user_id', userId)
      .order('days_before', { ascending: true })
      .order('hour', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    const alarms = data?.map((alarm) => ({
      id: alarm.id,
      daysBefore: alarm.days_before,
      hour: alarm.hour,
      userId: alarm.user_id,
    }));

    return alarms || [];
  }

  async createOne(alarmInfo: Alarm): Promise<Alarm> {
    const supabase = await createClient();

    const newAlarm = {
      days_before: alarmInfo.daysBefore,
      hour: alarmInfo.hour,
      user_id: alarmInfo.userId,
    };

    const { data, error } = await supabase
      .from('alarm')
      .insert(newAlarm)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const alarm = {
      id: data.id,
      daysBefore: data.days_before,
      hour: data.hour,
      userId: data.user_id,
    };

    return alarm;
  }

  async deleteOne(alarmId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from('alarm') // 테이블 이름
      .delete()
      .eq('id', alarmId); // 삭제할 행의 조건

    if (error) {
      throw new Error(error.message);
    } else {
      console.log('알람 삭제 완료');
    }
  }
}
