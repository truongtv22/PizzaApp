import React, { RefObject, forwardRef, useCallback } from "react"
import { tw } from "react-native-tailwindcss"
import { Portal } from "react-native-portalize"
import { Modalize } from "react-native-modalize"
import { View } from "react-native"
import { Text, Divider } from "@ui-kitten/components"

import { Column } from "../Stack"
import ActionSheetItem from "./ActionSheetItem"
import useSafeAreaStyle from "../SafeAreaView/useSafeAreaStyle"

export interface ActionSheetProps {
  children?: JSX.Element | JSX.Element[]
  title?: string
  message?: string
  options?: any[]
}

export interface ActionSheetRef {
  open: () => {}
  close: () => {}
}

const ActionSheet = forwardRef(function ActionSheet(
  props: ActionSheetProps,
  ref: RefObject<Modalize>,
) {
  const { children, title, message, options, ...restProps } = props

  const containerStyle = useSafeAreaStyle(["bottom"], tw.p4)

  const close = useCallback(() => {
    ref.current?.close()
  }, [])

  const onItemPress = useCallback((itemProps) => {
    if (itemProps.onPress) itemProps.onPress()
    close()
  }, [])

  const renderList = useCallback(() => {
    if (options) {
      return options.map(renderItem)
    }
    return children
  }, [options, children])

  const renderItem = useCallback((itemProps, itemIndex: number) => {
    return (
      <ActionSheetItem
        key={`item-${itemIndex}`}
        {...itemProps}
        onPress={() => onItemPress(itemProps)}
      />
    )
  }, [])

  const renderHeader = useCallback(() => {
    if (title || message) {
      return (
        <Column space={1} style={[tw.p4, tw.itemsCenter]}>
          <Text category="s1">{title}</Text>
          {message && (
            <Text appearance="hint" category="p2">
              {message}
            </Text>
          )}
        </Column>
      )
    }
    return null
  }, [title, message])

  const renderFooter = useCallback(
    () => (
      <View style={[tw.rounded, tw.bgWhite, tw.overflowHidden]}>
        <ActionSheetItem text="Huỷ" onPress={close} />
      </View>
    ),
    [],
  )

  return (
    <Portal>
      <Modalize
        ref={ref}
        {...restProps}
        withHandle={false}
        modalStyle={tw.bgTransparent}
        adjustToContentHeight={true}
      >
        <Column space={4} style={containerStyle}>
          <Column divider={<Divider />} style={[tw.rounded, tw.bgWhite, tw.overflowHidden]}>
            {renderHeader()}
            {renderList()}
          </Column>
          {renderFooter()}
        </Column>
      </Modalize>
    </Portal>
  )
})

export default ActionSheet
