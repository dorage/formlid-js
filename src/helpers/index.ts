import { Signal } from 'solid-js';
import pure from '../functions/pure';
import { UKey } from '../types/utils';
import { FormlidFieldSignals, createField } from '../field';
import { FormlidForm } from '../form';
import { FormlidSubmit } from './submit';

// TODO; helper 함수 정리하기

export type FormlidSubmitHelpers = ReturnType<typeof createSubmitHelpers>;

export type FormlidHelpers<TFormValue extends object> = ReturnType<
  typeof createHelpers<TFormValue>
>;

const getField =
  <TFieldKey extends UKey<FormlidFieldSignals<unknown>>>(fieldKey: TFieldKey) =>
  <TFormValue extends object>(form: FormlidForm<TFormValue>) =>
  (key: UKey<TFormValue>) => {
    const [getter] = form.fields[key][fieldKey];
    return getter;
  };

const getFields =
  <TFieldKey extends UKey<FormlidFieldSignals<unknown>>>(fieldKey: TFieldKey) =>
  <TFormValue extends object>(form: FormlidForm<TFormValue>) =>
  () => {
    const data: any = {};
    const keys = pure.typeKeys(form.fields);
    for (const key of keys) {
      const [getter] = form.fields[key][fieldKey];
      data[key] = getter();
    }
    return data;
  };

type UFormlidFieldSignal<
  TFieldKey extends UKey<FormlidFieldSignals<unknown>>,
  TValue
> = TFieldKey extends 'value' ? TValue : TFieldKey extends 'error' ? string : boolean;

const setField =
  <TFieldKey extends UKey<FormlidFieldSignals<unknown>>>(fieldKey: TFieldKey) =>
  <
    TFormValue extends object,
    TKey extends UKey<TFormValue>,
    TValue = UFormlidFieldSignal<TFieldKey, TFormValue[TKey]>
  >(
    form: FormlidForm<TFormValue>,
    name: TKey,
    value: (prev: TValue) => TValue
  ) => {
    // when it doesn not exist
    if (form.fields[name] == null) {
      (form.fields as any)[name] = createField((value as any)(undefined));
      return;
    }

    const [_, setter] = form.fields[name][fieldKey] as Signal<TValue>;
    setter(value);
  };

export const getValues = getFields('value');
export const getErrors = getFields('error');
export const getFocuses = getFields('focus');
export const getTouches = getFields('touched');
export const getValidates = getField('validated');

export const setValue = setField('value');
export const setFocus = setField('focus');
export const setTouched = setField('touched');

// const setValues = <TFormValue extends object>(
//   form: FormlidForm<TFormValue>,
//   value: (prev: TFormValue) => TFormValue
// ) => {
//   const prev = getValues(form);
//   const newValue = value(prev);
//   const keys = pure.typeKeys(newValue);

//   for (const key of keys) {
//     setValue(form, key, newValue[key]);
//   }
// };

export const createSubmitHelpers = <TFormValue extends object>(form: FormlidForm<TFormValue>) => ({
  getValues: getValues(form),
  // getErrors,
  // getTouches,
  // getFocuses,
  // getValidates,
  // setValues,
  // setFocus,
  // setTouched,
});

export const createHelpers = <TFormValue extends object>(
  submit: FormlidSubmit<TFormValue>,
  submitHelpers: FormlidSubmitHelpers
) => {
  return {
    ...submitHelpers,
    emitSubmit: () => {
      submit();
    },
  };
};
