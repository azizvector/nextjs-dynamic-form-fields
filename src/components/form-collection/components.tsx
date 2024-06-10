import TextInput from "./form/text"
import TextareaInput from "./form/textarea"
import MaskedInput from "./form/masked"
import NumericInput from "./form/numeric"
import CurrencyInput from "./form/currency"
import PhoneInput from "./form/phone"
// import DatepickerInput from "./types/datepicker"
// import SelectInput from "./types/select"
// import CheckboxInput from "./types/checkbox"
// import RadioInput from "./types/radio"
// import SwitchInput from "./types/switch"

export const Components: Record<string, React.ComponentType<any>> = {
  Text: TextInput,
  Textarea: TextareaInput,
  Numeric: NumericInput,
  Masked: MaskedInput,
  Currency: CurrencyInput,
  Phone: PhoneInput,
  // Datepicker: DatepickerInput,
  // Select: SelectInput,
  // Checkbox: CheckboxInput,
  // Radio: RadioInput,
  // Switch: SwitchInput,
};