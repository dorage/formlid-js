import type { Component } from 'solid-js';
import * as yup from 'yup';
import { useForm } from 'formlid-js';
import styles from './App.module.css';
import { FieldMeta, FormMeta } from './Meta';

const timer = (ms: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, ms)
  );

const App: Component = () => {
  const { field, meta, form, helpers } = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
    },
    onsubmit: async (data, helpers) => {
      await timer(1500);
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
            <input {...field('email')} autocomplete="off" />
            <FieldMeta {...meta('email')} />
          </div>
          <div>
            <label>password</label>
            <input type="password" {...field('password')} autocomplete="off" />
            <FieldMeta {...meta('password')} />
          </div>
          <button type="submit" disabled={helpers.isSubmitting()}>
            submit
          </button>
          <FormMeta isSubmitted={helpers.isSubmitted()} isSubmitting={helpers.isSubmitting()} />
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
