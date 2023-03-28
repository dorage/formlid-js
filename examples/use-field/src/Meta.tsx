import { Component, Show, Switch } from 'solid-js';
import styles from './Meta.module.css';

interface FieldMetaProps {
  error: string;
  isFocus: boolean;
  isTouched: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const FieldMeta: Component<FieldMetaProps> = (props) => {
  return (
    <div class={styles.meta}>
      <label>
        error | <span class={styles.error}>{props.error}</span>
      </label>
      <div class={styles.fields}>
        <label class={styles.field}>
          isFocus <Checker on={props.isFocus} />
        </label>
        <label class={styles.field}>
          isTouched <Checker on={props.isTouched} />
        </label>
        <label class={styles.field}>
          isError <Checker on={props.isError} />
        </label>
        <label class={styles.field}>
          isSuccess <Checker on={props.isSuccess} />
        </label>
      </div>
    </div>
  );
};

interface FormMetaProps {
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export const FormMeta: Component<FormMetaProps> = (props) => {
  return (
    <div class={styles.meta}>
      <div class={styles.fields}>
        <label class={styles.field}>
          isSubmitting <Checker on={props.isSubmitting} />
        </label>
        <label class={styles.field}>
          isSubmitted <Checker on={props.isSubmitted} />
        </label>
      </div>
    </div>
  );
};

const Checker: Component<{ on: boolean }> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-check-lg"
    classList={{ [styles.on]: props.on }}
    viewBox="0 0 16 16"
  >
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
  </svg>
);
