import { createContext } from 'solid-js';
import {
  IFormlidExtension,
  IFormlidField,
  IFormlidForm,
  IFormlidHelpers,
  IFormlidMeta,
} from '../formlid';

// Form Context Type
export interface IFormContext<TFormValue extends object> {
  field: (name: keyof TFormValue) => IFormlidField<TFormValue>;
  meta: (name: keyof TFormValue) => IFormlidMeta<TFormValue>;
  extension: (name: keyof TFormValue) => IFormlidExtension<TFormValue>;
  form: () => IFormlidForm<TFormValue>;
  helpers: IFormlidHelpers<TFormValue>;
}

const FormContext = createContext<any>();

export default FormContext;
