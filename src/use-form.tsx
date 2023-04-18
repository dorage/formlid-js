import { useContext } from 'solid-js';
import FormContext, { IFormContext } from './contexts/form-context';
import { UKey } from './types/utils';

// useForm hook
const useForm = <TFormValue extends object>(name: UKey<TFormValue>) => {
  const context = useContext<IFormContext<TFormValue>>(FormContext);
  if (context == null) throw Error('this hook is not under the provider');
  return context;
};

export default useForm;
