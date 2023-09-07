import React, { useState, useMemo, useEffect, useCallback } from "react"
import { tw } from "react-native-tailwindcss"
import { View, ViewProps } from "react-native"
import { useLayout } from "@react-native-community/hooks"

export interface GridProps extends ViewProps {
  space?: number | string
  columns?: number
  minWidth?: number
}

export default function Grid(props: GridProps) {
  const { children, style, space = 1, columns, minWidth = 200, ...restProps } = props

  const length = React.Children.count(children)

  const { width, onLayout } = useLayout()

  const [numColumns, setNumColumns] = useState(1)
  const [columnWidth, setColumnWidth] = useState(100)

  useEffect(() => {
    let _columns = columns > 0 ? columns : Math.floor(width / minWidth)
    if (_columns < 1) _columns = 1
    setNumColumns(_columns)
    setColumnWidth(100 / _columns)
  }, [columns, width])

  const gridStyle = useMemo(() => [tw.flexRow, tw.flexWrap, tw[`_m${space}`]], [space])

  const itemStyle = useMemo(
    () => ({
      width: `${columnWidth}%`,
      ...tw[`p${space}`],
    }),
    [space, columnWidth],
  )

  const isLastRow = useCallback(
    (colIndex: number) => {
      if (colIndex - 1 > (Math.ceil(length / numColumns) - 1) * numColumns) {
        return true
      }
      return false
    },
    [length, numColumns],
  )

  return (
    <View {...restProps} style={[style, gridStyle]} onLayout={onLayout}>
      {React.Children.toArray(children).map((child, i) => (
        <View key={i} style={[itemStyle, isLastRow(i) && tw.pB0]}>
          {child}
        </View>
      ))}
    </View>
  )
}
