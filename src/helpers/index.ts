import { Accessor, Setter } from 'solid-js';
import { FormlidFieldSignals, createField } from '../field';
import { FormlidForm } from '../form';
import pure from '../functions/pure';
import { UKey } from '../types/utils';
import { FormlidFieldHelpers } from './field';
import { FormlidMetaHelpers } from './meta';
import { FormlidSubmit } from './submit';

// TODO; helper 함수 정리하기

export type FormlidSubmitHelpers<TFormValue extends object> = ReturnType<
  typeof createSubmitHelpers<TFormValue>
>;

export type FormlidHelpers<TFormValue extends object> = ReturnType<
  typeof createHelpers<TFormValue>
>;

/**
 * get values of formlid fields, type equals with TFormValue
 * @param form
 * @returns
 */
const getValues =
  <TFormValue extends object>(form: FormlidForm<TFormValue>): Accessor<TFormValue> =>
  () => {
    const data: any = {};
    const keys = pure.typeKeys(form.fields);
    for (const key of keys) {
      const [getter] = form.fields[key]['value'];
      data[key] = getter();
    }
    return data as TFormValue;
  };

/**
 * get meta values, fields in FormlidFieldSignals except 'values'
 * @param form
 * @param fieldKey
 * @returns
 */
const getFieldValues =
  <TFormValue extends object, TType>(
    form: FormlidForm<TFormValue>,
    fieldKey: UKey<FormlidFieldSignals<unknown>>
  ): Accessor<TFieldValues<TFormValue, TType>> =>
  () => {
    const data: any = {};
    const keys = pure.typeKeys(form.fields);
    for (const key of keys) {
      const [getter] = form.fields[key][fieldKey];
      data[key] = getter();
    }
    return data;
  };

/**
 * update formlid fields like signal setter
 * @param form
 * @returns
 */
const setValues =
  <TFormValue extends object>(form: FormlidForm<TFormValue>) =>
  (values: Partial<TFormValue> | ((prev: TFormValue) => TFormValue)) => {
    const oldValues = getValues(form)();
    const newValues = typeof values === 'function' ? values(oldValues) : (values as TFormValue);

    const existKeys = new Set(pure.typeKeys(oldValues));
    const newKeys = new Set(pure.typeKeys(typeof values === 'function' ? newValues : values));
    const allKeys = new Set([...existKeys, ...newKeys]);

    for (const key of allKeys) {
      // if the field is not exist
      if (!existKeys.has(key)) {
        form.fields[key] = createField(newValues[key]);
        continue;
      }

      // but the field is not exist in update
      if (!newKeys.has(key)) continue;

      // update values
      const [_, setter] = form.fields[key]['value'];
      (setter as any)(newValues[key]);
      continue;
    }
  };

type TFieldValues<TFormValue extends object, TType> = {
  [key in UKey<TFormValue>]: TType;
};

/**
 * update formlid fields like signal setter
 * @param form
 * @returns
 */
const setFieldValues =
  <TFormValue extends object, TTYpe>(
    form: FormlidForm<TFormValue>,
    fieldKey: UKey<FormlidFieldSignals<unknown>>
  ) =>
  (
    values:
      | Partial<TFieldValues<TFormValue, TTYpe>>
      | ((prev: TFieldValues<TFormValue, TTYpe>) => TFieldValues<TFormValue, TTYpe>)
  ) => {
    const oldValues = getFieldValues<TFormValue, TTYpe>(form, fieldKey)();
    const newValues = typeof values === 'function' ? values(oldValues) : values;

    const existKeys = new Set(pure.typeKeys(oldValues));
    const newKeys = new Set(pure.typeKeys(typeof values === 'function' ? newValues : values));
    const allKeys = new Set([...existKeys, ...newKeys]);

    for (const key of allKeys) {
      // if the field is not exist
      if (!existKeys.has(key)) {
        form.fields[key] = createField(undefined) as any;
      }

      // but the field is not exist in update
      if (!newKeys.has(key)) continue;

      // update values
      const [_, setter] = form.fields[key as keyof TFormValue][fieldKey];
      (setter as any)(newValues[key]);
      continue;
    }
  };

/**
 * helper functions, be delivered to onsubmit
 * @param form
 * @returns
 */
export const createSubmitHelpers = <TFormValue extends object>(
  form: FormlidForm<TFormValue>,
  field: FormlidFieldHelpers<TFormValue>,
  meta: FormlidMetaHelpers<TFormValue>
) => ({
  // get multiple field's values
  getValues: getValues(form),
  getErrors: getFieldValues<TFormValue, string>(form, 'error'),
  getTouches: getFieldValues<TFormValue, boolean>(form, 'touched'),
  getFocuses: getFieldValues<TFormValue, boolean>(form, 'focus'),
  getValidates: getFieldValues<TFormValue, boolean>(form, 'validated'),
  // set multiple fields
  setValues: setValues(form),
  setErrors: setFieldValues<TFormValue, string>(form, 'error'),
  setTouches: setFieldValues<TFormValue, boolean>(form, 'touched'),
  setFocuses: setFieldValues<TFormValue, boolean>(form, 'focus'),
  setValidates: setFieldValues<TFormValue, boolean>(form, 'validated'),
  // set single field
  setValue: (name: UKey<TFormValue>) => field(name).setValue,
  setError: (name: UKey<TFormValue>) => meta(name).setError,
  setIsTouched: (name: UKey<TFormValue>) => meta(name).setIsTouched,
  setIsFocused: (name: UKey<TFormValue>) => meta(name).setIsFocused,
  setIsValidated: (name: UKey<TFormValue>) => meta(name).setIsValidated,
});

/**
 * helpers functions, be returned by createFormlid()
 * @param submit
 * @param submitHelpers
 * @returns
 */
export const createHelpers = <TFormValue extends object>(
  submit: FormlidSubmit<TFormValue>,
  submitHelpers: FormlidSubmitHelpers<TFormValue>
) => {
  return {
    ...submitHelpers,
    emitSubmit: () => {
      submit();
    },
  };
};
