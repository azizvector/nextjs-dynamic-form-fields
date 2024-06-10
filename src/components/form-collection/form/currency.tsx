import { memo } from "react"
import { Field, ItemProps, Masked } from "@/types/form-collection";
import MaskedInput from "./masked";

interface MaskedProps extends ItemProps {
  item: Field & Masked;
}

const CurrencyInput: React.FC<MaskedProps> = ({ form, item, onChangeFields, setManualErrors }) => (
  <MaskedInput
    form={form}
    item={{
      ...item,
      mask: "Rp num",
      lazy: false,
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: '.'
        }
      }
    }}
    onChangeFields={onChangeFields}
    setManualErrors={setManualErrors}
  />
);

export default memo(CurrencyInput);