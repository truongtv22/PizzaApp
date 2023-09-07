import React from "react"
import { StyleProp, ViewStyle } from "react-native"

import Column from "../Stack/Column"
import FormControlContext, { defaultValue } from "./FormControlContext"

export type FormControlValue = {
  status?: "basic" | "primary" | "danger"
  variant?: "standard" | "outlined" | "filled"
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}

export interface FormControlProps extends FormControlValue {
  children?: JSX.Element[] | JSX.Element
  containerStyle: StyleProp<ViewStyle>
}

export default function FormControl(props: FormControlProps) {
  const {
    status = defaultValue.status,
    variant = defaultValue.variant,
    disabled = defaultValue.disabled,
    readonly = defaultValue.readonly,
    required = defaultValue.required,
    containerStyle,
    ...restProps
  } = props

  const contextValue = {
    status,
    variant,
    disabled,
    readonly,
    required,
  }

  return (
    <FormControlContext.Provider value={contextValue}>
      <Column space={1} {...restProps} style={containerStyle} />
    </FormControlContext.Provider>
  )
}
