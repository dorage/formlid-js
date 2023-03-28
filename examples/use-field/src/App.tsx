import { useForm } from 'formlid-js';
import { Component } from 'solid-js';
import * as yup from 'yup';
import styles from './App.module.css';
import Field from './Field';
import { FormMeta } from './Meta';

export const initialValues = {
  email: '',
  password: '',
};

const timer = (ms: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, ms)
  );

const App: Component = () => {
  const { form, SolidFormContext, helpers } = useForm({
    initialValues,
    validationSchema: {
      email: yup.string().email('enter a valid email').required(),
      password: yup.string().min(8, 'be at least 8 characters long').required(),
    },
    onsubmit: async (data) => {
      await timer(1500);

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
            <button type="submit" disabled={helpers.isSubmitting()}>
              submit
            </button>
            <FormMeta isSubmitted={helpers.isSubmitted()} isSubmitting={helpers.isSubmitting()} />
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
