import { Component, JSX, createContext, useContext } from 'solid-js';
import { FormlidContext } from '../formlid';

const FormlidContext = createContext<any | null>(null);

export type FormlidProviderComponent = Component<FormlidContextProviderProps>;

export interface FormlidContextProviderProps {
  children: JSX.Element;
}

export const createFormlidProvider = (value: any) => (props: FormlidContextProviderProps) =>
  <FormlidContext.Provider value={value}>{props.children}</FormlidContext.Provider>;

export const useFormlidContext = <TFormValue extends object>() => {
  const form = useContext<FormlidContext<TFormValue>>(FormlidContext);
  if (form == null)
    throw Error(
      "Your Formlid context hook('useForm' or 'useField') is not under the Formlid Provider"
    );
  return form;
};
