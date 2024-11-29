// form
import { useFormContext, useController } from "react-hook-form";
// @chakra-ui
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
// utils
import {
  formatPreciseNumber,
  parseFormattedNumber,
} from "@/utils/numberHelper";

// ----------------------------------------------------------------------

const defaultParse = (stringValue) => {
  // reverse format the number
  // i.e. 1.000.000,00 -> 1000000.00
  // note in the reversed format, the decimal separator is always '.'
  // since thats how you write a decimal number in javascript
  const parsedNumber = parseFormattedNumber(stringValue);

  if (!parsedNumber) return stringValue;

  return parsedNumber;
};

const defaultFormat = formatPreciseNumber;

// ----------------------------------------------------------------------

/**
 * Props extends from Chakra UI `NumberInput` component
 * @see https://chakra-ui.com/docs/form/number-input/props
 * @param {Object} props
 * @param {string} props.name
 * @param {?React.ReactNode} props.label
 * @param {?React.ReactNode} props.helperText
 * @param {?Boolean} props.isDisabled
 * @param {?Boolean} props.isReadOnly
 * @param {?Boolean} props.isRequired
 *
 * @param {(input: number)=>string} [props.format=defaultFormat]
 * @param {(input: string)=>number|string} [props.parse=defaultParse]
 * //
 * @param {?React.ReactNode} props.leftElement - must be wrapped in Chakra's `InputLeftElement` component
 * @param {?React.ReactNode} props.rightElement - must be wrapped in Chakra's `InputRightElement` component
 * @param {?React.ReactNode} props.leftAddon - must be wrapped in Chakra's `InputLeftAddon` component
 * @param {?React.ReactNode} props.rightAddon - must be wrapped in Chakra's `InputRightAddon` component
 * //
 * @param {Boolean} [props.isShowStepper=true]
 * //
 * @param {import('@chakra-ui/react').InputGroupProps['size']} props.size - size by default passed to `InputGroup` component
 * @param {import('@chakra-ui/react').InputGroupProps['variant']} props.variant - variant by default passed to `InputGroup` component
 * //
 * @param {import('@chakra-ui/react').InputGroupProps} props.inputGroupProps
 * @returns {JSX.Element}
 */
export default function RHFInput({
  name,
  label,
  helperText,
  isDisabled,
  isReadOnly,
  isRequired,
  format = defaultFormat,
  parse = defaultParse,
  //
  leftElement,
  rightElement,
  leftAddon,
  rightAddon,
  //
  isShowStepper = true,
  //
  size,
  variant,
  //
  inputGroupProps,
  ...rest
}) {
  if (leftElement && leftAddon)
    throw new Error("`leftElement` and `leftAddon` cannot be used together");

  if (rightElement && rightAddon)
    throw new Error("`rightElement` and `rightAddon` cannot be used together");

  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl
      isReadOnly={isReadOnly || isSubmitting}
      isInvalid={Boolean(error)}
      isDisabled={isDisabled}
      isRequired={isRequired}
    >
      {label && <FormLabel>{label}</FormLabel>}

      <InputGroup size={size} variant={variant} {...inputGroupProps}>
        {leftAddon}
        {leftElement}

        <NumberInput {...field} parse={parse} format={format} {...rest}>
          <NumberInputField />

          {isShowStepper && (
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          )}
        </NumberInput>

        {rightElement}
        {rightAddon}
      </InputGroup>

      {error ? (
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
