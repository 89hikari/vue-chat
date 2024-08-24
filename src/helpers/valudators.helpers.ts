import { z } from "zod";
import { passwordRegex } from "./regex.helpers";

export const usernameValidator = z
  .string()
  .min(4, { message: "Must have at least 4 characters" });

export const emailValidator = z
  .string()
  .min(1, { message: "Must have at least 1 character" })
  .email({
    message: "Must be a valid email",
  });

export const passwordValidator = z
  .string()
  .min(8, { message: "Must have at least 8 characters" })
  .regex(passwordRegex, {
    message:
      "Your password is not valid (Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character)",
  });

export const passwordConfirmationValidator = z.string();
