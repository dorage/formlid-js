import { FormlidLocalTest } from '../formlid-local-test';

export const helperTest = <TFormValue extends object>(
  formlid: FormlidLocalTest<TFormValue>,
  initialValues: TFormValue
) =>
  describe('heleprs test', () => {
    const { helpers } = formlid;

    test('getValues', () => {
      expect(helpers.getValues()).toEqual(initialValues);
    });

    test('setValues', () => {
      const edited = { number: 2, boolean: false };

      helpers.setValues((v) => ({ ...v, ...edited }));
      expect(helpers.getValues()).toEqual({ ...initialValues, ...edited });

      helpers.setValues((v) => ({ ...initialValues }));
      expect(helpers.getValues()).toEqual(initialValues);
    });
  });
