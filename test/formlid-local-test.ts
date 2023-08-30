import { Accessor, createEffect } from 'solid-js';
import * as Yup from 'yup';
import { FormlidSubmitHelpers, createHelpers, createSubmitHelpers } from '../src/helpers';
import { createFormlidForm } from '../src/form';
import { createFieldHelpers } from '../src/helpers/field';
import { createMetaHelpers } from '../src/helpers/meta';
import { createFormlidSubmit } from '../src/helpers/submit';
import { createFormHelpers } from '../src/helpers/form';
import { validation } from '../src/helpers/validation';

export type FormlidLocalTest<TFormValue extends object> = ReturnType<
  typeof createFormlidLocalTest<TFormValue>
>;

export type ValidationSchema = {
  [key in string]?: Yup.Schema;
};

// Formlid의 Props
export interface FormlidProps<TFormValue extends object> {
  initialValues: TFormValue;
  validationSchema?: ValidationSchema;
  onsubmit: (formData: TFormValue, helpers: FormlidSubmitHelpers<TFormValue>) => any | Promise<any>;
  validateOnSubmit?: boolean | Accessor<boolean>;
}

export const createFormlidLocalTest = <TFormValue extends object>(
  props: FormlidProps<TFormValue>
) => {
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
