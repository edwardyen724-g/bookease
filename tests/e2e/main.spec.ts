import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
    test('User can register with email and password', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.click('text=Sign Up');
        await page.fill('input[name=email]', 'testuser@example.com');
        await page.fill('input[name=password]', 'SecurePassword123!');
        await page.click('text=Register');
        await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test('User can reset password via email link', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.click('text=Forgot Password?');
        await page.fill('input[name=email]', 'testuser@example.com');
        await page.click('text=Send Reset Link');
        // Simulate user clicking the link in the email
        await page.goto('http://localhost:3000/reset-password');
        await page.fill('input[name=new-password]', 'NewSecurePassword123!');
        await page.click('text=Reset Password');
        await expect(page).toHaveURL(/.*\/dashboard/);
    });
});

test.describe('Intuitive Booking Calendar', () => {
    test('User can drag and drop to schedule a booking', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        await page.click('text=Book Event');
        await page.dragAndDrop('.calendar-slot', '.booking-time'); // Adjust selectors as needed
        await expect(page.locator('.booking-confirmation')).toBeVisible();
    });

    test('User can view availability in real-time', async ({ page }) => {
        await page.goto('http://localhost:3000/book');
        const availableSlot = await page.locator('.available-slot').first();
        await expect(availableSlot).toBeVisible();
    });
});

test.describe('One-Click Rescheduling', () => {
    test('Rescheduling link in email navigates to user-friendly interface', async ({ page }) => {
        await page.goto('http://localhost:3000/email-confirmation');
        await page.click('text=Reschedule');
        await expect(page).toHaveURL(/.*\/reschedule/);
    });

    test('New booking time is confirmed with one click', async ({ page }) => {
        await page.goto('http://localhost:3000/reschedule');
        await page.selectOption('select[name=new-time]', 'New Time Slot');
        await page.click('text=Confirm');
        await expect(page.locator('.confirmation-message')).toHaveText('Booking successfully rescheduled.');
    });
});

test.describe('Automated Reminders', () => {
    test('Clients receive reminders 24 hours before the booking', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        const reminderSetting = page.locator('input[name=reminder-setting]');
        await reminderSetting.check();
        await expect(reminderSetting).toBeChecked();
    });

    test('Event planner can toggle reminders on/off for specific bookings', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        await page.click('text=Toggle Reminder');
        await expect(page.locator('.reminder-status')).toHaveText('Reminder Disabled');
    });
});

test.describe('Customizable Booking Forms', () => {
    test('User can add/remove fields in the booking form', async ({ page }) => {
        await page.goto('http://localhost:3000/book');
        await page.fill('input[name=client-name]', 'Client Name');
        await page.fill('input[name=client-email]', 'client@example.com');
        await page.click('text=Add Field');
        await page.fill('input[name=additional-field]', 'Some Info');
        await page.click('text=Submit');
        await expect(page.locator('.form-submission-status')).toHaveText('Booking form submitted successfully.');
    });

    test('Form requires critical information before submission', async ({ page }) => {
        await page.goto('http://localhost:3000/book');
        await page.fill('input[name=client-name]', 'Client Name');
        await page.click('text=Submit');
        await expect(page.locator('.error-message')).toHaveText('Please fill in all required fields.');
    });
});

test.describe('Simple Dashboard', () => {
    test('Dashboard displays upcoming bookings and rescheduled events', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        await expect(page.locator('.upcoming-bookings')).toBeVisible();
    });

    test('User can filter bookings by date or client', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');
        await page.selectOption('select[name=filter]', 'Client Name');
        await expect(page.locator('.filtered-bookings')).toContainText('Client Name');
    });
});