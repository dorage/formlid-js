import { UKey } from '../types/utils';
import { FormlidForm } from '../form';
import { createField } from '../field';

export type FormlidFieldHelpers<TFormValue extends object> = ReturnType<
  typeof createFieldHelpers<TFormValue>
>;

export const createFieldHelpers = <TFormValue extends object>(form: FormlidForm<TFormValue>) => {
  return <TKey extends UKey<TFormValue>>(name: TKey) => {
    // if 'name' field is partial, so it is not delivered through props.initialValue
    // create new field dynamically
    if (form.fields[name] == null) {
      form.fields[name] = createField(undefined) as any;
    }

    return {
      name,
      value: form.fields[name].value[0]() as TFormValue[TKey],
      setValue: form.fields[name].value[1],
      oninput: form.fields[name].oninput,
      onfocus: form.fields[name].onfocus,
      onblur: form.fields[name].onblur,
    };
  };
};
