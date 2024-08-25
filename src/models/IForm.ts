import type { ZodTypeAny } from "zod";

export type FormValue = {
  value: string;
  placeholder: string;
  label: string;
  validation?: ZodTypeAny;
  type?: string;
};

export interface ICommonForm {
  [key: string]: FormValue;
}
