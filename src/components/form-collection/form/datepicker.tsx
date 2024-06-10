import { memo, useState } from "react"
import { isEmpty } from "lodash"
import { cn } from "@/lib/utils";
import { setCustomErrors, clearCustomErrors, getErrors } from "@/lib/form-collection";
import { Field, ItemProps, Datepicker } from "@/types/form-collection";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import { Calendar } from "@/components/ui/calendar"
import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarIcon, Check, ChevronLeft, ChevronRight, ChevronsUpDown, Loader2 } from "lucide-react"
import { addYears, format } from "date-fns"
import { id } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react";
import { DropdownProps } from "react-day-picker";

interface DatepickerProps extends ItemProps {
  item: Field & Datepicker;
}

const DatepickerInput: React.FC<DatepickerProps> = ({ form, item, onChangeFields, setManualErrors }) => {
  const [open, setOpen] = useState(false);

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
                    (item.disabled || item.loading) && "disabled:pointer-events-none disabled:opacity-100 disabled:bg-gray-100 disabled:text-muted-foreground",
                  )}
                  disabled={item.disabled || item.loading}
                  variant="outline"
                  aria-expanded={open}
                >
                  {field.value
                    ? format(field.value, "PPP", { locale: id, })
                    : "Pick a date"
                  }
                  {item.loading
                    ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
                    : <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  }
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                classNames={{
                  caption_dropdowns: "flex justify-center gap-1.5",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
                  day_outside: "text-muted-foreground opacity-50",
                  vhidden: "vhidden hidden",
                }}
                initialFocus
                mode="single"
                captionLayout="dropdown-buttons"
                locale={id}
                fromYear={item.fromYear || 1900}
                toYear={item.toYear || addYears(new Date(), 5).getFullYear()}
                selected={field.value}
                onSelect={(value: Date | undefined) => {
                  if (item.onChangeFunction && onChangeFields && onChangeFields[item.onChangeFunction]) {
                    let onChangeCallback = onChangeFields[item.onChangeFunction]
                    if (onChangeCallback) {
                      onChangeCallback(
                        item,
                        value,
                        {
                          ...form,
                          setCustomErrors: (name: string, message: string) => setCustomErrors(name, message, form, setManualErrors),
                          clearCustomErrors: (name: string) => clearCustomErrors(name, form, setManualErrors)
                        },
                      );
                    }
                  }
                  field.onChange(value);
                  setOpen(false)
                }}
                components={{
                  Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
                    const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[]
                    const selected = options.find((child) => child.props.value === value);
                    const [open, setOpen] = useState(false);
                    const handleChange = (value: string) => {
                      const changeEvent = {
                        target: { value },
                      } as React.ChangeEvent<HTMLSelectElement>
                      onChange?.(changeEvent)
                    }
                    return (
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            className="justify-between px-2"
                            variant="outline"
                            role="combobox"
                            size="sm"
                            aria-expanded={open}
                          >
                            {selected?.props?.children}
                            <ChevronsUpDown className="ml-1.5 h-3 w-3 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search..." />
                            <CommandList>
                              <CommandEmpty>No found.</CommandEmpty>
                              <CommandGroup>
                                {options?.map((option) => (
                                  <CommandItem
                                    key={`${option.props.value}-${id}`}
                                    value={option.props.value?.toString() ?? ""}
                                    onSelect={() => {
                                      handleChange(option.props.value?.toString() ?? "")
                                      setOpen(false)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === option.props.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {option.props?.children}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )
                  },
                  IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                  IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                }}
              />
            </PopoverContent>
          </Popover>
          {item.infoKey && <FormDescription> {item.infoKey} </FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
};

export default memo(DatepickerInput);