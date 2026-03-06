import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('owner_id', session.user.id);

        if (error) throw error;
        setAppointments(data);
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
      }
    };

    fetchAppointments();
  }, [session]);

  if (!session) {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <div>
      <h1>Transform Your Booking Experience with BookEase</h1>
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.client_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;