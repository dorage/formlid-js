import { useField } from 'formlid-js';
import type { Component } from 'solid-js';
import { initialValues } from './App';
import { FieldMeta } from './Meta';

interface FieldProps {
  name: keyof typeof initialValues;
}

const Field: Component<FieldProps> = (props) => {
  const { field, meta } = useField<typeof initialValues>(props.name);

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
      <FieldMeta {...meta()} />
    </div>
  );
};

export default Field;
