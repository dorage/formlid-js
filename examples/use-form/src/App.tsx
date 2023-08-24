import { onMount, type Component, createSignal } from 'solid-js';
import * as yup from 'yup';
import styles from './App.module.css';
import { FieldMeta, FormMeta } from './Meta';
import { createFormlid } from 'formlid-js';

const delay = 1500;

const timer = (ms: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, ms)
  );

interface InitialValue {
  email: string;
  password: string;
  age: number;
  checked: boolean[];
}

const App: Component = () => {
  const [value, setValue] = createSignal({
    email: 'a@a.com',
    password: '',
    age: 59,
    checked: [],
  });

  const { field, meta, form, helpers } = createFormlid<InitialValue>({
    initialValues: value(),
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
      <header class={styles.header}>
        Hello, Formlid!
        <br />
      </header>
      <div>formlid example</div>
      <main class={styles.main}>
        <form {...form} class={styles.form}>
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
          <button type="submit" disabled={form.isSubmitting()}>
            submit after {delay}ms
          </button>
          <FormMeta isSubmitted={form.isSubmitted()} isSubmitting={form.isSubmitting()} />
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
