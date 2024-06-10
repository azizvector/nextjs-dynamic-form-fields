import { memo } from "react"
import { Field, ItemProps, Masked } from "@/types/form-collection";
import MaskedInput from "./masked";

interface MaskedProps extends ItemProps {
  item: Field & Masked;
}
const NumericInput: React.FC<MaskedProps> = ({ form, item, onChangeFields, setManualErrors }) => (
  <MaskedInput
    form={form}
    item={{
      ...item,
      mask: Number
    }}
    onChangeFields={onChangeFields}
    setManualErrors={setManualErrors}

  />
);

export default memo(NumericInput);