import React from "react"
import { tw } from "react-native-tailwindcss"
import { View, FlatList, ViewStyle } from "react-native"

import FileItem from "./FileItem"

export interface FileListProps {
  files: any[]
  variant?: string
  onRemovePress?: (file: any, index: number) => void
  containerStyle?: ViewStyle
}

export default function FileList(props: FileListProps) {
  const { files, variant, onRemovePress, containerStyle, ...restProps } = props

  const keyExtractor = (file: any, index: number) => `file-${index}`

  const _onRemovePress = (file: any, index: number) => {
    if (onRemovePress) {
      onRemovePress(file, index)
    }
  }

  const renderItem = ({ item, index }) => (
    <FileItem file={item} variant={variant} onRemovePress={(file) => _onRemovePress(file, index)} />
  )

  const renderSeparator = () => <View style={tw.h1} />

  return (
    <View style={containerStyle}>
      <FlatList
        data={files}
        keyExtractor={keyExtractor}
        {...restProps}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  )
}
