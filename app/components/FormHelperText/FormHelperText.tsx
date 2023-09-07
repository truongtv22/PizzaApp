import React from "react"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import { Text, Icon } from "@ui-kitten/components"

import useStyled from "app/utils/useStyled"
import renderNode from "app/utils/renderNode"

export interface FormHelperTextProps {}

export default function FormHelperText(props: FormHelperTextProps) {
  const { icon, status, textStyle, containerStyle, iconContainerStyle, ...textProps } = props
  const { eva } = useStyled("Input", props)

  const {
    captionColor,
    captionFontSize,
    captionLineHeight,
    captionFontWeight,
    captionIconWidth,
    captionIconHeight,
    captionIconTintColor,
  } = eva.style

  const computedStyle = {
    text: {
      color: captionColor,
      fontSize: captionFontSize,
      fontWeight: captionFontWeight,
      lineHeight: captionLineHeight,
    },
    icon: {
      width: captionIconWidth,
      height: captionIconHeight,
      tintColor: captionIconTintColor,
    },
  }

  return (
    <View style={[tw.flexRow, tw.itemsCenter, tw.mT1, containerStyle]}>
      {!!icon && (
        <View style={[tw.pR1, iconContainerStyle]}>
          {renderNode(Icon, icon, { style: computedStyle.icon })}
        </View>
      )}
      <Text {...textProps} style={[computedStyle.text, textStyle]} />
    </View>
  )
}
