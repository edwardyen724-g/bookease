# BookEase

> Effortless booking and rescheduling for local event planners and service providers.

**Status:** 🚧 In Development

## Problem
Event planners and service providers often face confusing booking platforms and rigid rescheduling policies, leading to lost time and frustrated clients. BookEase simplifies this process, making it seamless and user-friendly.

## MVP Features
- Intuitive booking calendar with drag-and-drop functionality
- One-click rescheduling options directly from confirmation emails
- Automated reminders for upcoming bookings and reschedules
- Customizable booking forms to capture important client information
- Simple dashboard for tracking bookings and client interactions

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Supabase API / Supabase Edge Functions
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
Using Next.js provides a full-stack framework that integrates easily with Supabase for database operations and authentication. The App Router allows for a simplified routing structure, and Vercel offers seamless deployment and performance optimizations for the application.

## User Stories
- Intuitive Booking Calendar
- One-Click Rescheduling
- Automated Reminders
- Customizable Booking Forms
- Simple Dashboard
- User Authentication

## Launch Checklist
- [ ] Create and finalize landing page.
- [ ] Develop user registration and login features.
- [ ] Implement booking calendar functionality.
- [ ] Set up email reminder system.
- [ ] Test user authentication and error handling.

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```