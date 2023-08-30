import pure from '../../src/functions/pure';
import { FormlidLocalTest } from '../formlid-local-test';

export const fieldHelperTest = <TFormValue extends object>(
  formlid: FormlidLocalTest<TFormValue>,
  initialValues: TFormValue
) =>
  describe('field helpers test', () => {
    const { field } = formlid;

    test('name', () => {
      for (const key of pure.typeKeys(initialValues)) {
        expect(field(key).name).toEqual(key);
      }
    });

    test('value', () => {
      for (const key of pure.typeKeys(initialValues)) {
        expect(field(key).value).toEqual(initialValues[key]);
      }
    });
  });
