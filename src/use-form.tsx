import { Accessor, Component, createSignal, JSX } from 'solid-js';
import * as Yup from 'yup';
import FormContext from './contexts/form-context';
import { createFormSignals } from './functions/form';
import pure from './functions/pure';
import { UKey } from './types/utils';

export interface FormContextHelpers<TFormValue> {
  isSubmitted: Accessor<boolean>;
  isSubmitting: Accessor<boolean>;
  getValues: () => TFormValue;
  setValue: (
    name: keyof TFormValue,
    setter: (prev: TFormValue[keyof TFormValue]) => TFormValue[keyof TFormValue]
  ) => TFormValue[keyof TFormValue];
  setValues: (setter: (prev: TFormValue) => TFormValue) => void;
  getErrors: () => { [key in keyof TFormValue]: boolean };
  setError: (name: keyof TFormValue, setter: (prev: string) => string) => string;
  getTouched: () => { [key in keyof TFormValue]: boolean };
  setTouched: (name: keyof TFormValue, setter: (prev: boolean) => boolean) => boolean;
  emitSubmit: () => void;
  validate: (formData: TFormValue) => Promise<boolean>;
}

// useForm의 Props
interface useFormProps<TFormValue extends object> {
  initialValues: TFormValue;
  validationSchema?: { [key in keyof TFormValue]: Yup.Schema<TFormValue[key]> };
  onsubmit: (formData: TFormValue, helpers: FormContextHelpers<TFormValue>) => void;
  validateOnSubmit?: boolean;
}

/**
 * form context provider를 생성하고 submit을 담당하는 컴포넌트
 * @param props
 * @returns
 */
const useForm = <TFormValue extends object>(props: useFormProps<TFormValue>) => {
  // Form methods

  /**
   * form value 객체를 가져옵니다
   * @returns
   */
  const getValues = (): TFormValue => {
    const values: any = {};

    keys.forEach((key: UKey<TFormValue>) => (values[key] = formSignals[key].value[0]()));

    return values;
  };

  /**
   * field를 직접 수정합니다.
   * @param name
   * @param value
   */
  const setValue = (
    name: UKey<TFormValue>,
    setter: (prev: TFormValue[typeof name]) => TFormValue[typeof name]
  ) => formSignals[name].value[1](setter);

  /**
   * field들을 직접 수정합니다.
   * @param name
   * @param value
   */
  const setValues = (setter: (prev: TFormValue) => TFormValue) => {
    const newValues = setter(getValues());
    for (const key of keys) {
      formSignals[key].value[1](() => newValues[key]);
    }
  };

  /**
   * form error 객체를 가져옵니다
   * @returns
   */
  const getErrors = (): { [key in keyof TFormValue]: boolean } => {
    const values: any = {};

    keys.forEach((key: UKey<TFormValue>) => (values[key] = formSignals[key].error[0]()));

    return values;
  };
  /**
   * error를 직접 수정합니다
   * @param name
   * @param setter
   * @returns
   */
  const setError = (name: UKey<TFormValue>, setter: (prev: string) => string) =>
    formSignals[name].error[1](setter);

  /**
   * form error 객체를 가져옵니다
   * @returns
   */
  const getTouched = (): { [key in keyof TFormValue]: boolean } => {
    const values: any = {};

    keys.forEach((key: UKey<TFormValue>) => (values[key] = formSignals[key].touched[0]()));

    return values;
  };
  /**
   * touched를 직접 수정합니다
   * @param name
   * @param setter
   * @returns
   */
  const setTouched = (name: UKey<TFormValue>, setter: (prev: boolean) => boolean) =>
    formSignals[name].touched[1](setter);

  /**
   * form 에 들어갈 onsubmit 핸들러
   */
  const onsubmit: JSX.CustomEventHandlersCamelCase<HTMLFormElement>['onSubmit'] = async (e) => {
    e.preventDefault();
    emitSubmit();
  };

  /**
   * validate field
   * @param key
   * @returns
   */
  const validateField = async (key: UKey<TFormValue>) => {
    if (props.validationSchema == null) return true;
    if (props.validationSchema[key] == null) return true;
    try {
      formSignals[key].validated[1](() => true);
      await props.validationSchema[key].validate(formSignals[key].value[0](), { strict: true });
      formSignals[key].error[1](() => '');
      return true;
    } catch (err) {
      formSignals[key].error[1](() => (err as Yup.ValidationError).message);
    }
    return false;
  };
  /**
   * validate formData
   * @param formData
   * @returns
   */
  const validate = async (formData: TFormValue) => {
    if (props.validationSchema == null) return true;
    let success = true;
    for (const key of keys) {
      success = await validateField(key);
    }
    return success;
  };

  /**
   * submit을 실행합니다
   */
  const emitSubmit = async () => {
    if (isSubmitting()) return;
    setIsSubmitting(() => true);
    const formData = getValues();

    // validation
    if (!(await validate(formData))) {
      setIsSubmitting(() => false);
      return;
    }

    // submit
    await props.onsubmit(formData, helpers);
    setIsSubmitted(() => true);
    setIsSubmitting(() => false);
  };

  // Input methods

  /**
   * input 에 사용될 기본 Props를 반환하는 함수
   * @param name
   * @returns
   */
  const field = (name: UKey<TFormValue>) => ({
    name,
    value: formSignals[name].value[0](),
    oninput: formSignals[name].oninput,
    onfocus: formSignals[name].onfocus,
    onblur: formSignals[name].onblur,
  });

  /**
   * 기타 필드 정보와 관련된 함수
   * @param name
   * @returns
   */
  const meta = (name: UKey<TFormValue>) => ({
    error: formSignals[name].error[0](),
    isError: formSignals[name].error[0]() !== '',
    isSuccess:
      formSignals[name].error[0]() === '' &&
      formSignals[name].touched[0]() &&
      formSignals[name].validated[0](),
    isFocus: formSignals[name].focus[0](),
    isTouched: formSignals[name].touched[0](),
  });

  /**
   * field와 meta가 합쳐진 필드
   * @param name
   * @returns
   */
  const extension = (name: UKey<TFormValue>) => ({ ...field(name), ...meta(name) });

  /**
   * form에 관련된 함수
   * @returns
   */
  const form = () => ({
    onsubmit,
  });

  // variables and signals
  const keys = pure.typeKeys(props.initialValues);
  const formSignals = createFormSignals(
    props.initialValues,
    keys,
    props.validateOnSubmit ? undefined : validateField
  );
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  // helpers
  const helpers: FormContextHelpers<TFormValue> = {
    isSubmitted,
    isSubmitting,
    getValues,
    setValue,
    setValues,
    getErrors,
    setError,
    getTouched,
    setTouched,
    emitSubmit,
    validate,
  };

  const SolidFormContext: Component<{ children: JSX.Element }> = (props) => {
    return (
      <FormContext.Provider value={{ field, meta, form, extension, helpers }}>
        {props.children}
      </FormContext.Provider>
    );
  };

  return {
    field,
    meta,
    extension,
    form,
    SolidFormContext,
    helpers,
  };
};

export default useForm;
