import React, { useState } from "react"
import { tw } from "react-native-tailwindcss"
import { Text, Icon, IconProps, TextElement } from "@ui-kitten/components"
import { RenderProp } from "@ui-kitten/components/devsupport"
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ImageProps,
  ImageSourcePropType,
  TextStyle,
} from "react-native"

import useStyled from "app/utils/useStyled"
import renderNode from "app/utils/renderNode"

export interface AvatarProps {
  children?: JSX.Element | JSX.Element[]
  level?: "1" | "2" | "3" | "4"
  shape?: "round" | "rounded" | "square"
  size?: "tiny" | "small" | "medium" | "large" | "giant"
  status?: "basic" | "primary" | "success" | "info" | "warning" | "danger"
  source?: ImageSourcePropType
  title?: TextElement | React.ReactText
  imageProps?: ImageProps
  icon?: IconProps<{}> | RenderProp<ImageProps>
  style?: StyleProp<any>
  titleStyle?: TextStyle
  onPress?: () => void
  Component?: typeof React.Component
  ImageComponent?: typeof React.Component<ImageProps>
}

export default function Avatar(props: AvatarProps) {
  const {
    children,
    onPress,
    size,
    icon,
    title,
    source,
    imageProps,
    style,
    titleStyle,
    Component = onPress ? TouchableOpacity : View,
    ImageComponent = Image,
    ...restProps
  } = props
  const { eva } = useStyled("Avatar", props)

  const [imageLoaded, setImageLoaded] = useState(false)

  const { color, roundCoefficient, ...restStyle } = eva.style

  const baseStyle = StyleSheet.flatten([restStyle, style])

  const borderRadius = roundCoefficient * baseStyle.height

  const computedStyle = {
    container: {
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fill: color,
      width: baseStyle.width / 2,
      height: baseStyle.height / 2,
    },
    iconText: {
      color: color,
    },
    title: {
      color: color,
      fontSize: baseStyle.width / 2,
      lineHeight: baseStyle.width,
    },
  }

  const onImageLoad = () => setImageLoaded(true)

  const renderIcon = () => renderNode(Icon, icon, computedStyle.icon)

  const renderTitle = () => <Text style={[computedStyle.title, titleStyle]}>{title}</Text>

  const renderImage = () => (
    <ImageComponent
      source={source}
      {...imageProps}
      style={[computedStyle.container, tw.absolute, baseStyle]}
      onLoad={onImageLoad}
    />
  )

  return (
    <Component onPress={onPress} {...restProps} style={[computedStyle.container, baseStyle]}>
      {!!source && (typeof source === "number" || ("uri" in source && source.uri)) && renderImage()}
      {!imageLoaded && ((!!title && renderTitle()) || (!!icon && renderIcon()))}
      {children}
    </Component>
  )
}
