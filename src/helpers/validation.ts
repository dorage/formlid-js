import * as Yup from 'yup';
import pure from '../functions/pure';
import { FormlidForm } from '../form';

export const validateField =
  (form: FormlidForm<any>, isSubmit = true) =>
  async (key: string) => {
    if (form.fields[key] == null) {
      console.error(`[formlid.js] '${key}' field on validationSchema is not exist in formValue!`);
      return false;
    }
    try {
      if (form.props.validationSchema == null) return true;
      if (form.props.validationSchema[key] == null) return true;
      // if value has not changed, dont validated it
      if (!isSubmit && !form.fields[key].changed[0]()) return true;
      // validate
      await form.props.validationSchema[key]?.validate(form.fields[key].value[0](), {
        strict: true,
      });
      form.fields[key].validated[1](() => true);
      form.fields[key].error[1](() => '');
      return true;
    } catch (err) {
      form.fields[key].validated[1](() => false);
      form.fields[key].error[1](() => (err as Yup.ValidationError).message);
      return false;
    }
  };

export const validation = async (form: FormlidForm<any>, isSubmit = true) => {
  if (form.props.validationSchema == null) return true;
  const validateSchemaKeys = pure.typeKeys(form.props.validationSchema);

  const results = await Promise.all(validateSchemaKeys.map(validateField(form, isSubmit)));
  return results.every(Boolean);
};
