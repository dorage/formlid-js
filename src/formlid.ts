import { Accessor, createEffect } from 'solid-js';
import * as Yup from 'yup';
import { createFormlidForm } from './form';
import { createHelpers, createSubmitHelpers, FormlidSubmitHelpers } from './helpers';
import { createFieldHelpers } from './helpers/field';
import { createFormHelpers } from './helpers/form';
import { createFormlidSubmit } from './helpers/submit';
import { validation } from './helpers/validation';
import { createMetaHelpers } from './helpers/meta';

export type Formlid<TFormValue extends object> = ReturnType<typeof createFormlid<TFormValue>>;

export type ValidationSchema = {
  [key in string]?: Yup.Schema;
};

// Formlid의 Props
export interface FormlidProps<TFormValue extends object> {
  initialValues: TFormValue;
  validationSchema?: ValidationSchema;
  onsubmit: (formData: TFormValue, helpers: FormlidSubmitHelpers) => any | Promise<any>;
  validateOnSubmit?: boolean | Accessor<boolean>;
}

// TODO; store로 field를 변경
// TODO; store로 변경해서 store의 변경을 추적하기

export const createFormlid = <TFormValue extends object>(props: FormlidProps<TFormValue>) => {
  const formlidForm = createFormlidForm<TFormValue>(props);

  // submit
  const submitHelpers = createSubmitHelpers(formlidForm);
  const submit = createFormlidSubmit(formlidForm, submitHelpers);

  // helpers
  const helpers = createHelpers(submit, submitHelpers);
  const field = createFieldHelpers(formlidForm);
  const meta = createMetaHelpers(formlidForm);
  const form = createFormHelpers(formlidForm, submit);

  // validate when form value updated
  createEffect(() => {
    if (props.validationSchema == null) return;
    if (typeof props.validateOnSubmit === 'boolean') {
      if (props.validateOnSubmit) return;
    }
    if (typeof props.validateOnSubmit === 'function') {
      if (props.validateOnSubmit()) return;
    }

    validation(formlidForm, false);
  });

  return { form, field, meta, helpers };
};
