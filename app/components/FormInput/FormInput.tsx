import React, { ForwardedRef, forwardRef } from "react"
import { tw } from "react-native-tailwindcss"
import { Text, Input, InputProps } from "@ui-kitten/components"
import { View, StyleProp, ViewStyle } from "react-native"

import useFormControlState from "../FormControl/useFormControlState"

export interface FormInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string) => void
  containerStyle?: StyleProp<ViewStyle>
}

const FormInput = forwardRef(function FormInput(props: FormInputProps, ref: ForwardedRef<Input>) {
  const { onChange, textStyle, containerStyle, ...inputProps } = props

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly"],
  })

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{inputProps.value}</Text>
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      <Input
        ref={ref}
        {...fcs}
        {...inputProps}
        onChangeText={onChange}
        textStyle={[inputProps.multiline && [tw.pT0, tw.h10], textStyle]}
        textAlignVertical={inputProps.multiline ? "top" : "auto"}
      />
    </View>
  )
})

export default FormInput
