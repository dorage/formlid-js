import type { Component } from 'solid-js';
import { useForm } from 'formlid-js';
import Field from './field';

const App: Component = () => {
  const { extension, SolidFormContext, form } = useForm({
    initialValues: { email: '' },
    onsubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <SolidFormContext>
      <form {...form()}>
        <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
        <Field />
        <button type="submit">제출</button>
      </form>
    </SolidFormContext>
  );
};

export default App;
