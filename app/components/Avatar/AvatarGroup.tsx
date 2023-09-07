import React from "react"
import { View } from "react-native"
import { tw } from "react-native-tailwindcss"
import { flattenChildren } from "../Stack/utils"

export interface AvatarGroupProps {}

export default function AvatarGroup({ children, max, total, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(flattenChildren(children))

  return (
    <View style={[tw.flexRow]}>
      {childrenArray.map((child, index) => (
        <View key={`avatar-${index}`} style={[tw._mL2]}>
          {child}
        </View>
      ))}
    </View>
  )
}
