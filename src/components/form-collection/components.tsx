import TextInput from "./form/text"
import TextareaInput from "./form/textarea"
import MaskedInput from "./form/masked"
import NumericInput from "./form/numeric"
import CurrencyInput from "./form/currency"
import PhoneInput from "./form/phone"
import DropdownInput from "./form/dropdown"
import DatepickerInput from "./form/datepicker"
// import CheckboxInput from "./types/checkbox"
// import RadioInput from "./types/radio"
// import SwitchInput from "./types/switch"

export const Components: Record<string, React.ComponentType<any>> = {
  Text: TextInput,
  Textarea: TextareaInput,
  Masked: MaskedInput,
  Numeric: NumericInput,
  Currency: CurrencyInput,
  Phone: PhoneInput,
  Dropdown: DropdownInput,
  Datepicker: DatepickerInput,
  // Checkbox: CheckboxInput,
  // Radio: RadioInput,
  // Switch: SwitchInput,
};