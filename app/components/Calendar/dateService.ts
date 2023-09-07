import { Moment } from "moment"
import upperFirst from "lodash/upperFirst"
import { MomentDateService } from "@ui-kitten/moment"
import { TranslationWidth } from "@ui-kitten/components"

export class CustomDateService extends MomentDateService {
  compareDates(date1: Moment, date2: Moment) {
    const duration = super.compareDates(date1, date2)
    if (duration < 0) {
      return -1
    } else if (duration > 0) {
      return 1
    }
    return 0
  }

  getDayOfWeekNames(style: TranslationWidth) {
    const dayNames = super.getDayOfWeekNames(style)
    return this.shiftDayOfWeekNames([...dayNames], this.getFirstDayOfWeek())
  }

  shiftDayOfWeekNames(value: string[], offset: number) {
    return value.splice(offset).concat(value)
  }

  getMonthName(date: Moment, style: TranslationWidth) {
    const monthName = super.getMonthName(date, style)
    return upperFirst(monthName)
  }
}

const dateService = new CustomDateService("vi")

export default dateService
