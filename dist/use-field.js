import FormContext from './contexts/form-context';
import { useContext } from 'solid-js';
// useField hook
const useField = (name) => {
    const context = useContext(FormContext);
    if (context == null)
        throw Error('this hook is not under the provider');
    return {
        field: () => context.field(name),
        meta: () => context.meta(name),
        extension: () => context.extension(name),
        form: () => context.form(),
        helpers: context.helpers,
    };
};
export default useField;
//# sourceMappingURL=use-field.js.map