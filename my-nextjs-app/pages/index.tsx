import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to your ultimate note-managing app, "The Notetaker"</h1>
      <div className={styles.formContainer}>
        <h2>Register</h2>
        <RegisterForm />
      </div>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;