import type { Component } from 'solid-js';
import { useForm } from 'formlid-js';
import * as yup from 'yup';
import styles from './App.module.css';

const App: Component = () => {
  const { field, meta, form } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('enter a valid email').required(),
      password: yup.string().min(8, 'be at least 8 characters long').required(),
    }),
    onsubmit: (data) => {
      alert(`email: ${data.email}\npassword: ${data.password}`);
    },
  });

  return (
    <div class={styles.app}>
      <header class={styles.header}>Hello, Formlid!</header>
      <main class={styles.main}>
        <form {...form()} class={styles.form}>
          <div>
            <label>e-mail</label>
            <input {...field('email')} />
            <div>{JSON.stringify(meta('email'))}</div>
          </div>
          <div>
            <label>password</label>
            <input type="password" {...field('password')} />
            <div>{JSON.stringify(meta('password'))}</div>
          </div>
          <button type="submit">submit</button>
        </form>
      </main>
      <footer>
        made by{' '}
        <a href="https://github.com/dorage" target="_">
          dorage
        </a>
      </footer>
    </div>
  );
};

export default App;