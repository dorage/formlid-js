import { JSX } from 'solid-js';
import { FormlidForm } from '../form';
import { FormlidSubmit } from './submit';

export type FormlidFormHelpers = ReturnType<typeof createFormHelpers>;

const onsubmit =
  <TFormValue extends object>(
    submit: FormlidSubmit<TFormValue>
  ): JSX.CustomEventHandlersCamelCase<HTMLFormElement>['onSubmit'] =>
  (e) => {
    e.preventDefault();
    submit();
  };

export const createFormHelpers = <TFormValue extends object>(
  form: FormlidForm<TFormValue>,
  submit: FormlidSubmit<TFormValue>
) => {
  return {
    isSubmitting: form.signals.isSubmitting[0],
    isSubmitted: form.signals.isSubmitted[0],
    onsubmit: onsubmit(submit),
  };
};
