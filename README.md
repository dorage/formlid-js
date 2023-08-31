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

### createFormlid

create formlid store.

#### without context

```typescript
  // formlid value type
  interface InitialValue {
    email: string;
    password: string;
    age?: number;
    checked: boolean[];
  }

  ...

  const { field, meta, form } = createFormlid<InitialValue>({
    initialValues: {
      email: '',
      password: '',
      checked: [],
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
      checked: yup.array().of(yup.boolean().required()).required(),
    },
    onsubmit: async (data, helpers) => {
      await delya(1500); // wait for 1500ms
      alert(`submitted!\nemail: ${data.email}\npassword: ${data.password}`);
      console.log(helpers.getValues());
    },
  });

  ...


  return (
    <form {...form()}>
      <div>
        <label>e-mail</label>
        <input {...field('email')} autocomplete="off" />
      </div>
      <div>
        <label>password</label>
        <input type="password" {...field('password')} autocomplete="off" />
      </div>
      <button type="submit" disabled={form.isSubmitting()}>
        submit after 1500ms
      </button>
    </form>
  );
```

#### with context

``` typescript
// App.tsx

  // formlid value type
  interface InitialValue {
    email: string;
    password: string;
    age?: number;
    checked: boolean[];
  }

  ...

  const { form, FormlidProvider } = Formlid({
    initialValues: {
      email: '',
      password: '',
      checked: [],
    },
    validationSchema: {
      email: yup.string().required().email('enter a valid email'),
      password: yup.string().required().min(8, 'be at least 8 characters long'),
      checked: yup.array().of(yup.boolean().required()).required(),
    },
    onsubmit: async (data, helpers) => {
      await delya(1500); // wait for 1500ms
      alert(`submitted!\nemail: ${data.email}\npassword: ${data.password}`);
      console.log(helpers.getValues());
    },
  });

  ...

  return (
    <form {...form()}>
      <FormlidProvider>
        <!-- custom components -->
        <Field name="email" />
        <Field name="password" />
        <button type="submit" disabled={form.isSubmitting()}>
          submit
        </button>
      </FormlidProvider>
    </form>
  );

// Field.tsx

const Field = (props) => {
  const {field, meta, helpers} = useField(props.name);

  ...

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} value={`${field().value}`} />
    </div>
  );
}

```

#### createFormlid() arguments
| arguments | Required | type | description |
| - | - | - | - |
| initialValues | Required | TFormValue; | initial value of form
| validationSchema | Optional |  {[key in string]: Yup.Schema} | yup validation schema
| onsubmit | Required | (formData: TFormValue, helpers: FormlidSubmitHelpers\<TFormValue>) => any \| Promise\<any>; | callback function when submit the form
| validateOnSubmitOnly | Optional |  boolean \| Accessor\<boolean>; | validate with validation schema when submit is emitted only

#### createFormlid() returns
| field | type |
| - | - | 
| form |  |
| field |  |
| meta |  |
| helpers |  |
| FormlidProvider | Component<{children: JSX.Element}> |



### useForm

It is a wrapper function of useContext. when you should call createFormlid() in a parent component of the component that has form element.

Thus, you should use call useForm() in a child component under the FormlidProvider.

It returns same object as createFormlid() without FormlidProvider. 

```typescript

  const { field } = useForm(); 

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
    </div>
  );

```

#### useForm() arguments
| arguments | Required | type | description |
| - | - | - | - |


#### useForm() returns
| field | type |
| - | - | 
| form |  |
| field |  |
| meta |  |
| helpers |  |


### useField

It is a wrapper function of useContext. when you should call createFormlid() in a parent component of the component that has form element.

Thus, you should use call useForm() in a child component under the FormlidProvider.

It returns same object as createFormlid() without FormlidProvider.

You do not need to forward the name When calling a function that previously required a name like field(), meta(), helpers.setValue(), etc.


```typescript

  const { field } = useField('name'); 

  return (
    <div>
      <label>{props.name}</label>
      <input {...field()} />
    </div>
  );

```

#### useField() arguments
| arguments | type | description |
| - | - | - |
| name | keyof TFormValue | One of the key of the initialValue.

#### useField() returns
| field | type |
| - | - | 
| form |  |
| field |  |
| meta |  |
| helpers |  |


## Types

### TFormValue


## Contributing

"Pull Requests are welcome."

For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)