import type { Component } from 'solid-js';
import { useForm } from 'formlid-js';
import * as yup from 'yup';
import styles from './App.module.css';
import Field from './Field';

export const initialValues = {
  email: '',
  password: '',
};

const App: Component = () => {
  const { form, SolidFormContext } = useForm({
    initialValues,
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
      <SolidFormContext>
        <main class={styles.main}>
          <form {...form()} class={styles.form}>
            <Field name="email" />
            <Field name="password" />
            <button type="submit">submit</button>
          </form>
        </main>
      </SolidFormContext>
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
