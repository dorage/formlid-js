import { useField } from 'formlid-js';
import type { Component } from 'solid-js';
import { FieldMeta } from './Meta';
import { FormValue } from './App';

interface FieldProps {
  name: keyof FormValue;
}

const Field: Component<FieldProps> = (props) => {
  const { field, meta } = useField<FormValue>({ name: props.name });

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} value={`${field().value}`} />
      <FieldMeta {...meta()} />
    </div>
  );
};

export default Field;
