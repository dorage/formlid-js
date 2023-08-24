import { UKey } from '../types/utils';
import { FormlidForm } from '../form';

export type FormlidFieldHelpers = ReturnType<typeof createMetaHelpers>;

export const createMetaHelpers = <TFormValue extends object>(form: FormlidForm<TFormValue>) => {
  return (name: UKey<TFormValue>) => ({
    error: form.fields[name].error[0](),
    isTouched: form.fields[name].touched[0](),
    isFocused: form.fields[name].focus[0](),
    isValidated: form.fields[name].validated[0](),
  });
};
