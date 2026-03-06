import React from 'react';
import styles from './page.module.css';

const LandingPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1>Transform Your Booking Experience with BookEase</h1>
        <h2>Effortless booking tailored for wellness and fitness pros.</h2>
        <p>
          Experience seamless appointment management with our customizable booking
          forms, automated email reminders, real-time Google Calendar integration, and
          an intuitive dashboard to keep your business organized and efficient.
        </p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>

      <section className={styles.features}>
        <h3>MVP Features</h3>
        <ul>
          <li>Customizable booking form templates specific to wellness and fitness industries.</li>
          <li>Automated email reminders for clients about upcoming appointments.</li>
          <li>Integration with Google Calendar for real-time scheduling updates.</li>
          <li>Simple dashboard for managing appointments, cancellations, and rescheduling.</li>
          <li>Analytics on booking trends and client retention metrics.</li>
        </ul>
      </section>
    </main>
  );
};

export default LandingPage;