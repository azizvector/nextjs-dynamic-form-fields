import { memo } from "react"
import { Field, ItemProps, Masked } from "@/types/form-collection";
import MaskedInput from "./masked";

interface MaskedProps extends ItemProps {
  item: Field & Masked;
}

const PhoneInput: React.FC<MaskedProps> = ({ form, item, onChangeFields, setManualErrors }) => (
  <MaskedInput
    form={form}
    item={{
      ...item,
      mask: "+{62} #00 0000 num",
      lazy: false,
      blocks: {
        num: {
          mask: Number,
        }
      },
      definitions: {
        '#': /[1-9]/
      },
      placeholderChar: ' ' 
    }}
    onChangeFields={onChangeFields}
    setManualErrors={setManualErrors}
  />
);

export default memo(PhoneInput);