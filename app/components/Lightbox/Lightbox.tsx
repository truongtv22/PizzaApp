import React, { Ref, forwardRef, useCallback, useEffect, useImperativeHandle } from "react"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import { Text } from "@ui-kitten/components"
import ImageView from "react-native-image-viewing"

export interface LightboxProps {
  images?: any[]
  visible?: boolean
  keyExtractor?: (image: any, index: number) => string
}

export interface LightBoxRef {
  open: (imageIndex?: number, images?: any[]) => void
  close: () => void
}

const Lightbox = forwardRef(function Lightbox(props: LightboxProps, ref: Ref<LightBoxRef>) {
  const [images, setImages] = React.useState([])
  const [visible, setVisible] = React.useState(false)

  const [imageIndex, setImageIndex] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  useEffect(() => {
    setImages(props.images ?? [])
  }, [props.images])

  useEffect(() => {
    setVisible(props.visible ?? false)
  }, [props.visible])

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  const open = useCallback((imageIndex: number, images: any[]) => {
    setVisible(true)
    if (images) {
      setImages(images)
    }
    if (imageIndex >= 0) {
      setImageIndex(imageIndex)
      setCurrentIndex(imageIndex)
    }
  }, [])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const onIndexChange = useCallback((imageIndex: number) => {
    setCurrentIndex(imageIndex)
  }, [])

  const renderFooter = useCallback(
    () => (
      <View style={[tw.h16, tw.itemsCenter, tw.justifyCenter]}>
        <Text status="control">{`${currentIndex + 1} / ${images.length}`}</Text>
      </View>
    ),
    [images, currentIndex],
  )

  return (
    <ImageView
      {...props}
      images={images}
      visible={visible}
      imageIndex={imageIndex}
      onRequestClose={close}
      FooterComponent={renderFooter}
      onImageIndexChange={onIndexChange}
    />
  )
})

export default Lightbox
