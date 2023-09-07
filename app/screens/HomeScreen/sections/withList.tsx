import React from "react"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { tw, color } from "react-native-tailwindcss"
import { View, TouchableOpacity } from "react-native"
import { Column, Row } from "app/components"

interface ListProps<TItem> {
  data: TItem[]
  title?: string
  keyExtractor?: (item: TItem, index: number) => string
  showAll?: boolean
  onShowAllPress?: () => void
  showMore?: boolean
  onShowMorePress?: () => void
}

export function withList<TItem = any>(ListItem) {
  return function List({
    title,
    data,
    keyExtractor,
    showAll = false,
    onShowAllPress,
    showMore = false,
    onShowMorePress,
  }: ListProps<TItem>) {
    const _keyExtractor = (item: TItem, index: number) => {
      if (keyExtractor) {
        return keyExtractor(item, index)
      }
      return (item as any)._id
    }

    return (
      <View>
        {title ? (
          <Row space={4} style={[tw.pX4, tw.itemsCenter, tw.justifyBetween]}>
            <Text style={tw.textXl}>{title}</Text>
            {showAll ? (
              <TouchableOpacity onPress={onShowAllPress}>
                <Ionicons name="chevron-forward" size={22} color={color.primary} />
              </TouchableOpacity>
            ) : null}
          </Row>
        ) : null}
        <Column space={4} style={tw.p4}>
          <Column space={4}>
            {data.map((item, index) => (
              <ListItem key={_keyExtractor(item, index)} {...item} />
            ))}
          </Column>
          {showMore && (
            <TouchableOpacity style={tw.selfCenter} onPress={onShowMorePress}>
              <Text status="primary">Xem thêm...</Text>
            </TouchableOpacity>
          )}
        </Column>
      </View>
    )
  }
}
