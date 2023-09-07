import React, { Ref, forwardRef } from "react"

import { ModalRef } from "../Modal"

import RangeCalendar from "../Calendar/RangeCalendar"
import BaseDatePicker from "./BaseDatePicker"

const RangeDatePicker = forwardRef((props, modalRef: Ref<ModalRef>) => {
  return <BaseDatePicker ref={modalRef} {...props} Component={RangeCalendar} />
})

export default RangeDatePicker
