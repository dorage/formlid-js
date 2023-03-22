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

## Usage

try to check projects under `examples/`

```
┬┴┬┴┬┴┤´❛ᴥ❛`ʔฅ = Sorry, I'm preparing API documents
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)