import { memo, useEffect, useState } from "react"
import { isEmpty } from "lodash"
import { cn } from "@/lib/utils";
import { setCustomErrors, clearCustomErrors, getErrors } from "@/lib/form-collection";
import { Field, ItemProps, Dropdown } from "@/types/form-collection";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import axios from "axios";

interface DropdownProps extends ItemProps {
  item: Field & Dropdown;
}

const DropdownInput: React.FC<DropdownProps> = ({ form, item, onChangeFields, setManualErrors }) => {
  const [options, setOptions] = useState(item.options || []);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!item.optionsUrl) return
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(item.optionsUrl || '');
        setOptions(response.data);
        setLoading(false);
      } catch (error) {
        setOptions([]);
        setLoading(false);
      }
    };
    fetchOptions();
  }, [item.optionsUrl]);

  return (
    <FormField
      control={form.control}
      name={item.fieldId}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{item.labelKey}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full justify-between px-3 font-normal",
                    !field.value && "text-muted-foreground",
                    !isEmpty(getErrors(form.formState.errors, item.fieldId)) && "border-red-500",
                    (item.disabled || item.loading || loading) && "disabled:pointer-events-none disabled:opacity-100 disabled:bg-gray-100 disabled:text-muted-foreground",
                  )}
                  disabled={item.disabled || item.loading || loading}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                >
                  {field.value
                    ? options?.find((option) => option[item.optionValue || 'value'] === field.value)?.[item.optionLabel || 'label']
                    : `Select ${item.labelKey}`
                  }
                  {item.loading || loading
                    ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
                    : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  }
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No found.</CommandEmpty>
                  <CommandGroup>
                    {options?.map((option) => (
                      <CommandItem
                        key={option[item.optionValue || 'value']}
                        value={option[item.optionValue || 'value']}
                        onSelect={(currentValue) => {
                          if (item.onChangeFunction && onChangeFields && onChangeFields[item.onChangeFunction]) {
                            let onChangeCallback = onChangeFields[item.onChangeFunction]
                            if (onChangeCallback) {
                              onChangeCallback(
                                item,
                                option[item.optionValue || 'value'],
                                {
                                  ...form,
                                  setCustomErrors: (name: string, message: string) => setCustomErrors(name, message, form, setManualErrors),
                                  clearCustomErrors: (name: string) => clearCustomErrors(name, form, setManualErrors)
                                },
                              );
                            }
                          }
                          field.onChange(currentValue === field.value ? "" : option[item.optionValue || 'value']);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option[item.optionValue || 'value'] === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option[item.optionLabel || 'label']}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {item.infoKey && <FormDescription> {item.infoKey} </FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
};

export default memo(DropdownInput);