import FormContext from './contexts/form-context';
import { JSX, useContext } from 'solid-js';
import { CustomInputEvent } from './typing/event';
import { UKey } from './typing/utils';

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
interface FormContextHelpers<TFormValue> {
  setValue: (
    name: keyof TFormValue,
    setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]
  ) => TFormValue[keyof TFormValue];
  setError: (name: keyof TFormValue, setter: (prev: string) => string) => string;
  setTouched: (name: keyof TFormValue, setter: (prev: boolean) => boolean) => boolean;
  emitSubmit: () => void;
  validate: (formData: TFormValue) => Promise<boolean>;
  getValues: () => TFormValue;
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
    helpers: context.helpers,
  };
};
export default useField;
