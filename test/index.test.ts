import { createFormlid } from '../src';
import { Formlid } from '../src/formlid';
import pure from '../src/functions/pure';

const initialValues = { a: 1, b: '1', c: true, d: undefined, e: null };

const formlidFieldTest = (formlid: Formlid<typeof initialValues>) =>
  describe('field prop test', () => {
    const { field } = formlid;

    test('field name', () => {
      for (const key of pure.typeKeys(initialValues)) {
        expect(field(key).name).toEqual(key);
      }
    });

    test('field value', () => {
      for (const key of pure.typeKeys(initialValues)) {
        expect(field(key).value).toEqual(initialValues[key]);
      }
    });
  });

describe('formlid tests', () => {
  const formlid = createFormlid({ initialValues: initialValues, onsubmit: (data, helpers) => {} });

  formlidFieldTest(formlid);
});
