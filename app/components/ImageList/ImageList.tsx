import React, { useRef } from "react"
import { tw } from "react-native-tailwindcss"
import { View, FlatList, ViewStyle, StyleProp } from "react-native"

import Lightbox, { LightBoxRef } from "../Lightbox/Lightbox"

import ImageItem from "./ImageItem"

export interface ImageListProps {
  images: any[]
  keyExtractor?: (image: any, index: number) => string
  showEditButton?: boolean
  onImagePress?: (image: any, index: number) => void
  onRemovePress?: (image: any, index: number) => void
  itemImageStyle?: StyleProp<any>
  containerStyle?: ViewStyle
}

export default function ImageList(props: ImageListProps) {
  const {
    images,
    keyExtractor,
    showEditButton,
    onImagePress,
    onRemovePress,
    itemImageStyle,
    containerStyle,
    ...restProps
  } = props

  const lightBox = useRef<LightBoxRef>(null)

  const _keyExtractor = (image: any, index: number) => {
    if (keyExtractor) {
      return keyExtractor(image, index)
    }
    return `image-${index}`
  }

  const _onImagePress = (image: any, index: number) => {
    if (onImagePress) {
      onImagePress(image, index)
    }
    lightBox.current?.open(index)
  }

  const _onRemovePress = (image: any, index: number) => {
    if (onRemovePress) {
      onRemovePress(image, index)
    }
  }

  const _renderItem = ({ item, index }) => (
    <ImageItem
      image={item}
      imageStyle={itemImageStyle}
      onPress={() => _onImagePress(item, index)}
      onRemovePress={() => _onRemovePress(item, index)}
      showEditButton={showEditButton}
    />
  )

  const renderSeparator = () => <View style={tw.w2} />

  return (
    <View style={containerStyle}>
      <FlatList
        data={images}
        horizontal={true}
        {...restProps}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={tw.pY2}
      />
      <Lightbox ref={lightBox} images={images} keyExtractor={_keyExtractor} />
    </View>
  )
}
