export interface Notification {
  id: string; // UUID
  day: number;
  hour: number;
  userId: string; // Foreign Key -> User
}
