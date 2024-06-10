import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { RefinementCtx, ZodTypeAny } from "zod";

export type Validation = "string" | "number" | "boolean" | "date" | "email" | "optional";
export type RefineValidation = (arg: Record<string, any>, ctx: RefinementCtx) => any;
export type SetForms = Dispatch<SetStateAction<FormScheme>>;
export type SetManualErrors = Dispatch<SetStateAction<ManualErrors[]>>;
export type ChangeFields = Record<string, (data: any, value?: any, form?: any) => void>;
export type Options = { [key: string]: any };

export type FormScheme = (Section | Field);

export type Section = {
  fieldId: string;
  type: 'section';
  titleKey?: string;
  descriptionKey?: string;
  col?: number;
  hide?: boolean;
  refineValidation?: RefineValidation
  fields?: FormScheme[];
}

export type Field = {
  labelKey?: string;
  infoKey?: string;
  value?: any;
  col?: number;
  hide?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChangeFunction?: string;
  validation?: Validation[];
} & (Text | Textarea | Masked | Numeric | Currency | Phone | Dropdown | Datepicker | Checkbox | Radio | Switch);

export type Text = {
  fieldId: string;
  type: 'text';
};

export type Textarea = {
  fieldId: string;
  type: 'textarea';
};

export type Masked = {
  fieldId: string;
  type: 'masked';
  mask?: any;
  blocks?: any;
  lazy?: boolean;
  definitions?: any;
  placeholderChar?: string;
};

export type Numeric = {
  fieldId: string;
  type: 'numeric';
};

export type Currency = {
  fieldId: string;
  type: 'currency';
};

export type Phone = {
  fieldId: string;
  type: 'phone';
};

export type Dropdown = {
  fieldId: string;
  type: 'dropdown';
  optionLabel?: string;
  optionValue?: string;
  optionsUrl?: string;
  options?: Options[];
};

export type Datepicker = {
  fieldId: string;
  type: 'datepicker';
  fromYear?: number;
  toYear?: number;
};

export type Checkbox = {
  fieldId: string;
  type: 'checkbox';
  checkboxAs?: 'tab' | 'row';
  optionMd?: number;
  bordered?: boolean;
  single?: boolean;
  checkboxTitle?: string;
  checkboxDesc?: string;
  options?: Options[];
};

export type Radio = {
  fieldId: string;
  type: 'radio';
  radioAs?: 'tab' | 'row';
  optionMd?: number;
  options?: Options[];
};

export type Switch = {
  fieldId: string;
  type: 'switch';
  bordered?: boolean;
  switchTitle?: string;
  switchDesc?: string;
};

export interface ManualErrors {
  type: "manual";
  name: string;
  message: string;
};

export interface FormData {
  schemaValidation: ZodTypeAny;
  initialValues: Record<string, any>;
}

export interface FormCollectionProps {
  data: FormScheme;
  onSubmit?: (data: any) => void;
  onChangeFields?: ChangeFields;
  footer?: React.ReactNode;
}

export interface ItemProps {
  form: UseFormReturn;
  setManualErrors: SetManualErrors;
  onChangeFields?: ChangeFields;
}
