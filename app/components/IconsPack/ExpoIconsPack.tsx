import React from "react"
import { StyleSheet } from "react-native"
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"

const IconProvider = (Icon, name: string) => ({
  toReactElement: (props) => {
    const { fill, style, ...restProps } = props

    const { width, height } = StyleSheet.flatten([style, props])
    const { tintColor, ...restStyle } = StyleSheet.flatten(style || {})

    return (
      <Icon
        {...restProps}
        name={name}
        size={width || height}
        color={fill || tintColor}
        style={restStyle}
      />
    )
  },
})

const createIconsMap = (Icon) => new Proxy({}, { get: (target, name: string) => IconProvider(Icon, name) })

export const FeatherIconsPack = {
  name: "feather",
  icons: createIconsMap(Feather),
}

export const MaterialIconsPack = {
  name: "material",
  icons: createIconsMap(MaterialIcons),
}

export const FontAwesomeIconsPack = {
  name: "font-awesome",
  icons: createIconsMap(FontAwesome),
}

export const FontAwesome5IconsPack = {
  name: "font-awesome5",
  icons: createIconsMap(FontAwesome5),
}

export const MaterialCommunityIconsPack = {
  name: "material-community",
  icons: createIconsMap(MaterialCommunityIcons),
}
