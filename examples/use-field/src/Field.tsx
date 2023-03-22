import { useField } from 'formlid-js';
import type { Component } from 'solid-js';
import { initialValues } from './App';

interface FieldProps {
  name: keyof typeof initialValues;
}

const Field: Component<FieldProps> = (props) => {
  const { field, meta } = useField<typeof initialValues>(props.name);

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
      <div>{JSON.stringify(meta())}</div>
    </div>
  );
};

export default Field;
