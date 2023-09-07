import React, { useRef, useMemo } from "react"
import moment, { Moment } from "moment"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import {
  Text,
  Button,
  Divider,
  Calendar as RkCalendar,
  CalendarProps as RkCalendarProps,
} from "@ui-kitten/components"

import dateServiceFunc from "./dateService"

// function withCalendar<P extends RkCalendarProps>(Component: React.ComponentType<P>) {
//   return (props: P) => {
//     return <Component {...props} min={props.min} />
//   }
// }

// const UICalendar = withCalendar<RkCalendarProps>(RkCalendar)

// function ExtendCalendar<P extends RkCalendarProps>(props: P & { Component: React.ComponentType<P> }) {
//   const { Component } = props
//   return <Component {...props} min={props.min} />
// }

// function Main() {
//   return (
//     <>
//       <UICalendar date={null} min={null} />
//       <ExtendCalendar<RkCalendarProps> Component={RkCalendar} date={null} min={null} />
//     </>
//   )
// }

export interface BaseCalendarProps extends RkCalendarProps<Moment> {
  Component?: typeof React.Component
  showToday?: boolean
  onTodayPress?: () => void
}

const MIN_DATE = new Date(1900, 0)
const MAX_DATE = new Date(2100, 0)

export default function BaseCalendar(props: BaseCalendarProps) {
  const {
    Component: Calendar,
    min = MIN_DATE,
    max = MAX_DATE,
    showToday = true,
    dateService = dateServiceFunc,
  } = props

  const calendarRef = useRef<RkCalendar<Moment>>(null)

  const minDate = useMemo(() => moment(min), [min])
  const maxDate = useMemo(() => moment(max), [max])

  const onTodayPress = () => {
    calendarRef.current?.scrollToToday()
    if (props.onTodayPress) props.onTodayPress()
  }

  const renderDay = (info, style) => (
    <View style={[tw.flex1, tw.itemsCenter, tw.justifyCenter, style.container]}>
      <Text style={[style.text, dateService.getDayOfWeek(info.date) ? style.text : tw.textRed500]}>
        {dateService.getDate(info.date)}
      </Text>
    </View>
  )

  const renderToday = () => (
    <View style={tw.mB2}>
      <Divider />
      <Button size="small" style={[tw.mT4, tw.mR4, tw.selfEnd]} onPress={onTodayPress}>
        Hôm nay
      </Button>
    </View>
  )

  return (
    <Calendar
      ref={calendarRef}
      {...props}
      min={minDate}
      max={maxDate}
      dateService={dateServiceFunc}
      renderDay={renderDay}
      renderFooter={showToday && renderToday}
    />
  )
}
