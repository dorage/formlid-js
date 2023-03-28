import FormContext from './contexts/form-context';
import { JSX, useContext } from 'solid-js';
import { CustomInputEvent } from './types/event';
import { UKey } from './types/utils';
import { FormContextHelpers } from './use-form';

// Form Context Field Types

interface FormContextField<TFormValue> {
  name: keyof TFormValue;
  value: TFormValue[keyof TFormValue];
  oninput: (e: CustomInputEvent) => void;
  onfocus: (e: CustomInputEvent) => void;
  onblur: (e: CustomInputEvent) => void;
}
interface FormContextMeta {
  error: string;
  isError: boolean;
  isSuccess: boolean;
  isFocus: boolean;
  isTouched: boolean;
}
interface FormContextForm {
  onsubmit: JSX.EventHandler<
    HTMLFormElement,
    Event & {
      submitter: HTMLElement;
    }
  >;
}

// Form Context Type

interface FormContext<TFormValue> {
  field: (name: keyof TFormValue) => FormContextField<TFormValue>;
  meta: (name: keyof TFormValue) => FormContextMeta;
  extension: (name: keyof TFormValue) => FormContextField<TFormValue> & FormContextMeta;
  form: () => FormContextForm;
  helpers: FormContextHelpers<TFormValue>;
}

// useField hook
const useField = <TFormValue extends object>(name: UKey<TFormValue>) => {
  const context = useContext<FormContext<TFormValue>>(FormContext);
  if (context == null) throw Error('this hook is not under the provider');

  return {
    field: () => context.field(name),
    meta: () => context.meta(name),
    extension: () => context.extension(name),
    form: () => context.form(),
    helpers: {
      ...context.helpers,
      setValue: (setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]) =>
        context.helpers.setValue(name, setter),
      setError: (setter: (prev: string) => string) => context.helpers.setError(name, setter),
      setTouched: (setter: (prev: boolean) => boolean) => context.helpers.setTouched(name, setter),
    },
  };
};
export default useField;
