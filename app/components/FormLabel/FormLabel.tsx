import React from "react"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import { Text, Icon } from "@ui-kitten/components"

import useStyled from "app/utils/useStyled"
import renderNode from "app/utils/renderNode"
import useFormControlState from "../FormControl/useFormControlState"

export interface FormLabelProps {
  children?: any
  required?: boolean
}

export default function FormLabel(props: FormLabelProps) {
  const {
    children,
    required,
    leading,
    trailing,
    textStyle,
    asteriskStyle,
    containerStyle,
    leadingContainerStyle,
    trailingContainerStyle,
    ...textProps
  } = props
  const { eva } = useStyled("Input", props)

  const {
    iconWidth,
    iconHeight,
    labelColor,
    labelFontSize,
    labelFontFamily,
    labelFontWeight,
    labelLineHeight,
    labelMarginBottom,
  } = eva.style

  const computedStyle = {
    container: {
      marginBottom: labelMarginBottom,
    },
    text: {
      color: labelColor,
      fontSize: labelFontSize,
      fontFamily: labelFontFamily,
      fontWeight: labelFontWeight,
      lineHeight: labelLineHeight,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: labelColor,
    },
    asterisk: {
      color: eva.theme["color-danger-500"],
    },
  }

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly", "required"],
  })

  const showAsterisk = !fcs.readonly && fcs.required

  return (
    <View style={[tw.flexRow, computedStyle.container, containerStyle]}>
      {!!leading && (
        <View style={[tw.pR1, leadingContainerStyle]}>
          {renderNode(Icon, leading, computedStyle.icon)}
        </View>
      )}
      <Text {...textProps} style={[computedStyle.text, tw.textBlack, textStyle]}>
        {children}
        {showAsterisk && <Text style={[computedStyle.asterisk, asteriskStyle]}>&thinsp;*</Text>}
      </Text>
      {!!trailing && (
        <View style={[tw.pL1, trailingContainerStyle]}>
          {renderNode(Icon, trailing, computedStyle.icon)}
        </View>
      )}
    </View>
  )
}
