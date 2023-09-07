import InternalCalendar from "./Calendar"
import RangeCalendar from "./RangeCalendar"

export const Calendar = InternalCalendar as typeof InternalCalendar & {
  Range: typeof RangeCalendar
}

Calendar.Range = RangeCalendar
