import moment from "moment"

export const FORMAT_TYPE = {
  DATE: "DD/MM/YYYY",
  TIME: "HH:mm",
  DATE_TIME: "DD/MM/YYYY HH:mm",
  REFERENCE_TIME: "REFERENCE_TIME",
}

export const formatDate = (value = null, format?: string, defaultValue = "") => {
  const date = moment(value)
  if (date.isValid()) {
    if (format === FORMAT_TYPE.REFERENCE_TIME) {
      return date.calendar()
    }
    return date.format(format ?? FORMAT_TYPE.DATE)
  }
  return defaultValue
}

export const parseDate = (value = null, defaultValue?) => {
  const date = moment(value)
  if (date.isValid()) {
    return date
  }
  return defaultValue
}

export const parseString = (value = null, defaultValue = "") => {
  const date = moment(value)
  if (date.isValid()) {
    return date.valueOf()
  }
  return defaultValue
}

export const cloneDate = (date1, date2) => {
  const newDate = date1.clone()
  newDate.year(date2.year())
  newDate.month(date2.month())
  newDate.date(date2.date())
  return newDate
}

export const isEqualDates = (date1, date2) => {
  if (moment(date1).isSame(date2)) {
    return true
  }
  return false
}

export const isEqualRangeDates = (rangeDate1, rangeDate2) => {
  if (!isEqualDates(rangeDate1.startDate, rangeDate2.startDate)) {
    return false
  }
  if (!isEqualDates(rangeDate1.endDate, rangeDate2.endDate)) {
    return false
  }
  return true
}
