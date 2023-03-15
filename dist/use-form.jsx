import FormContext from './contexts/form-context';
import { createFormSignals } from './functions/form';
import pure from './functions/pure';
/**
 * form context provider를 생성하고 submit을 담당하는 컴포넌트
 * @param props
 * @returns
 */
const useForm = (props) => {
    const keys = pure.typeKeys(props.initialValues);
    const formSignals = createFormSignals(props.initialValues, keys);
    // Form methods
    /**
     * form value 객체를 가져옵니다
     * @returns
     */
    const getValues = () => {
        const values = {};
        keys.forEach((key) => (values[key] = formSignals[key].value[0]()));
        return values;
    };
    /**
     * field를 직접 수정합니다.
     * @param name
     * @param value
     */
    const setValue = (name, setter) => formSignals[name].value[1](setter);
    /**
     * error를 직접 수정합니다
     * @param name
     * @param setter
     * @returns
     */
    const setError = (name, setter) => formSignals[name].error[1](setter);
    /**
     * touched를 직접 수정합니다
     * @param name
     * @param setter
     * @returns
     */
    const setTouched = (name, setter) => formSignals[name].touched[1](setter);
    /**
     * form 에 들어갈 onsubmit 핸들러
     */
    const onsubmit = async (e) => {
        e.preventDefault();
        emitSubmit();
    };
    /**
     * validate formData
     * @param formData
     * @returns
     */
    const validate = async (formData) => {
        if (props.validationSchema == null)
            return true;
        try {
            await props.validationSchema.validate(formData, {
                strict: true,
                abortEarly: false,
            });
            return true;
        }
        catch (err) {
            const keySet = new Set(keys);
            // 에러 주입
            err.inner.forEach((error) => {
                const key = error.path;
                const message = error.message;
                keySet.delete(key);
                formSignals[key].error[1](message);
            });
            // 에러 없는 필드 초기화
            for (const key of [...keySet]) {
                formSignals[key].error[1](() => '');
            }
            return false;
        }
    };
    /**
     * 직접 submit을 실행합니다
     */
    const emitSubmit = async () => {
        const formData = getValues();
        // validation
        if (!(await validate(formData)))
            return;
        // submit
        props.onsubmit(formData);
    };
    // Input methods
    /**
     * input 에 사용될 기본 Props를 반환하는 함수
     * @param name
     * @returns
     */
    const field = (name) => ({
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
    const meta = (name) => ({
        error: formSignals[name].error[0](),
        isError: formSignals[name].error[0]() !== '' && formSignals[name].touched[0](),
        isSuccess: formSignals[name].error[0]() === '' && formSignals[name].touched[0](),
        isFocus: formSignals[name].focus[0](),
        isTouched: formSignals[name].touched[0](),
    });
    /**
     * field와 meta가 합쳐진 필드
     * @param name
     * @returns
     */
    const extension = (name) => ({ ...field(name), ...meta(name) });
    /**
     * form에 관련된 함수
     * @returns
     */
    const form = () => ({
        onsubmit,
    });
    const helpers = {
        setValue,
        setError,
        setTouched,
        emitSubmit,
        validate,
        getValues,
    };
    const SolidFormContext = (props) => {
        return (<FormContext.Provider value={{ field, meta, form, extension, helpers }}>
        {props.children}
      </FormContext.Provider>);
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
//# sourceMappingURL=use-form.jsx.map