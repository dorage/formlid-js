import { createFormlid } from 'formlid-js';
import { Component } from 'solid-js';
import * as yup from 'yup';
import styles from './App.module.css';
import Field from './Field';
import { FormMeta } from './Meta';

const delay = 1500;

const timer = (ms: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, ms)
  );

export interface FormValue {
  email: string;
  password: string;
  age?: number;
  checked: boolean[];
}

const App: Component = () => {
  const { form, FormlidProvider } = createFormlid<FormValue>({
    initialValues: {
      email: 'aa.com',
      password: '',
      checked: [],
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
      checked: yup.array().of(yup.boolean().required()).required(),
    },
    onsubmit: async (data, helpers) => {
      await timer(delay);

      alert(`submitted!\nemail: ${data.email}\npassword: ${data.password}`);
    },
  });

  return (
    <div class={styles.app}>
      <header class={styles.header}>Hello, Formlid!</header>
      <div>useField example</div>
      <FormlidProvider>
        <main class={styles.main}>
          <form {...form} class={styles.form}>
            <Field name="email" />
            <Field name="password" />
            <button type="submit" disabled={form.isSubmitting()}>
              submit
            </button>
            <FormMeta isSubmitted={form.isSubmitted()} isSubmitting={form.isSubmitting()} />
          </form>
        </main>
      </FormlidProvider>
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
