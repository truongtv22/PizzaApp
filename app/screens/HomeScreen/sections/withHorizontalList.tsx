import React from "react"
import { tw, color } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { View, ScrollView, TouchableOpacity } from "react-native"
import { Row } from "app/components"

interface HorizontalListProps<TItem> {
  data: TItem[]
  title?: string
  keyExtractor?: (item: TItem, index: number) => string
  showAll?: boolean
  onShowAllPress?: () => void
}

export function withHorizontalList<TItem = any>(ListItem) {
  return function HorizontalList({
    title,
    data,
    keyExtractor,
    showAll = false,
    onShowAllPress,
  }: HorizontalListProps<TItem>) {
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row space={2} style={tw.p4}>
            {data.map((item, index) => (
              <ListItem key={_keyExtractor(item, index)} {...item} />
            ))}
          </Row>
        </ScrollView>
      </View>
    )
  }
}
