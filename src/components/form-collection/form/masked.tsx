import { memo } from "react"
import { isEmpty } from "lodash"
import { cn } from "@/lib/utils";
import { setCustomErrors, clearCustomErrors, getErrors } from "@/lib/form-collection";
import { Field, Masked, ItemProps } from "@/types/form-collection";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { IMaskInput } from "react-imask";
import { Loader2 } from "lucide-react";

interface MaskedProps extends ItemProps {
  item: Field & Masked;
}

const MaskedInput: React.FC<MaskedProps> = ({ form, item, onChangeFields, setManualErrors }) => (
  <FormField
    control={form.control}
    name={item.fieldId}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{item.labelKey}</FormLabel>
        <FormControl>
          <div className="relative text-sm">
            <IMaskInput
              {...field}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                !isEmpty(getErrors(form.formState.errors, item.fieldId)) && "border-red-500 focus-visible:border-red-500",
                (item.disabled || item.loading) && "disabled:pointer-events-none disabled:opacity-100 disabled:bg-gray-100",
              )}
              disabled={item.disabled || item.loading}
              inputRef={field.ref}
              mask={item.mask}
              blocks={item.blocks}
              definitions={item.definitions}
              placeholderChar={item.placeholderChar || '_'}
              lazy={item.lazy === undefined ? true : item.lazy}
              onAccept={(value, mask) => {
                if (item.onChangeFunction && onChangeFields && onChangeFields[item.onChangeFunction]) {
                  let onChangeCallback = onChangeFields[item.onChangeFunction]
                  if (onChangeCallback) {
                    onChangeCallback(
                      item,
                      mask._unmaskedValue,
                      {
                        ...form,
                        setCustomErrors: (name: string, message: string) => setCustomErrors(name, message, form, setManualErrors),
                        clearCustomErrors: (name: string) => clearCustomErrors(name, form, setManualErrors)
                      },
                    );
                  }
                }
                field.onChange(mask._unmaskedValue);
              }}
            />
            {item.loading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            )}
          </div>
        </FormControl>
        {item.infoKey && <FormDescription> {item.infoKey} </FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default memo(MaskedInput);