import { Signal } from 'solid-js';
import { CustomInputEvent } from '../types/event';
import { UKey, UKeys } from '../types/utils';
/**
 * 하나의 field가 갖는 값
 */
interface fieldSignal<TValue> {
    value: Signal<TValue>;
    error: Signal<string>;
    touched: Signal<boolean>;
    focus: Signal<boolean>;
    oninput: (e: CustomInputEvent) => void;
    onfocus: (e: CustomInputEvent) => void;
    onblur: (e: CustomInputEvent) => void;
}
/**
 * fieldSignal이 모인 formSignal
 */
type formSignal<TFormValue extends object> = {
    [key in UKey<TFormValue>]: fieldSignal<TFormValue[key]>;
};
/**
 * initialValue를 통해 formSignal을 생성
 * @param initialValue
 * @param keys
 * @returns
 */
export declare const createFormSignals: <TFormValue extends object>(initialValue: TFormValue, keys: UKeys<TFormValue>) => formSignal<TFormValue>;
export {};
//# sourceMappingURL=form.d.ts.map