import { useFormlidContext } from '.';

export const useForm = <TFormValue extends object>() => {
  return useFormlidContext<TFormValue>();
};
