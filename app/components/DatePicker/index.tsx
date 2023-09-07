import InternalDatePicker from "./DatePicker"
import RangeDatePicker from "./RangeDatePicker"

export const DatePicker = InternalDatePicker as typeof InternalDatePicker & {
  Range: typeof RangeDatePicker
}

DatePicker.Range = RangeDatePicker
