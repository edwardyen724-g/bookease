import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabaseClient"; // Assuming you have a file to initialize Supabase
import { useRouter } from "next/navigation";

interface BookingForm {
  name: string;
  email: string;
  eventDate: string;
  eventType: string;
}

const BookingPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingForm>();
  const router = useRouter();

  const onSubmit = async (data: BookingForm) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{ 
          name: data.name, 
          email: data.email, 
          event_date: data.eventDate, 
          event_type: data.eventType 
        }]);

      if (error) throw error;

      router.push("/thank-you");
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transform Your Booking Experience with BookEase</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input 
            id="name" 
            type="text" 
            {...register("name", { required: "Name is required" })} 
            className={`border p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input 
            id="email" 
            type="email" 
            {...register("email", { required: "Email is required" })} 
            className={`border p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="eventDate" className="block mb-1">Event Date</label>
          <input 
            id="eventDate" 
            type="date" 
            {...register("eventDate", { required: "Event date is required" })} 
            className={`border p-2 w-full ${errors.eventDate ? 'border-red-500' : ''}`}
          />
          {errors.eventDate && <p className="text-red-500">{errors.eventDate.message}</p>}
        </div>

        <div>
          <label htmlFor="eventType" className="block mb-1">Event Type</label>
          <input 
            id="eventType" 
            type="text" 
            {...register("eventType", { required: "Event type is required" })} 
            className={`border p-2 w-full ${errors.eventType ? 'border-red-500' : ''}`}
          />
          {errors.eventType && <p className="text-red-500">{errors.eventType.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;