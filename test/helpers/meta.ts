import pure from '../../src/functions/pure';
import { FormlidLocalTest } from '../formlid-local-test';
import { faker, he } from '@faker-js/faker';

export const metaHelpersTest = <TFormValue extends object>(
  formlid: FormlidLocalTest<TFormValue>,
  initialValues: TFormValue
) =>
  describe('meta helpers test', () => {
    const { meta, helpers } = formlid;

    test('error', () => {
      // backup
      const original = helpers.getErrors();
      const modified = {} as any;
      const keys = pure.typeKeys(initialValues);

      // insert random values
      for (const key of keys) {
        const rand = faker.animal.bear();
        meta(key).setError(rand);
        modified[key] = rand;
      }

      // check field values are same
      for (const key of keys) {
        expect(meta(key).error).toEqual(modified[key]);
      }

      // check getFieldValues working well
      expect(helpers.getErrors()).toEqual(modified);

      // restore
      helpers.setErrors(original);
      expect(helpers.getErrors()).toEqual(original);
    });

    test('isFocused', () => {
      // backup
      const original = helpers.getFocuses();
      const modified = {} as any;
      const keys = pure.typeKeys(initialValues);

      // insert random values
      for (const key of keys) {
        const rand = Boolean(Math.round(Math.random()));
        meta(key).setIsFocused(rand);
        modified[key] = rand;
      }

      // check field values are same
      for (const key of keys) {
        expect(meta(key).isFocused).toEqual(modified[key]);
      }

      // check getFieldValues working well
      expect(helpers.getFocuses()).toEqual(modified);

      // restore
      helpers.setFocuses(original);
      expect(helpers.getFocuses()).toEqual(original);
    });

    test('isTouched', () => {
      // backup
      const original = helpers.getTouches();
      const modified = {} as any;
      const keys = pure.typeKeys(initialValues);

      // insert random values
      for (const key of keys) {
        const rand = Boolean(Math.round(Math.random()));
        meta(key).setIsTouched(rand);
        modified[key] = rand;
      }

      // check field values are same
      for (const key of keys) {
        expect(meta(key).isTouched).toEqual(modified[key]);
      }

      // check getFieldValues working well
      expect(helpers.getTouches()).toEqual(modified);

      // restore
      helpers.setTouches(original);
      expect(helpers.getTouches()).toEqual(original);
    });

    test('isValidated', () => {
      // backup
      const original = helpers.getValidates();
      const modified = {} as any;
      const keys = pure.typeKeys(initialValues);

      // insert random values
      for (const key of keys) {
        const isValidated = Boolean(Math.round(Math.random()));
        meta(key).setIsValidated(isValidated);
        modified[key] = isValidated;
      }

      // check field values are same
      for (const key of keys) {
        expect(meta(key).isValidated).toEqual(modified[key]);
      }

      // check getFieldValues working well
      expect(helpers.getValidates()).toEqual(modified);

      // restore
      helpers.setValidates(original);
      expect(helpers.getValidates()).toEqual(original);
    });
  });
