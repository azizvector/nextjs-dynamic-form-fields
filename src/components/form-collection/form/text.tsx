import { memo } from "react"
import { isEmpty } from "lodash"
import { cn } from "@/lib/utils";
import { setCustomErrors, clearCustomErrors, getErrors } from "@/lib/form-collection";
import { ItemProps, Field, Text } from "@/types/form-collection";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface TextProps extends ItemProps {
  item: Field & Text;
}

const TextInput: React.FC<TextProps> = ({ form, item, onChangeFields, setManualErrors }) => (
  <FormField
    control={form.control}
    name={item.fieldId}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{item.labelKey}</FormLabel>
        <FormControl>
          <div className="relative text-sm">
            <Input
              {...field}
              className={cn(
                "focus-visible:outline-none focus-visible:border-zinc-900 focus-visible:ring-0",
                !isEmpty(getErrors(form.formState.errors, item.fieldId)) && "border-red-500 focus-visible:border-red-500",
                (item.disabled || item.loading) && "disabled:pointer-events-none disabled:opacity-100 disabled:bg-gray-100",
              )}
              disabled={item.disabled || item.loading}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (item.onChangeFunction && onChangeFields && onChangeFields[item.onChangeFunction]) {
                  let onChangeCallback = onChangeFields[item.onChangeFunction]
                  if (onChangeCallback) {
                    onChangeCallback(
                      item,
                      event.target.value,
                      {
                        ...form,
                        setCustomErrors: (name: string, message: string) => setCustomErrors(name, message, form, setManualErrors),
                        clearCustomErrors: (name: string) => clearCustomErrors(name, form, setManualErrors)
                      },
                    );
                  }
                }
                field.onChange(event);
              }}
            />
            {item.loading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Loader2 className="h-5 w-5 animate-spin opacity-50" />
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

export default memo(TextInput);