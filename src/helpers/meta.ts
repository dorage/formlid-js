import { UKey } from '../types/utils';
import { FormlidForm } from '../form';
import { createField } from '../field';

export type FormlidMetaHelpers<TFormValue extends object> = ReturnType<
  typeof createMetaHelpers<TFormValue>
>;

export const createMetaHelpers = <TFormValue extends object>(form: FormlidForm<TFormValue>) => {
  return (name: UKey<TFormValue>) => {
    // if 'name' field is partial, so it is not delivered through props.initialValue
    // create new field dynamically
    if (form.fields[name] == null) {
      form.fields[name] = createField(undefined) as any;
    }

    return {
      error: form.fields[name].error[0](),
      isTouched: form.fields[name].touched[0](),
      isFocused: form.fields[name].focus[0](),
      isValidated: form.fields[name].validated[0](),
      setError: form.fields[name].error[1],
      setIsTouched: form.fields[name].touched[1],
      setIsFocused: form.fields[name].focus[1],
      setIsValidated: form.fields[name].validated[1],
    };
  };
};
