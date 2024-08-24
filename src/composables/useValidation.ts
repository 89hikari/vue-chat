import { type ZodRawShape, type ZodTypeAny, z } from "zod";
import { get, groupBy } from "lodash-es";
import { ref, watch } from "vue";
import type { FormValue, ICommonForm } from "@/models/validation/IForm";

const objectMap = (
  obj: ICommonForm,
  fn: (
    value: FormValue,
    key: keyof ICommonForm,
    index: number
  ) => ZodTypeAny | string
) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export default function (
  form: ICommonForm,
  options?: { mode: "eager" | "lazy" }
) {
  const opts = Object.assign({}, { mode: "lazy" }, options);

  const isValid = ref(true);

  let unwatch: null | (() => void) = null;

  const errors = ref<Record<string, z.ZodIssue[]> | null>(null);

  const clearErrors = () => (errors.value = null);

  const validationWatch = () => {
    if (unwatch !== null) return;

    unwatch = watch(
      () => objectMap(form, (val) => val.value),
      async () => {
        await validate();
      },
      { deep: true }
    );
  };

  const validate = async () => {
    clearErrors();
    const rawShape = z
      .object(objectMap(form, (val) => val.validation) as ZodRawShape)
      .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    const result = await rawShape.safeParseAsync(
      objectMap(form, (val) => val.value)
    );

    isValid.value = result.success;

    if (!result.success) {
      errors.value = groupBy(result.error.issues, "path");
      validationWatch();
    }

    return errors;
  };

  const getError = (path: string) =>
    get(errors.value, `${path.replace(/\./g, ",")}.0.message`);

  opts.mode === "eager" && validationWatch();

  return { validate, errors, isValid, clearErrors, getError };
}
