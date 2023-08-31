import { Accessor, Component, createEffect } from 'solid-js';
import * as Yup from 'yup';
import { createFormlidForm } from './form';
import {
  createHelpers,
  createSubmitHelpers,
  FormlidHelpers,
  FormlidSubmitHelpers,
} from './helpers';
import { FormlidFieldHelpers, createFieldHelpers } from './helpers/field';
import { FormlidFormHelpers, createFormHelpers } from './helpers/form';
import { createFormlidSubmit } from './helpers/submit';
import { validation } from './helpers/validation';
import { FormlidMetaHelpers, createMetaHelpers } from './helpers/meta';
import { FormlidProviderComponent, createFormlidProvider } from './contexts';

export interface Formlid<TFormValue extends object> {
  form: FormlidFormHelpers;
  field: FormlidFieldHelpers<TFormValue>;
  meta: FormlidMetaHelpers<TFormValue>;
  helpers: FormlidHelpers<TFormValue>;
  FormlidProvider: FormlidProviderComponent;
}

export type FormlidContext<TFormValue extends object> = Omit<
  ReturnType<typeof createFormlid<TFormValue>>,
  'FormlidProvider'
>;

export type ValidationSchema = {
  [key in string]?: Yup.Schema;
};

// Formlid의 Props
export interface FormlidProps<TFormValue extends object> {
  initialValues: TFormValue;
  validationSchema?: ValidationSchema;
  onsubmit: (formData: TFormValue, helpers: FormlidSubmitHelpers<TFormValue>) => any | Promise<any>;
  validateOnSubmitOnly?: boolean | Accessor<boolean>;
}

// TODO; add reactive on initialValues & validationSchema in createFormlid props
// TODO; refactor field signals to Store

export const createFormlid = <TFormValue extends object>(
  props: FormlidProps<TFormValue>
): Formlid<TFormValue> => {
  const formlidForm = createFormlidForm<TFormValue>(props);

  // helpers
  const field = createFieldHelpers(formlidForm);
  const meta = createMetaHelpers(formlidForm);
  // helpers related with submit
  const submitHelpers = createSubmitHelpers(formlidForm, field, meta);
  const submit = createFormlidSubmit(formlidForm, submitHelpers);
  const helpers = createHelpers(submit, submitHelpers);
  const form = createFormHelpers(formlidForm, submit);

  // validate when form value updated
  createEffect(() => {
    if (props.validationSchema == null) return;
    if (typeof props.validateOnSubmitOnly === 'boolean') {
      if (props.validateOnSubmitOnly) return;
    }
    if (typeof props.validateOnSubmitOnly === 'function') {
      if (props.validateOnSubmitOnly()) return;
    }

    validation(formlidForm, false);
  });

  // create formlid context provider
  const FormlidProvider = createFormlidProvider({ form, field, meta, helpers });

  return { form, field, meta, helpers, FormlidProvider };
};
