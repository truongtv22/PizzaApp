import React, { Ref, forwardRef } from "react"

import { ModalRef } from "../Modal"

import Calendar from "../Calendar/Calendar"
import BaseDatePicker from "./BaseDatePicker"

const DatePicker = forwardRef((props, modalRef: Ref<ModalRef>) => {
  return <BaseDatePicker ref={modalRef} {...props} Component={Calendar} />
})

export default DatePicker
