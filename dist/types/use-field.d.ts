import { JSX } from 'solid-js';
import { CustomInputEvent } from './types/event';
import { UKey } from './types/utils';
interface FormContextField<TFormValue> {
    name: keyof TFormValue;
    value: TFormValue[keyof TFormValue];
    oninput: (e: CustomInputEvent) => void;
    onfocus: (e: CustomInputEvent) => void;
    onblur: (e: CustomInputEvent) => void;
}
interface FormContextMeta {
    error: string;
    isError: boolean;
    isSuccess: boolean;
    isFocus: boolean;
    isTouched: boolean;
}
interface FormContextForm {
    onsubmit: JSX.EventHandler<HTMLFormElement, Event & {
        submitter: HTMLElement;
    }>;
}
interface FormContextHelpers<TFormValue> {
    setValue: (name: keyof TFormValue, setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue];
    setError: (name: keyof TFormValue, setter: (prev: string) => string) => string;
    setTouched: (name: keyof TFormValue, setter: (prev: boolean) => boolean) => boolean;
    emitSubmit: () => void;
    validate: (formData: TFormValue) => Promise<boolean>;
    getValues: () => TFormValue;
}
declare const useField: <TFormValue extends object>(name: keyof TFormValue) => {
    field: () => FormContextField<TFormValue>;
    meta: () => FormContextMeta;
    extension: () => FormContextField<TFormValue> & FormContextMeta;
    form: () => FormContextForm;
    helpers: FormContextHelpers<TFormValue>;
};
export default useField;
//# sourceMappingURL=use-field.d.ts.map