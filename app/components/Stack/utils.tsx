import React from "react"
import { tw } from "react-native-tailwindcss"
import { View, ViewStyle } from "react-native"

export function flattenChildren(children: React.ReactNode) {
  const childrenArray = React.Children.toArray(children)
  return childrenArray.reduce((flatChildren: JSX.Element[], child: JSX.Element) => {
    if (child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children))
    }
    if (React.isValidElement(child)) {
      flatChildren.push(React.cloneElement(child))
    } else {
      flatChildren.push(child)
    }
    return flatChildren
  }, [])
}

export const getSpacedChildren = (
  children: React.ReactNode,
  space: number | string,
  axis: "X" | "Y",
  divider: JSX.Element | undefined,
) => {
  let childrenArray = React.Children.toArray(flattenChildren(children))

  if (divider) {
    const spacingStyle: ViewStyle = axis === "X" ? tw[`mX${space}`] : tw[`mY${space}`]
    divider = React.cloneElement(divider, { style: spacingStyle })
    childrenArray = childrenArray.map((child: any, index: number) => (
      <React.Fragment key={child.key ?? `child-${index}`}>
        {child}
        {index < childrenArray.length - 1 && divider}
      </React.Fragment>
    ))
  } else {
    const spacingStyle: ViewStyle = axis === "X" ? tw[`w${space}`] : tw[`h${space}`]
    childrenArray = childrenArray.map((child: any, index: number) => (
      <React.Fragment key={child.key ?? `child-${index}`}>
        {child}
        {index < childrenArray.length - 1 && <View style={spacingStyle} />}
      </React.Fragment>
    ))
  }

  return childrenArray
}
