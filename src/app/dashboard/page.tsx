import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@supabase/auth-helpers-react";
import { Booking } from "../../types";
import BookingCalendar from "../../components/BookingCalendar";
import ReminderList from "../../components/ReminderList";
import ClientInteractionList from "../../components/ClientInteractionList";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DashboardPage: React.FC = () => {
  const session = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!session) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) throw error;

        setBookings(data || []);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transform Your Booking Experience with BookEase</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <>
          <BookingCalendar bookings={bookings} />
          <ReminderList bookings={bookings} />
          <ClientInteractionList bookings={bookings} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;