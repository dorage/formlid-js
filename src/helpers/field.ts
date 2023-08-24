import { UKey } from '../types/utils';
import { FormlidForm } from '../form';

export type FormlidFieldHelpers<TFormValue extends object> = ReturnType<typeof createFieldHelpers>;

export const createFieldHelpers = <TFormValue extends object>(form: FormlidForm<TFormValue>) => {
  return <TKey extends UKey<TFormValue>>(name: TKey) => ({
    name,
    value: form.fields[name].value[0]() as TFormValue[TKey],
    oninput: form.fields[name].oninput,
    onfocus: form.fields[name].onfocus,
    onblur: form.fields[name].onblur,
  });
};
