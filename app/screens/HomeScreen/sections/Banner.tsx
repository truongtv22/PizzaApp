import React, { useRef, useState } from "react"
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import { tw } from "react-native-tailwindcss"
import { Row } from "app/components"

const silders = [
  {
    id: 1,
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/vicaread/20230804_052133_391595_MyVinmec-min.jpg",
  },
  {
    id: 2,
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/vicaread/20230718_023118_601204_WebsiteVinmec.com1.1.jpg",
  },
]

const BannerItem = (item) => {
  const { width } = useWindowDimensions()

  return (
    <TouchableOpacity style={tw.pX4} onPress={() => {}} activeOpacity={0.8}>
      <Image
        source={{ uri: item.image }}
        style={[tw.roundedLg, { width: width - 16 * 2, height: width * 0.4 }]}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  )
}

export default function Banner() {
  const scrollRef = useRef<ScrollView>()
  const [silderIndex, setSilderIndex] = useState(0)

  const { width } = useWindowDimensions()

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSilderIndex(Math.floor((event.nativeEvent.contentOffset.x + width / 2) / width))
  }

  const scrollIndex = (index: number) => {
    scrollRef.current?.scrollTo({ x: width * index, animated: true })
  }

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        onScroll={onScroll}
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {silders.map((item) => (
          <BannerItem key={item.id} {...item} />
        ))}
      </ScrollView>
      <Row space={1} style={[tw.absolute, tw.insetX0, tw.justifyCenter, { bottom: 4 }]}>
        {silders.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              tw.w2,
              tw.h2,
              tw.roundedFull,
              silderIndex === index ? tw.bgPrimary : tw.bgWhite,
            ]}
            onPress={() => scrollIndex(index)}
          />
        ))}
      </Row>
    </View>
  )
}
