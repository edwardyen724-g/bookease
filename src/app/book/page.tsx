import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-toastify';

interface BookingFormInputs {
  clientName: string;
  eventDate: string;
  eventTime: string;
  additionalNotes?: string;
}

const BookingPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormInputs>();

  const onSubmit = async (data: BookingFormInputs) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([data]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Booking submitted successfully!');
    } catch (err) {
      toast.error(`Error submitting booking: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Transform Your Booking Experience with BookEase</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium">Client Name</label>
          <input
            id="clientName"
            {...register('clientName', { required: 'Client name is required' })}
            className={`mt-1 p-2 border rounded w-full ${errors.clientName ? 'border-red-500' : ''}`}
          />
          {errors.clientName && <span className="text-red-500 text-sm">{errors.clientName.message}</span>}
        </div>

        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium">Event Date</label>
          <input
            type="date"
            id="eventDate"
            {...register('eventDate', { required: 'Event date is required' })}
            className={`mt-1 p-2 border rounded w-full ${errors.eventDate ? 'border-red-500' : ''}`}
          />
          {errors.eventDate && <span className="text-red-500 text-sm">{errors.eventDate.message}</span>}
        </div>

        <div>
          <label htmlFor="eventTime" className="block text-sm font-medium">Event Time</label>
          <input
            type="time"
            id="eventTime"
            {...register('eventTime', { required: 'Event time is required' })}
            className={`mt-1 p-2 border rounded w-full ${errors.eventTime ? 'border-red-500' : ''}`}
          />
          {errors.eventTime && <span className="text-red-500 text-sm">{errors.eventTime.message}</span>}
        </div>

        <div>
          <label htmlFor="additionalNotes" className="block text-sm font-medium">Additional Notes</label>
          <textarea
            id="additionalNotes"
            {...register('additionalNotes')}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;