import React, { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Booking {
  id: string;
  date: string;
  time: string;
  clientName: string;
}

const DashboardPage: React.FC = () => {
  const { supabase } = useSupabase();
  const { register, handleSubmit } = useForm();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', supabase.auth.user()?.id);

        if (error) throw error;
        setBookings(data as Booking[]);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : String(err));
      }
    };
    
    fetchBookings();
  }, [supabase]);

  const onSubmit = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({ ...formData, user_id: supabase.auth.user()?.id });

      if (error) throw error;

      toast.success('Booking created successfully!');
      setBookings([...bookings, { ...formData, id: String(new Date().getTime()) }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Transform Your Booking Experience with BookEase</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
          <input {...register('clientName', { required: true })} id="clientName" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div className="mt-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input {...register('date', { required: true })} id="date" type="date" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div className="mt-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input {...register('time', { required: true })} id="time" type="time" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Create Booking</button>
      </form>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
        <ul className="mt-2">
          {bookings.map(booking => (
            <li key={booking.id} className="border-b py-2">{`${booking.clientName} - ${booking.date} at ${booking.time}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;