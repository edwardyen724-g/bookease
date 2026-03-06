import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">
                Transform Your Booking Experience with BookEase
            </h1>
            <p className="text-lg text-center mb-8">
                Effortless booking and rescheduling for local event planners and service providers.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-lg text-center mb-6">
                At BookEase, we understand the challenges local event planners face when managing multiple client bookings. Our goal is to simplify your booking experience, allowing you to focus on what you do best—planning unforgettable events.
            </p>
            <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
            <ul className="list-disc pl-5 mb-6">
                <li>Intuitive booking calendar with drag-and-drop functionality.</li>
                <li>One-click rescheduling options directly from confirmation emails.</li>
                <li>Automated reminders for upcoming bookings and reschedules.</li>
                <li>Customizable booking forms to capture important client information.</li>
                <li>Simple dashboard for tracking bookings and client interactions.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
            <p className="text-lg text-center">
                Join us today and take the first step towards seamless bookings with BookEase!
            </p>
        </div>
    );
};

export default About;