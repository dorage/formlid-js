# Formlid-js

Formlid-js is Form helper package for [Solid-JS](https://www.solidjs.com/) with [Yup](https://www.npmjs.com/package/yup) as the validation schema

## Installation

```bash
npm i formlid-js
```

If you encounter `ReferenceError: React is not defined.` Add the code below in the `vite.config.ts`

```typescript
export default defineConfig({
  ...
  optimizeDeps:  {
    include:  [],
    exclude:  ['formlid-js'],
  }
});
```

## Examples

try to check projects under `examples/`


## APIs

### formlid

({
  initialValues: TFormValue;
  validationSchema?: validationSchema\<TFormValue>;
  onsubmit: (formData: TFormValue, helpers: FormlidHelpers\<TFormValue>) => void;
  validateOnSubmit?: boolean;
}) => {
  field: FormlidField\<TFormValue>;
  meta: FormlidMeta\<TFormValue>;
  extension: FormlidExtension\<TFormValue>;
  form: FormlidForm\<TFormValue>;
  helpers: FormlidHelpers\<TFormValue>;
  FormlidProvider: Component<{ children: JSX.Element }>,
}

#### without context

```typescript
  const { field, form, helpers } = formlid({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
    },
    onsubmit: (data, helpers) => {
      alert(`email: ${data.email}\npassword: ${data.password}`);
    },
  });

  ...


  return (
    <form {...form()} class={styles.form}>
      <div>
        <label>e-mail</label>
        <input {...field('email')} autocomplete="off" />
      </div>
      <div>
        <label>password</label>
        <input type="password" {...field('password')} autocomplete="off" />
      </div>
      <button type="submit" disabled={helpers.isSubmitting()}>
        submit
      </button>
    </form>
  );
```

#### with context

``` typescript
  const { form, FormlidProvider, helpers } = Formlid({
    initialValues,
    validationSchema: {
      email: yup.string().email('enter a valid email').required(),
      password: yup.string().min(8, 'be at least 8 characters long').required(),
    },
    onsubmit: async (data) => {
      await timer(1500);

      alert(`email: ${data.email}\npassword: ${data.password}`);
    },
  });

  ...

  return (
    <form {...form()} class={styles.form}>
      <FormlidProvider>
        <Field name="email" />
        <Field name="password" />
        <button type="submit" disabled={helpers.isSubmitting()}>
          submit
        </button>
      </FormlidProvider>
    </form>
  );
```

| argument | type           | description  |
| - | - | - |
| initialValues | TFormValue | The initial values of the form |
| validationSchema | validationSchema\<TFormValue>? | A Yup schema used to validate the form |
| onsubmit | (formData: TFormValue, helpers: FormlidHelpers\<TFormValue>) => void | An event triggered when the form is submitted. It is not called if the validationSchema is invalid. |
| validateOnSubmit | boolean? | If true, the validation (validate()) is only performed when the form is submitted. If false or omitted, the validation (validate()) is triggered on the oninput event of the fields. |

### useForm

\<TFormValue>(name: keyof TFormValue) => Omit
\<ReturnType\<Formlid>, 'FormlidProvider'>

It is the same library. Please find the translation from Korean to English below:
The useForm function works the same as Formlid(), but it operates within the context created by Formlid. Therefore, useForm does not have a FormlidProvider.

### useField

\<TFormValue>(name: keyof TFormValue) => {
  field: () => ReturnType<FormlidField\<TFormValue>>;
  meta: () => ReturnType<FormlidMeta\<TFormValue>>;
  extension: () => ReturnType<FormlidExtension\<TFormValue>>;
  helpers: {},
}

```typescript
  const { field } = useField(props.name);

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
    </div>
  );
```

| arguments | type | description |
| - | - | - |
| name | keyof TFormValue | One of the keys of the initialValue in Formlid.

### TFormValue

TFormValue is the shape of the form data.

When you submit the form, you will receive a result of type TFormValue.

### FormlidField<TFormValue extends object>

### FormlidMeta<TFormValue extends object>

### FormlidExtension<TFormValue extends object>

### FormlidForm<TFormValue extends object>

```text
┬┴┬┴┬┴┤´❛ᴥ❛`ʔฅ = Sorry, I'm preparing API documents
```

## Contributing

Pull requests are welcome.

For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)