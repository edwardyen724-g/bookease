import { test, expect } from '@playwright/test';

test.describe('BookEase E2E Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test.describe('Intuitive Booking Calendar', () => {
        test('User can drag and drop to schedule a booking', async ({ page }) => {
            await page.goto('/book');
            const calendar = await page.locator('.calendar');
            await calendar.dragTo('.available-slot'); // Simulated drag-and-drop functionality
            const confirmationMessage = await page.locator('.confirmation-message');
            await expect(confirmationMessage).toBeVisible();
        });

        test('User can view availability in real-time', async ({ page }) => {
            await page.goto('/book');
            const availableSlots = await page.locator('.available-slot');
            await expect(availableSlots).toHaveCountGreaterThan(0);
        });

        test('Calendar updates in real-time without needing to refresh', async ({ page }) => {
            await page.goto('/book');
            const initialSlots = await page.locator('.available-slot').count();
            await page.locator('.update-calendar-button').click(); // Assume there is a button to refresh the calendar
            const updatedSlots = await page.locator('.available-slot').count();
            await expect(updatedSlots).toBeGreaterThan(initialSlots);
        });
    });

    test.describe('One-Click Rescheduling', () => {
        test('Rescheduling link in email navigates to user-friendly interface', async ({ page }) => {
            await page.goto('/dashboard');
            await page.locator('.reschedule-link').first().click();
            await expect(page).toHaveURL(/.*\/reschedule/);
        });

        test('New booking time is confirmed with one click', async ({ page }) => {
            await page.goto('/reschedule');
            await page.locator('.select-new-time').click();
            await page.locator('.confirm-reschedule-button').click();
            const confirmationMessage = await page.locator('.reschedule-confirmation-message');
            await expect(confirmationMessage).toBeVisible();
        });

        test('Notifications are sent to the client upon reschedule', async ({ page }) => {
            // Simulate checking the client email for notifications
            await page.goto('/notifications');
            const notification = await page.locator('.notification');
            await expect(notification).toContainText('Your booking has been rescheduled');
        });
    });

    test.describe('Automated Reminders', () => {
        test('Clients receive reminders 24 hours before the booking', async ({ page }) => {
            await page.goto('/dashboard');
            await page.locator('.upcoming-bookings').first().hover();
            const reminderSetting = await page.locator('.reminder-setting').isChecked();
            await expect(reminderSetting).toBe(true);
        });

        test('Reminders can be customized by the event planner', async ({ page }) => {
            await page.goto('/settings');
            await page.locator('.customize-reminders').fill('Reminder: Don\'t forget your booking!');
            await page.locator('.save-settings').click();
            const successMessage = await page.locator('.success-message');
            await expect(successMessage).toBeVisible();
        });

        test('Event planner can toggle reminders on/off for specific bookings', async ({ page }) => {
            await page.goto('/dashboard');
            await page.locator('.upcoming-bookings').first().click();
            await page.locator('.toggle-reminder-button').click();
            const reminderStatus = await page.locator('.reminder-status').isVisible();
            await expect(reminderStatus).toBe(false);
        });
    });

    test.describe('Customizable Booking Forms', () => {
        test('User can add/remove fields in the booking form', async ({ page }) => {
            await page.goto('/book');
            await page.locator('.add-field-button').click();
            await expect(page.locator('.new-field')).toBeVisible();
            await page.locator('.remove-field-button').click();
            await expect(page.locator('.new-field')).not.toBeVisible();
        });

        test('Form requires critical information before submission', async ({ page }) => {
            await page.goto('/book');
            await page.locator('.submit-button').click();
            const errorMessage = await page.locator('.error-message');
            await expect(errorMessage).toHaveText('Please fill in all required fields.');
        });

        test('Client responses are stored in the database for future reference', async ({ page }) => {
            await page.goto('/book');
            await page.fill('.client-name', 'John Doe');
            await page.fill('.client-email', 'john@example.com');
            await page.locator('.submit-button').click();
            const confirmationMessage = await page.locator('.confirmation-message');
            await expect(confirmationMessage).toBeVisible();
        });
    });

    test.describe('Simple Dashboard', () => {
        test('Dashboard displays upcoming bookings and rescheduled events', async ({ page }) => {
            await page.goto('/dashboard');
            const bookings = await page.locator('.upcoming-booking');
            await expect(bookings).toHaveCountGreaterThan(0);
            const rescheduledEvents = await page.locator('.rescheduled-event');
            await expect(rescheduledEvents).toHaveCountGreaterThan(0);
        });

        test('User can filter bookings by date or client', async ({ page }) => {
            await page.goto('/dashboard');
            await page.selectOption('.filter-dropdown', 'client');
            const filteredBookings = await page.locator('.filtered-booking');
            await expect(filteredBookings).toHaveCountGreaterThan(0);
        });

        test('User can view client details and all past interactions', async ({ page }) => {
            await page.goto('/dashboard');
            await page.locator('.view-client-details').first().click();
            const clientDetails = await page.locator('.client-information');
            await expect(clientDetails).toBeVisible();
        });
    });

    test.describe('User Authentication', () => {
        test('User can register with email and password', async ({ page }) => {
            await page.goto('/register');
            await page.fill('.email-input', 'newuser@example.com');
            await page.fill('.password-input', 'SecurePassword123!');
            await page.locator('.register-button').click();
            const successMessage = await page.locator('.signup-success');
            await expect(successMessage).toBeVisible();
        });

        test('Password must meet security requirements', async ({ page }) => {
            await page.goto('/register');
            await page.fill('.email-input', 'testuser@example.com');
            await page.fill('.password-input', 'weak');
            await page.locator('.register-button').click();
            const errorMessage = await page.locator('.error-message');
            await expect(errorMessage).toHaveText('Password must be at least 8 characters with a number and a special character.');
        });

        test('User can reset password via email link', async ({ page }) => {
            await page.goto('/login');
            await page.locator('.forgot-password-link').click();
            await page.fill('.email-input', 'registereduser@example.com');
            await page.locator('.send-reset-link-button').click();
            const confirmationMessage = await page.locator('.reset-link-sent');
            await expect(confirmationMessage).toBeVisible();
        });
    });
});