import { useField } from 'formlid-js';
import type { Component } from 'solid-js';
import { FieldMeta } from './Meta';
import { useFieldFormlidValues } from './App';

interface FieldProps {
  name: keyof useFieldFormlidValues;
}

const Field: Component<FieldProps> = (props) => {
  const { field, meta } = useField<useFieldFormlidValues>(props.name);

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
      <FieldMeta {...meta()} />
    </div>
  );
};

export default Field;
