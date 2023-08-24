import { Signal, createSignal } from 'solid-js';
import { FormlidField, createField } from './field';
import { FormlidProps } from './formlid';
import pure from './functions/pure';
import { UKey } from './types/utils';

type FormlidFormFields<TFormValue extends object> = {
  [key in UKey<TFormValue>]: FormlidField<TFormValue[key]>;
};

interface FormlidFormSignals {
  isSubmitting: Signal<boolean>;
  isSubmitted: Signal<boolean>;
}

export interface FormlidForm<TFormValue extends object> {
  signals: FormlidFormSignals;
  fields: FormlidFormFields<TFormValue>;
  props: FormlidProps<TFormValue>;
}

/**
 * create FormlidForm's status signals
 * @returns
 */
const createFormSignals = (): FormlidFormSignals => {
  const signals = {
    isSubmitting: createSignal(false),
    isSubmitted: createSignal(false),
  };
  return signals;
};

/**
 * create FormlidForm's fields
 * @param initialValue
 * @param keys
 * @returns
 */
const createFormFields = <TFormValue extends object>(
  initialValue: TFormValue
): FormlidFormFields<TFormValue> => {
  const keys = pure.typeKeys(initialValue);
  const fields: any = {};

  for (const key of keys) {
    fields[key] = createField(initialValue[key]);
  }

  return fields;
};

/**
 * initialValue를 통해 formSignal을 생성
 * @param initialValue
 * @param keys
 * @returns
 */
export const createFormlidForm = <TFormValue extends object>(
  props: FormlidProps<TFormValue>
): FormlidForm<TFormValue> => {
  const formSignals = createFormSignals();
  const formFields = createFormFields(props.initialValues);

  return {
    signals: formSignals,
    fields: formFields,
    props: props,
  };
};
