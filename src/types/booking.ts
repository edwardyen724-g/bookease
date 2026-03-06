export interface Booking {
  id: string;
  name: string;
  email: string;
  event_date: string;
  event_type: string;
  user_id?: string;
  details?: string;
}

