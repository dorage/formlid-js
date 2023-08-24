import { createReaction, createSignal, Setter, Signal } from 'solid-js';
import { CustomInputEvent } from './types/event';

export interface FormlidFieldSignals<TValue> {
  value: Signal<TValue>;
  error: Signal<string>;
  changed: Signal<boolean>;
  touched: Signal<boolean>;
  focus: Signal<boolean>;
  validated: Signal<boolean>;
}

interface FormlidFieldEvents<> {
  oninput: (e: CustomInputEvent) => void;
  onfocus: (e: CustomInputEvent) => void;
  onblur: (e: CustomInputEvent) => void;
}

export interface FormlidField<TValue> extends FormlidFieldSignals<TValue>, FormlidFieldEvents {}

/**
 * track field's value change
 * @param setChanged
 * @returns
 */
const trackChanged = (setChanged: Setter<boolean>) => createReaction(() => setChanged(() => true));

/**
 * create FormlidField status signals
 * @param value
 * @returns
 */
const createFieldSignals = <TValue>(value: TValue): FormlidFieldSignals<TValue> => {
  const singals = {
    value: createSignal(value),
    error: createSignal(''),
    changed: createSignal(false),
    touched: createSignal(false),
    focus: createSignal(false),
    validated: createSignal(false), // if validation run once at least, true
  };

  return singals;
};

/**
 * create input-field events
 * @param signal
 * @returns
 */
const createFieldEvents = (signal: FormlidFieldSignals<any>): FormlidFieldEvents => {
  const events = {
    oninput: async (e: CustomInputEvent) => {
      signal.value[1](e.currentTarget.value as any);
    },
    onfocus: (e: CustomInputEvent) => {
      signal.touched[1](true);
      signal.focus[1](true);
    },
    onblur: (e: CustomInputEvent) => {
      signal.focus[1](false);
    },
  };

  return events;
};

/**
 * create FormlidField, has field data
 * @param key
 * @param initialValue
 * @returns
 */
export const createField = <TValue>(initialValue: TValue): FormlidField<TValue> => {
  const fieldSignals = createFieldSignals(initialValue);
  const fieldEvents = createFieldEvents(fieldSignals);

  // if value has changed, changed would be update
  trackChanged(fieldSignals.changed[1])(() => fieldSignals.value[0]());

  return {
    ...fieldSignals,
    ...fieldEvents,
  };
};
