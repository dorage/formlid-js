import { createSignal } from 'solid-js';
/**
 * initialValue를 통해 formSignal을 생성
 * @param initialValue
 * @param keys
 * @returns
 */
export const createFormSignals = (initialValue, keys) => {
    let formSignals = {};
    keys.forEach((key) => {
        formSignals[key] = {
            value: createSignal(initialValue[key]),
            error: createSignal(''),
            touched: createSignal(false),
            focus: createSignal(false),
            oninput: (e) => {
                formSignals[key].value[1](e.currentTarget.value);
            },
            onfocus: (e) => {
                formSignals[key].touched[1](true);
                formSignals[key].focus[1](true);
            },
            onblur: (e) => {
                formSignals[key].focus[1](false);
            },
        };
    });
    return formSignals;
};
//# sourceMappingURL=form.js.map