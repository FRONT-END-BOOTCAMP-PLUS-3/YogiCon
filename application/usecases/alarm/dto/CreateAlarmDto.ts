export interface CreateAlarmDto {
  daysBefore: number;
  period: '오전' | '오후';
  time: number;
}
