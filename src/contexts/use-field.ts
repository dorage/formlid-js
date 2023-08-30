import { useFormlidContext } from '.';
import { UKey } from '../types/utils';

interface useFieldArgs<TFormValue extends object> {
  name: UKey<TFormValue>;
}

export const useField = <TFormValue extends object>(args: useFieldArgs<TFormValue>) => {
  const formlid = useFormlidContext<TFormValue>();

  return {
    ...formlid,
    field: () => formlid.field(args.name),
    meta: () => formlid.meta(args.name),
    helpers: () => ({
      ...formlid.helpers,
      // set single field
      setValue: () => formlid.helpers.setValue(args.name),
      setError: () => formlid.helpers.setError(args.name),
      setIsTouched: () => formlid.helpers.setIsTouched(args.name),
      setIsFocused: () => formlid.helpers.setIsFocused(args.name),
      setIsValidated: () => formlid.helpers.setIsValidated(args.name),
    }),
  };
};
