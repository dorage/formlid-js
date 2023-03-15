import { Component, JSX } from 'solid-js';
import * as Yup from 'yup';
import { UKey } from './types/utils';
interface useFormProps<TFormValue extends object> {
    initialValues: TFormValue;
    validationSchema?: Yup.Schema<TFormValue>;
    onsubmit: (formData: TFormValue) => void;
}
/**
 * form context provider를 생성하고 submit을 담당하는 컴포넌트
 * @param props
 * @returns
 */
declare const useForm: <TFormValue extends object>(props: useFormProps<TFormValue>) => {
    field: (name: keyof TFormValue) => {
        name: keyof TFormValue;
        value: TFormValue[keyof TFormValue];
        oninput: (e: import("./types/event").CustomInputEvent) => void;
        onfocus: (e: import("./types/event").CustomInputEvent) => void;
        onblur: (e: import("./types/event").CustomInputEvent) => void;
    };
    meta: (name: keyof TFormValue) => {
        error: string;
        isError: boolean;
        isSuccess: boolean;
        isFocus: boolean;
        isTouched: boolean;
    };
    extension: (name: keyof TFormValue) => {
        error: string;
        isError: boolean;
        isSuccess: boolean;
        isFocus: boolean;
        isTouched: boolean;
        name: keyof TFormValue;
        value: TFormValue[keyof TFormValue];
        oninput: (e: import("./types/event").CustomInputEvent) => void;
        onfocus: (e: import("./types/event").CustomInputEvent) => void;
        onblur: (e: import("./types/event").CustomInputEvent) => void;
    };
    form: () => {
        onsubmit: JSX.EventHandler<HTMLFormElement, Event & {
            submitter: HTMLElement;
        }>;
    };
    SolidFormContext: Component<{
        children: JSX.Element;
    }>;
    helpers: {
        setValue: (name: keyof TFormValue, setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue];
        setError: (name: keyof TFormValue, setter: (prev: string) => string) => string;
        setTouched: (name: keyof TFormValue, setter: (prev: boolean) => boolean) => boolean;
        emitSubmit: () => Promise<void>;
        validate: (formData: TFormValue) => Promise<boolean>;
        getValues: () => TFormValue;
    };
};
export default useForm;
//# sourceMappingURL=use-form.d.ts.map