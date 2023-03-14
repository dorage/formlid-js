import { UKeys } from 'types/utils';

const typeKeys = <TObject extends object>(obj: TObject): UKeys<TObject> =>
  Object.keys(obj) as UKeys<TObject>;

const pure = { typeKeys };

export default pure;
