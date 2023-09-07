import React from "react"
import { FormControlValue } from "./FormControl"

export const defaultValue: FormControlValue = {
  status: "basic",
  variant: "outlined",
  disabled: false,
  readonly: false,
  required: false,
}

const FormControlContext = React.createContext<FormControlValue>(defaultValue)

export default FormControlContext
