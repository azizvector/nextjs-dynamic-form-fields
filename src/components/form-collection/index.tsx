import { useCallback, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { capitalize, isEmpty } from "lodash"
import { cn } from "@/lib/utils"
import { colSpan } from "@/lib/variable"
import { Components } from "./components"
import { FormCollectionProps, ManualErrors, FormScheme, Section, FormData } from "@/types/form-collection"
import { generateFormData } from "@/lib/form-collection"

export function FormCollection({
  data,
  onSubmit,
  onChangeFields,
  footer,
}: FormCollectionProps) {
  const formDataRef = useRef<FormData | null>(null);
  if (formDataRef.current === null) formDataRef.current = generateFormData(data);
  const { schemaValidation, initialValues } = formDataRef.current;

  const [manualErrors, setManualErrors] = useState<ManualErrors[]>([]);
  const form = useForm<z.infer<typeof schemaValidation>>({
    mode: 'onChange',
    resolver: zodResolver(schemaValidation),
    defaultValues: initialValues,
    shouldUnregister: true,
  })

  const renderItem = useCallback((data: FormScheme) => {
    const elements: JSX.Element[] = [];
    const isSection = (item: FormScheme): item is Section => item.type === 'section';

    if (isSection(data) && data.fields) {
      if (data.titleKey || data.descriptionKey) {
        elements.push(
          <div key={`${data.fieldId}-title`} className={cn(colSpan[12], data.hide && "hidden", "2127879219")}>
            {data.titleKey && <h3 className="text-lg font-medium">{data.titleKey}</h3>}
            {data.descriptionKey && <p className="text-sm text-muted-foreground">{data.descriptionKey}</p>}
          </div>
        );
      }

      data.fields.forEach((item: FormScheme) => {
        if (isSection(item) && item.fields) {
          elements.push(renderItem(item));
        } else {
          const Component = Components[capitalize(item.type)];
          if (!Component) return null;
          elements.push(
            <div key={item.fieldId} className={cn(colSpan[item.col || 12], item.hide && "hidden")}>
              <Component
                form={form}
                item={item}
                onChangeFields={onChangeFields}
                setManualErrors={setManualErrors}
              />
            </div>
          );
        }
      });
    }

    return (
      <div key={data.fieldId} className={colSpan[data.col || 12]}>
        <div className="grid grid-cols-12 gap-4 w-full testtttt">
          {elements}
        </div>
      </div>
    );
  }, [form, onChangeFields]);

  const handleSubmit = (formData: any) => {
    console.log("handleSubmit");
    if (!isEmpty(manualErrors)) {
      manualErrors.forEach(({ name, type, message }: ManualErrors) => {
        form.setError(name, { type, message })
      });
    } else {
      if (onSubmit) onSubmit(formData);
    }
  };

  const handleError = () => {
    console.log("handleError");
    if (!isEmpty(manualErrors)) {
      manualErrors.forEach(({ name, type, message }: ManualErrors) => {
        form.setError(name, { type, message })
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, handleError)} className="w-full">
        <div className="grid grid-cols-12 gap-4 w-full mb-10">
          {renderItem(data)}
        </div>
        {footer && footer}
      </form>
    </Form>
  );
}
