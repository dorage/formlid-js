import type { Component } from 'solid-js';
import { useField, useForm } from 'formlid-js';

const Field: Component = () => {
  const { extension } = useField('email');
  return <input class="border" {...extension()} />;
};

export default Field;
