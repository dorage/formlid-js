import initialValues from './contants/initial-values';
import { createFormlidLocalTest } from './formlid-local-test';
import { fieldHelperTest } from './helpers/field';
import { helperTest } from './helpers';
import { metaHelpersTest } from './helpers/meta';

describe('formlid tests', () => {
  const initialValue = initialValues[0];

  const formlid = createFormlidLocalTest({
    initialValues: initialValue,
    onsubmit: (data, helpers) => {
      console.log(data);
    },
  });

  fieldHelperTest<typeof initialValue>(formlid, initialValue);
  metaHelpersTest<typeof initialValue>(formlid, initialValue);
  helperTest<typeof initialValue>(formlid, initialValue);
});
