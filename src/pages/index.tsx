import { useCallback, useMemo, useState } from "react";
import { Inter } from "next/font/google";
import { debounce } from "lodash";
import { FormScheme } from "@/types/form-collection";
import { users } from "@/forms/users";
import axios from "axios";
import { FormCollection } from "@/components/form-collection";
import { Button } from "@/components/ui/button";
import { updateFormField } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<FormScheme>(users);

  const onSubmit = useCallback((values: any) => {
    console.log("values", values);
  }, []);

  const onChangeField = useCallback((data: any, value: any) => {
    console.log("onSaveDraft: ", value);
    console.log("data: ", data);
  }, []);

  const onShowForm = useCallback((data: any, value: any) => {
    if (value === "1") {
      updateFormField(data, "text2", { hide: false, blocks: "" }, setData);
    }
  }, []);

  const onChangeFetch = debounce((item: any, value: any, form: any) => debouncedValidateEmail(item, value, form), 500);
  const debouncedValidateEmail = useMemo(() => async (item: any, value: any, form: any) => {
    try {
      updateFormField(data, item.fieldId, { loading: true }, setData);
      const response = await axios.get(`https://6647bd082bb946cf2f9ec0cf.mockapi.io/api/v1/check-username/${value}`);
      if (response.data.id === value) {
        form.setCustomErrors(item.fieldId, "Username is already taken")
      } else {
        form.clearCustomErrors(item.fieldId)
      }
      updateFormField(data, item.fieldId, { loading: false }, setData);
    } catch (error) {
      updateFormField(data, item.fieldId, { loading: false }, setData);
      form.clearCustomErrors(item.fieldId)
    }
  }, [data]);

  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`} >
      <FormCollection
        data={data}
        onSubmit={onSubmit}
        onChangeFields={{ onChangeField, onChangeFetch, onShowForm }}
        footer={<Button type="submit">Submit</Button>}
      />
    </main>
  );
}
