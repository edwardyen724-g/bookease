# BookEase

> Effortless booking tailored for wellness and fitness pros.

**Status:** 🚧 In Development

## Problem
Small business owners struggle with clunky booking forms that hinder customer experience. BookEase simplifies this process with customizable templates designed for niche services.

## MVP Features
- Customizable booking form templates specific to wellness and fitness industries.
- Automated email reminders for clients about upcoming appointments.
- Integration with Google Calendar for real-time scheduling updates.
- Simple dashboard for managing appointments, cancellations, and rescheduling.
- Analytics on booking trends and client retention metrics.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
Using Next.js provides a seamless integration of frontend and backend, allowing for quick API development with API Routes. Supabase offers easy setup for Postgres and Authentication, speeding up the development process while ensuring scalability.

## User Stories
- Create Custom Booking Templates
- Automated Email Reminders
- Integration with Google Calendar
- Manage Appointments Dashboard
- Analytics on Booking Trends
- User Authentication

## Launch Checklist
- [ ] Finalize product design and branding
- [ ] Develop landing page and sign-up form
- [ ] Build core features outlined in MVP
- [ ] Conduct user testing for functionality
- [ ] Set up marketing strategy for launch

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```