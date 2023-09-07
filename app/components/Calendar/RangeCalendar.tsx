import React from "react"
import { Moment } from "moment"
import { RangeCalendar as RkRangeCalendar } from "@ui-kitten/components"

import BaseCalendar from "./BaseCalendar"

export default function RangeCalendar(props) {
  return <BaseCalendar boundingMonth={false} {...props} Component={RkRangeCalendar<Moment>} />
}
