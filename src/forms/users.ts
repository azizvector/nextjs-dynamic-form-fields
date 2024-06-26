import { FormScheme } from "@/types/form-collection";
import { z } from "zod";

export const users: FormScheme = {
  fieldId: 'forms',
  col: 12,
  type: 'section',
  refineValidation: (arg, ctx) => {
    // if (arg.user.text4 === '1' && arg.form.user.text7.length < 1) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "object should exist",
    //     path: ['form.user.text7']
    //   });
    // }
  },
  fields: [
    {
      fieldId: 'text',
      type: 'section',
      titleKey: 'Text Input',
      col: 12,
      fields: [
        {
          fieldId: 'text1',
          type: 'text',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'text2',
          type: 'text',
          labelKey: 'With Value',
          value: "Abdul Aziz",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'text3',
          type: 'text',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'text4',
          type: 'text',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          validation: ["email"],
        },
        {
          fieldId: 'text5',
          type: 'text',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          validation: ["string"],
        },
        {
          fieldId: 'text6',
          type: 'text',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          loading: true,
        },
        {
          fieldId: 'text7',
          type: 'text',
          labelKey: 'Disabled',
          value: "Abdul Aziz",
          onChangeFunction: 'onChangeField',
          col: 4,
          disabled: true,
        },
      ]
    },
    // {
    //   fieldId: 'textarea',
    //   type: 'section',
    //   titleKey: 'Textarea Input',
    //   col: 12,
    //   fields: [
    //     {
    //       fieldId: 'textarea1',
    //       type: 'textarea',
    //       labelKey: 'Default',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'textarea2',
    //       type: 'textarea',
    //       labelKey: 'With Value',
    //       value: "Abdul Aziz",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'textarea3',
    //       type: 'textarea',
    //       labelKey: 'With Info',
    //       infoKey: "Username harus unik",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'textarea4',
    //       type: 'textarea',
    //       labelKey: 'Validation',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       validation: ["email"],
    //     },
    //     {
    //       fieldId: 'textarea5',
    //       type: 'textarea',
    //       labelKey: 'Validation With Fetch',
    //       onChangeFunction: 'onChangeFetch',
    //       col: 4,
    //       validation: ["string"],
    //     },
    //     {
    //       fieldId: 'textarea6',
    //       type: 'textarea',
    //       labelKey: 'Loading',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       loading: true,
    //     },
    //     {
    //       fieldId: 'textarea7',
    //       type: 'textarea',
    //       labelKey: 'Disabled',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       disabled: true,
    //     },
    //   ]
    // },
    // {
    //   fieldId: 'masked',
    //   type: 'section',
    //   titleKey: 'Masked Input',
    //   col: 12,
    //   fields: [
    //     {
    //       fieldId: 'masked1',
    //       type: 'masked',
    //       labelKey: 'Default',
    //       onChangeFunction: 'onChangeField',
    //       mask: "(000)000-00-00",
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'masked2',
    //       type: 'masked',
    //       labelKey: 'With Value',
    //       value: "Abdul Aziz",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'masked3',
    //       type: 'masked',
    //       labelKey: 'With Info',
    //       infoKey: "Username harus unik",
    //       mask: "(000)000-00-00",
    //       lazy: false,
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'masked4',
    //       type: 'masked',
    //       labelKey: 'Validation',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       validation: ["number"],
    //     },
    //     {
    //       fieldId: 'masked5',
    //       type: 'masked',
    //       labelKey: 'Validation With Fetch',
    //       onChangeFunction: 'onChangeFetch',
    //       col: 4,
    //       validation: ["string"],
    //     },
    //     {
    //       fieldId: 'masked6',
    //       type: 'masked',
    //       labelKey: 'Loading',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       loading: true,
    //     },
    //     {
    //       fieldId: 'masked7',
    //       type: 'masked',
    //       labelKey: 'Disabled',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       disabled: true,
    //     },
    //   ]
    // },
    // {
    //   fieldId: 'currency',
    //   type: 'section',
    //   titleKey: 'Currency Input',
    //   col: 12,
    //   fields: [
    //     {
    //       fieldId: 'currency1',
    //       type: 'currency',
    //       labelKey: 'Default',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'currency2',
    //       type: 'currency',
    //       labelKey: 'With Value',
    //       value: "Abdul Aziz",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'currency3',
    //       type: 'currency',
    //       labelKey: 'With Info',
    //       infoKey: "Username harus unik",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'currency4',
    //       type: 'currency',
    //       labelKey: 'Validation',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       validation: ["number"],
    //     },
    //     {
    //       fieldId: 'currency5',
    //       type: 'currency',
    //       labelKey: 'Validation With Fetch',
    //       onChangeFunction: 'onChangeFetch',
    //       col: 4,
    //       validation: ["string"],
    //     },
    //     {
    //       fieldId: 'currency6',
    //       type: 'currency',
    //       labelKey: 'Loading',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       loading: true,
    //     },
    //     {
    //       fieldId: 'currency7',
    //       type: 'currency',
    //       labelKey: 'Disabled',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       disabled: true,
    //     },
    //   ]
    // },
    // {
    //   fieldId: 'phone',
    //   type: 'section',
    //   titleKey: 'Phone Input',
    //   col: 12,
    //   fields: [
    //     {
    //       fieldId: 'phone1',
    //       type: 'phone',
    //       labelKey: 'Default',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'phone2',
    //       type: 'phone',
    //       labelKey: 'With Value',
    //       value: "Abdul Aziz",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'phone3',
    //       type: 'phone',
    //       labelKey: 'With Info',
    //       infoKey: "Username harus unik",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'phone4',
    //       type: 'phone',
    //       labelKey: 'Validation',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       validation: ["number"],
    //     },
    //     {
    //       fieldId: 'phone5',
    //       type: 'phone',
    //       labelKey: 'Validation With Fetch',
    //       onChangeFunction: 'onChangeFetch',
    //       col: 4,
    //       validation: ["string"],
    //     },
    //     {
    //       fieldId: 'phone6',
    //       type: 'phone',
    //       labelKey: 'Loading',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       loading: true,
    //     },
    //     {
    //       fieldId: 'phone7',
    //       type: 'phone',
    //       labelKey: 'Disabled',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       disabled: true,
    //     },
    //   ]
    // },
    // {
    //   fieldId: 'numeric',
    //   type: 'section',
    //   titleKey: 'Numeric Input',
    //   col: 12,
    //   fields: [
    //     {
    //       fieldId: 'numeric1',
    //       type: 'numeric',
    //       labelKey: 'Default',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'numeric2',
    //       type: 'numeric',
    //       labelKey: 'With Value',
    //       value: "Abdul Aziz",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'numeric3',
    //       type: 'numeric',
    //       labelKey: 'With Info',
    //       infoKey: "Username harus unik",
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //     },
    //     {
    //       fieldId: 'numeric4',
    //       type: 'numeric',
    //       labelKey: 'Validation',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       validation: ["number"],
    //     },
    //     {
    //       fieldId: 'numeric5',
    //       type: 'numeric',
    //       labelKey: 'Validation With Fetch',
    //       onChangeFunction: 'onChangeFetch',
    //       col: 4,
    //       validation: ["string"],
    //     },
    //     {
    //       fieldId: 'numeric6',
    //       type: 'numeric',
    //       labelKey: 'Loading',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       loading: true,
    //     },
    //     {
    //       fieldId: 'numeric7',
    //       type: 'numeric',
    //       labelKey: 'Disabled',
    //       onChangeFunction: 'onChangeField',
    //       col: 4,
    //       disabled: true,
    //     },
    //   ]
    // },
    {
      fieldId: 'dropdown',
      type: 'section',
      titleKey: 'Dropdown Input',
      col: 12,
      fields: [
        {
          fieldId: 'dropdown1',
          type: 'dropdown',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
          optionsUrl: 'https://6647bd082bb946cf2f9ec0cf.mockapi.io/api/v1/check-username',
          optionLabel: 'username',
          optionValue: 'id',
        },
        {
          fieldId: 'dropdown2',
          type: 'dropdown',
          labelKey: 'With Value',
          value: "en",
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
        },
        {
          fieldId: 'dropdown3',
          type: 'dropdown',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
        },
        {
          fieldId: 'dropdown4',
          type: 'dropdown',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          validation: ["string"],
        },
        {
          fieldId: 'dropdown5',
          type: 'dropdown',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          validation: ["string"],
        },
        {
          fieldId: 'dropdown6',
          type: 'dropdown',
          labelKey: 'Options With Fetch',
          onChangeFunction: 'onChangeField',
          col: 4,
          optionsUrl: 'https://6647bd082bb946cf2f9ec0cf.mockapi.io/api/v1/check-username',
          optionLabel: 'username',
          optionValue: 'id',
        },
        {
          fieldId: 'dropdown7',
          type: 'dropdown',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          loading: true,
        },
        {
          fieldId: 'dropdown8',
          type: 'dropdown',
          labelKey: 'Disabled',
          value: "en",
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          disabled: true,
        },
      ]
    },
    {
      fieldId: 'datepicker',
      titleKey: 'datepicker',
      col: 12,
      type: 'section',
      fields: [
        {
          fieldId: 'datepicker1',
          type: 'datepicker',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'datepicker2',
          type: 'datepicker',
          labelKey: 'With Value',
          value: "2024-06-16",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'datepicker3',
          type: 'datepicker',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'datepicker4',
          type: 'datepicker',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          validation: ["date"],
        },
        {
          fieldId: 'datepicker5',
          type: 'datepicker',
          labelKey: 'Year With from & to',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          fromYear: 2000,
          toYear: 2030,
        },
        {
          fieldId: 'datepicker6',
          type: 'datepicker',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
        },
        {
          fieldId: 'datepicker7',
          type: 'datepicker',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          loading: true,
        },
        {
          fieldId: 'datepicker8',
          type: 'datepicker',
          labelKey: 'Disabled',
          value: "2024-06-16",
          onChangeFunction: 'onChangeField',
          col: 4,
          disabled: true,
        },
      ]
    },
    {
      fieldId: 'checkbox',
      titleKey: 'checkbox',
      col: 12,
      type: 'section',
      fields: [
        {
          fieldId: 'checkbox1',
          type: 'checkbox',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
        },
        {
          fieldId: 'checkbox2',
          type: 'checkbox',
          labelKey: 'With Value',
          // value: "Abdul Aziz",
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
        },
        {
          fieldId: 'checkbox3',
          type: 'checkbox',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
        },
        {
          fieldId: 'checkbox4',
          type: 'checkbox',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          // value: 0,
          validation: ["number"],
        },
        {
          fieldId: 'checkbox5',
          type: 'checkbox',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          validation: ["string"],
        },
        {
          fieldId: 'checkbox6',
          type: 'checkbox',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          loading: true,
        },
        {
          fieldId: 'checkbox7',
          type: 'checkbox',
          labelKey: 'Disabled',
          onChangeFunction: 'onChangeField',
          col: 4,
          options: [
            { label: "English", value: "en" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
            { label: "Spanish", value: "es" },
            { label: "Portuguese", value: "pt" },
            { label: "Russian", value: "ru" },
            { label: "Japanese", value: "ja" },
            { label: "Korean", value: "ko" },
            { label: "Chinese", value: "zh" },
          ] as const,
          disabled: true,
        },
      ]
    },
    {
      fieldId: 'radio',
      titleKey: 'radio',
      col: 12,
      type: 'section',
      fields: [
        {
          fieldId: 'radio1',
          type: 'radio',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'radio2',
          type: 'radio',
          labelKey: 'With Value',
          // value: "Abdul Aziz",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'radio3',
          type: 'radio',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'radio4',
          type: 'radio',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          // value: 0,
          validation: ["number"],
        },
        {
          fieldId: 'radio5',
          type: 'radio',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          validation: ["string"],
        },
        {
          fieldId: 'radio6',
          type: 'radio',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          loading: true,
        },
        {
          fieldId: 'radio7',
          type: 'radio',
          labelKey: 'Disabled',
          onChangeFunction: 'onChangeField',
          col: 4,
          disabled: true,
        },
      ]
    },
    {
      fieldId: 'switch',
      titleKey: 'switch',
      col: 12,
      type: 'section',
      fields: [
        {
          fieldId: 'switch1',
          type: 'switch',
          labelKey: 'Default',
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'switch2',
          type: 'switch',
          labelKey: 'With Value',
          // value: "Abdul Aziz",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'switch3',
          type: 'switch',
          labelKey: 'With Info',
          infoKey: "Username harus unik",
          onChangeFunction: 'onChangeField',
          col: 4,
        },
        {
          fieldId: 'switch4',
          type: 'switch',
          labelKey: 'Validation',
          onChangeFunction: 'onChangeField',
          col: 4,
          // value: 0,
          validation: ["number"],
        },
        {
          fieldId: 'switch5',
          type: 'switch',
          labelKey: 'Validation With Fetch',
          onChangeFunction: 'onChangeFetch',
          col: 4,
          validation: ["string"],
        },
        {
          fieldId: 'switch6',
          type: 'switch',
          labelKey: 'Loading',
          onChangeFunction: 'onChangeField',
          col: 4,
          loading: true,
        },
        {
          fieldId: 'switch7',
          type: 'switch',
          labelKey: 'Disabled',
          onChangeFunction: 'onChangeField',
          col: 4,
          disabled: true,
        },
      ]
    },
  ]
}