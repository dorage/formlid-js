import type { Component } from 'solid-js';
import { formlid } from 'formlid-js';
import * as yup from 'yup';
import styles from './App.module.css';
import { FieldMeta, FormMeta } from './Meta';

const timer = (ms: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, ms)
  );

interface useFormValues {
  email: string;
  password: string;
  checked: boolean[];
}

const App: Component = () => {
  const { field, meta, form, helpers } = formlid<useFormValues>({
    initialValues: {
      email: '',
      password: '',
      checked: [],
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
      checked: yup.array().of(yup.boolean().required()).required(),
    },
    onsubmit: async (data, helpers) => {
      await timer(1500);
      alert(`submitted!\nemail: ${data.email}\npassword: ${data.password}`);
    },
  });

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        Hello, Formlid!
        <br />
      </header>
      <div>formlid example</div>
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
