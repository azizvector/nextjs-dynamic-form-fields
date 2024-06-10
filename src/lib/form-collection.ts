import { object } from "dot-object";
import { intersection, isEmpty, reduce } from "lodash";
import { ZodString, ZodType, ZodTypeAny, z } from "zod";
import { validationTypes } from "./variable";
import { Validation, ManualErrors, RefineValidation, SetForms, SetManualErrors, FormScheme, Section, Field  } from "@/types/form-collection";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function clearCustomErrors(name: string, form: UseFormReturn, setManualErrors: SetManualErrors) {
  form.clearErrors(name);
  setManualErrors((prevItems: ManualErrors[]) => prevItems.filter(
    (item: ManualErrors) => item.name !== name)
  );
}

export function setCustomErrors(name: string, message: string, form: UseFormReturn, setManualErrors: SetManualErrors) {
  form.setError(name, { type: "manual", message });
  setManualErrors((prevItems: ManualErrors[]) => [...prevItems, {
    type: "manual",
    name,
    message,
  }])
}

export function getErrors(errors: FieldValues, name: string) {
  const parts: string[] = name.split('.');
  let error: FieldValues | string | null = errors;
  for (const part of parts) {
    if (error && typeof error === 'object' && error.hasOwnProperty(part)) {
      error = error[part];
    } else {
      return null;
    }
  }
  return error;
}

export function flattenForm(data: FormScheme) {
  const flattened: Field[] = [];
  function flatten(item: FormScheme) {
    if ('fields' in item && item.fields) {
      for (const subItem of item.fields) {
        flatten(subItem);
      }
    } else {
      flattened.push(item as Field);
    }
  }
  flatten(data);
  return flattened;
}

export function getInitialValues(flattenedForm: Field[]) {
  return reduce(
    flattenedForm,
    (result, item) => ({ ...result, [item.fieldId]: item.value || "" }),
    {}
  );
}

export function generateZodValidation(validation: Validation[]) {
  if (isEmpty(validation)) {
    return z.string().nullish();
  }
  let zod: ZodTypeAny = z.string()
  const types = intersection(["string", "number", "boolean", "date"], validation);
  types.forEach(type => { zod = validationTypes[type] });
  if (validation.includes("email") && zod instanceof ZodString) {
    zod = zod.email({ message: "Invalid email format" });
  }
  if (validation.includes("optional")) {
    zod = zod.nullish();
  }
  return zod;
}

export function getFieldValidation(flattenedForm: Field[]) {
  return reduce(
    flattenedForm,
    (result: { [key: string]: ZodTypeAny }, item: Field) => {
      const { fieldId, validation = [] } = item;
      result[fieldId] = generateZodValidation(validation);
      return result;
    },
    {}
  );
}

export function generateSchemaValidation(
  fieldValidation: Record<string, ZodTypeAny>,
  refineValidation: RefineValidation | undefined
) {
  let schema: Record<string, ZodTypeAny> = {};
  let validation: any = object(fieldValidation);
  const buildSchema = (validationObj: any) => {
    const newSchema: Record<string, ZodTypeAny> = {};
    for (const key in validationObj) {
      const value = validationObj[key];
      if (value instanceof ZodType) {
        newSchema[key] = value;
      } else {
        newSchema[key] = z.object(buildSchema(value));
      }
    }
    return newSchema;
  };
  for (const key in validation) {
    const value = validation[key];
    if (value instanceof ZodType) {
      schema[key] = value;
    } else {
      schema[key] = z.object(buildSchema(value));
    }
  }
  let zodSchema: ZodTypeAny = z.object(schema)
  if (refineValidation) {
    zodSchema = zodSchema.superRefine(refineValidation);
  }
  return zodSchema;
}

export function generateFormData(forms: FormScheme) {
  let flattenedForm = flattenForm(forms);
  let initialValues = getInitialValues(flattenedForm);
  let fieldValidation = getFieldValidation(flattenedForm);
  let schemaValidation = generateSchemaValidation(fieldValidation, (forms as Section).refineValidation);

  return {
    schemaValidation,
    initialValues
  };
}


