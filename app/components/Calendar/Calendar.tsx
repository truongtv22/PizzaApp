import React, { useState } from "react"
import moment, { Moment } from "moment"
import { useUpdateEffect } from "ahooks"
import { Calendar as RkCalendar } from "@ui-kitten/components"
import { cloneDate, isEqualDates } from "app/utils/dateHelper"

import BaseCalendar, { BaseCalendarProps } from "./BaseCalendar"

export interface CalendarProps extends BaseCalendarProps {}

export default function Calendar(props: CalendarProps) {
  const [date, setDate] = useState(() => moment(props.date))

  useUpdateEffect(() => {
    const newDate = moment(props.date)
    if (!isEqualDates(date, newDate)) {
      setDate(newDate)
    }
  }, [props.date])

  const onSelect = (selectedDate) => {
    const newDate = cloneDate(date, selectedDate)
    setDate(newDate)
    if (props.onSelect) props.onSelect(newDate)
  }

  const onTodayPress = () => {
    onSelect(moment())
  }

  return (
    <BaseCalendar
      {...props}
      Component={RkCalendar<Moment>}
      date={date}
      onSelect={onSelect}
      onTodayPress={onTodayPress}
    />
  )
}
