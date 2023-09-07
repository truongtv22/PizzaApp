import React, { forwardRef, useState, useCallback, useImperativeHandle } from "react"
import { View } from "react-native"
import { Spinner } from "@ui-kitten/components"
import { tw } from "react-native-tailwindcss"

const Loading = forwardRef(function Loading(props, ref) {
  const [loading, setLoading] = useState(false)

  const isLoading = () => loading

  const show = () => setLoading(true)

  const hide = () => setLoading(false)

  useImperativeHandle(
    ref,
    useCallback(() => ({ isLoading, show, hide }), [isLoading, show, hide]),
  )

  if (loading) {
    return (
      <View
        style={[
          tw.absolute,
          tw.inset0,
          tw.flex1,
          tw.itemsCenter,
          tw.justifyCenter,
          { backgroundColor: "rgba(0,0,0,0.6)" },
        ]}
      >
        <Spinner />
      </View>
    )
  }
  return null
})

export default Loading
