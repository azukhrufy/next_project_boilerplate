// form
import { FormProvider } from "react-hook-form";

// ----------------------------------------------------------------------

/**
 * @param {Object} props
 * @param {Object} props.methods
 * @param {()=> void} props.onSubmit
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
export default function RHFFormProvider({ children, onSubmit, methods }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}
