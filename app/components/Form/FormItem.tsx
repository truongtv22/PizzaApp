import React, { useCallback } from "react"
import { StyleProp, ViewStyle } from "react-native"
import { TextProps } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"
import { useField, useFormikContext, FieldValidator } from "formik"

import renderNode from "app/utils/renderNode"
import FormControl, { FormControlValue } from "../FormControl/FormControl"
import FormLabel, { FormLabelProps } from "../FormLabel/FormLabel"
import FormHelperText, { FormHelperTextProps } from "../FormHelperText/FormHelperText"

export interface FormItemChildProps {
  value: string
  onBlur: (event) => void
  onChange: (event) => void
}

export interface FormItemProps extends FormControlValue {
  children: RenderProp<FormItemChildProps> | JSX.Element
  name: string
  label?: RenderProp<TextProps> | React.ReactText
  helperText?: RenderProp<TextProps> | React.ReactText
  validate?: FieldValidator
  onBlur?: (event) => void
  onChange?: (event) => void
  parseValue?: (value) => any
  formatValue?: (value) => any
  labelProps?: FormLabelProps
  helperTextProps?: FormHelperTextProps
  containerStyle?: StyleProp<ViewStyle>
}

const _formatValue = (value) => value

export default function FormItem({
  children,
  name,
  label,
  helperText,
  variant,
  disabled,
  readonly,
  required,
  validate,
  parseValue = _formatValue,
  formatValue = _formatValue,
  labelProps,
  helperTextProps,
  containerStyle,
  ...props
}: FormItemProps) {
  const [field, meta, helpers] = useField({ name, validate })
  const { submitCount } = useFormikContext()

  const value = formatValue(field.value)
  const { error, touched } = meta

  const isTouched = !!touched || submitCount > 0

  const showError = isTouched && !!error
  const fieldStatus = isTouched ? (showError ? "danger" : "primary") : "basic"

  const onBlur = useCallback((event) => {
    helpers.setTouched(true)
    if (props.onBlur) props.onBlur(event)
  }, [])

  const onChange = useCallback((nextValue) => {
    helpers.setValue(parseValue(nextValue))
    if (props.onChange) props.onChange(parseValue(nextValue))
  }, [])

  return (
    <FormControl
      status={fieldStatus}
      variant={variant}
      disabled={disabled}
      readonly={readonly}
      required={required}
      containerStyle={containerStyle}
    >
      {renderNode(FormLabel, label, labelProps)}
      {renderNode(null, children, { value, onBlur, onChange })}
      {(helperText || showError) &&
        renderNode(FormHelperText, showError ? error : helperText, {
          ...helperTextProps,
          status: fieldStatus,
        })}
    </FormControl>
  )
}
