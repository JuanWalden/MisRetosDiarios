
export type DateString = string; // formato YYYY-MM-DD

export interface Activity {
  id: string;
  name: string;
  count: number;
  date: DateString;
  createdAt: string;
}

export interface DayData {
  date: DateString;
  activities: Activity[];
}

export interface StorageData {
  [date: string]: Activity[];
}
