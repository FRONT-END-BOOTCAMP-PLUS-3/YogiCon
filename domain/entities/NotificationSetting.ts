export interface NotificationSetting {
  id: string; // UUID
  day: number;
  hour: number;
  userId: string; // Foreign Key -> User
}
