import React from "react"
import { tw } from "react-native-tailwindcss"
import { View, ViewStyle, StyleProp } from "react-native"

import Avatar from "../Avatar/Avatar"

export interface ImageItemProps {
  image: any
  showEditButton?: boolean
  onPress?: (image: any) => void
  onRemovePress?: (image: any) => void
  imageStyle?: StyleProp<any>
  containerStyle?: ViewStyle
}

export default function ImageItem(props: ImageItemProps) {
  const { image, onPress, onRemovePress, imageStyle, showEditButton, containerStyle } = props

  const _onPress = () => {
    if (onPress) {
      onPress(image)
    }
  }

  const _onRemovePress = () => {
    if (onRemovePress) {
      onRemovePress(image)
    }
  }
  return (
    <View style={[showEditButton && [tw.pT2, tw.pR2], containerStyle]}>
      <Avatar
        level="3"
        style={[tw.w20, tw.h20, tw.rounded, imageStyle]}
        source={{ uri: image.uri }}
        onPress={_onPress}
      />
      {showEditButton && (
        <Avatar
          icon={{ name: "close" }}
          style={[tw.absolute, tw.w4, tw.h4, tw.right0]}
          status="danger"
          onPress={_onRemovePress}
        />
      )}
    </View>
  )
}
