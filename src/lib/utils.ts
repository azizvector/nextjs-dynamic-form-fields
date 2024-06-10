import { FormScheme, Field, SetForms } from "@/types/form-collection";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateFormField(forms: FormScheme, fieldId: string, params: Partial<Field>, setForms: SetForms) {
  const updateField = (forms: any) => {
    if (forms.fieldId === fieldId) {
      return { ...forms, ...params };
    }
    if (forms.fields) {
      return {
        ...forms,
        fields: forms.fields.map((field: any) => updateField(field))
      };
    }
    return forms;
  }
  const updateForms = updateField(forms);
  setForms(updateForms);
}