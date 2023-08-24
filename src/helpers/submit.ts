import { FormlidSubmitHelpers } from '.';
import { FormlidForm } from '../form';
import { validation } from './validation';

export type FormlidSubmit<TFormValue extends object> = ReturnType<
  typeof createFormlidSubmit<TFormValue>
>;

export const createFormlidSubmit =
  <TFormValue extends object>(form: FormlidForm<TFormValue>, helpers: FormlidSubmitHelpers) =>
  async () => {
    const [isSubmitting, setIsSubmitting] = form.signals.isSubmitting;
    const [isSubmitted, setIsSubmitted] = form.signals.isSubmitted;

    if (isSubmitting()) return;
    setIsSubmitting(() => true);

    // validation
    if (!(await validation(form))) {
      setIsSubmitting(() => false);
      return;
    }

    // submit
    await form.props.onsubmit(helpers.getValues(), helpers);
    setIsSubmitting(() => false);
    setIsSubmitted(() => true);
  };
