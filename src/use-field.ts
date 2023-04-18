import { useContext } from 'solid-js';
import FormContext, { IFormContext } from './contexts/form-context';
import { UKey } from './types/utils';

// useField hook
const useField = <TFormValue extends object>(name: UKey<TFormValue>) => {
  const context = useContext<IFormContext<TFormValue>>(FormContext);
  if (context == null) throw Error('this hook is not under the provider');

  return {
    field: () => context.field(name),
    meta: () => context.meta(name),
    extension: () => context.extension(name),
    helpers: {
      ...context.helpers,
      setValue: (setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]) =>
        context.helpers.setValue(name, setter),
      setError: (setter: (prev: string) => string) => context.helpers.setError(name, setter),
      setTouched: (setter: (prev: boolean) => boolean) => context.helpers.setTouched(name, setter),
    },
  };
};

export default useField;
