export interface AlarmDto {
  id: string;
  daysBefore: number;
  period: '오전' | '오후';
  time: number;
}
