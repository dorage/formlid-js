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
  field: IFormlidField<TFormValue>;
  meta: IFormlidMeta<TFormValue>;
  extension: IFormlidExtension<TFormValue>;
  form: () => IFormlidForm;
  helpers: IFormlidHelpers<TFormValue>;
}

const FormContext = createContext<any>();

export default FormContext;
