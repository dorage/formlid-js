import { createSignal, Signal } from 'solid-js';
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
  validated: Signal<boolean>;
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
export const createFormSignals = <TFormValue extends object>(
  initialValue: TFormValue,
  keys: UKeys<TFormValue>,
  validateField?: (key: UKey<TFormValue>) => Promise<boolean>
): formSignal<TFormValue> => {
  let formSignals: any = {};

  keys.forEach((key) => {
    formSignals[key] = {
      value: createSignal(initialValue[key]),
      error: createSignal(''),
      touched: createSignal(false),
      focus: createSignal(false),
      validated: createSignal(false), // 한 번이라도 validate가 실행되었던 field인지 체크
      oninput: async (e: CustomInputEvent) => {
        formSignals[key]!.value[1](e.currentTarget.value as any);
        if (validateField) validateField(key);
      },
      onfocus: (e: CustomInputEvent) => {
        formSignals[key]!.touched[1](true);
        formSignals[key]!.focus[1](true);
      },
      onblur: (e: CustomInputEvent) => {
        formSignals[key]!.focus[1](false);
      },
    };
  });

  return formSignals;
};
