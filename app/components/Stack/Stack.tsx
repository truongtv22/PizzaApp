import React, { useMemo } from "react"
import { View, ViewStyle, StyleProp, ViewProps } from "react-native"

import { getSpacedChildren } from "./utils"

export interface StackProps extends ViewProps {
  space?: number | string
  style?: StyleProp<ViewStyle>
  divider?: JSX.Element
  center?: boolean
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  items?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  direction?: "row" | "column" | "row-reverse" | "column-reverse"
}

export default function Stack({
  children,
  divider,
  space,
  style,
  wrap,
  center,
  items,
  justify,
  direction = "column",
  ...props
}: StackProps) {
  const baseStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: items || (center ? "center" : undefined),
      justifyContent: justify || (center ? "center" : undefined),
    }),
    [direction, wrap, center, items, justify],
  )

  const axis = useMemo(() => {
    return direction === "row" || direction === "row-reverse" ? "X" : "Y"
  }, [direction])

  return (
    <View {...props} style={[baseStyle, style]}>
      {getSpacedChildren(children, space, axis, divider)}
    </View>
  )
}
