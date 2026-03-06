import React from 'react';
import { useForm } from 'react-hook-form';

const LandingPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: { email: string }) => {
    try {
      // Here you can integrate Supabase for email capture or other functionalities
      console.log(data);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">Transform Your Booking Experience with BookEase</h1>
      <p className="text-lg mb-8 text-center">
        Effortless booking and rescheduling for local event planners and service providers.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-4 py-4 bg-white shadow-md rounded">
        <input
          type="email"
          placeholder="Enter your email"
          {...register('email', { required: true })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Get Started
        </button>
      </form>
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold">MVP Features:</h2>
        <ul className="list-disc pl-5">
          <li>Intuitive booking calendar with drag-and-drop functionality</li>
          <li>One-click rescheduling options directly from confirmation emails</li>
          <li>Automated reminders for upcoming bookings and reschedules</li>
          <li>Customizable booking forms to capture important client information</li>
          <li>Simple dashboard for tracking bookings and client interactions</li>
        </ul>
      </div>
    </main>
  );
};

export default LandingPage;