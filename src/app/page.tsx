import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

interface BookingForm {
  name: string;
  email: string;
  eventDate: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<BookingForm>();

  const onSubmit = async (data: BookingForm) => {
    try {
      const { error } = await supabase.from('bookings').insert([data]);
      if (error) throw new Error(error.message);
      alert('Booking submitted successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center">Transform Your Booking Experience with BookEase</h1>
      <p className="mt-4 text-lg text-center">
        Effortless booking and rescheduling for local event planners and service providers.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full max-w-md">
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          {...register('eventDate', { required: true })}
          type="date"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
      
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold">MVP Features</h2>
        <ul className="mt-2 space-y-2">
          <li>Intuitive booking calendar with drag-and-drop functionality.</li>
          <li>One-click rescheduling options directly from confirmation emails.</li>
          <li>Automated reminders for upcoming bookings and reschedules.</li>
          <li>Customizable booking forms to capture important client information.</li>
          <li>Simple dashboard for tracking bookings and client interactions.</li>
        </ul>
      </div>
    </main>
  );
}