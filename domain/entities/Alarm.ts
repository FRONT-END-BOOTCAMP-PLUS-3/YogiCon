export interface Alarm {
  id: string; // UUID
  daysBefore: number;
  hour: number;
  userId: string; // Foreign Key -> User
}
