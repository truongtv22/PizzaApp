import React, { useRef, useMemo, useState } from "react"
import toLower from "lodash/toLower"
import { useUpdateEffect } from "ahooks"

import { Text, Input, Icon, InputProps } from "@ui-kitten/components"
import { View, StyleProp, ViewStyle, TouchableWithoutFeedback } from "react-native"

import renderNode from "app/utils/renderNode"
import { parseDate, parseString, isEqualDates } from "app/utils/dateHelper"

import DatePicker from "../DatePicker/DatePicker"
import useFormControlState from "../FormControl/useFormControlState"

export interface FormDatePickerProps extends InputProps {
  value?: string
  format?: string
  onChange?: (value) => void
  parseValue?: (selected) => any
  formatValue?: (value) => any
  containerStyle?: StyleProp<ViewStyle>
}

export default function FormDatePicker(props: FormDatePickerProps) {
  const {
    icon = { name: "calendar" },
    value,
    format = "DD/MM/YYYY",
    parseValue = parseString,
    formatValue = parseDate,
    containerStyle,
    ...restProps
  } = props

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly"],
  })

  const inputRef = useRef(null)
  const pickerRef = useRef(null)

  const [date, setDate] = useState(() => formatValue(value))

  const placeholder = useMemo(() => {
    const formatStr = toLower(format)
    return formatStr
  }, [format])

  const displayValue = useMemo(() => {
    if (date && date.isValid()) {
      return date.format(format)
    }
    return ""
  }, [date, format])

  useUpdateEffect(() => {
    const nextDate = formatValue(value)
    if (!isEqualDates(date, nextDate)) {
      setDate(nextDate)
    }
  }, [value])

  const showPicker = () => {
    pickerRef.current?.show()
  }

  const hidePicker = () => {
    pickerRef.current?.hide()
  }

  const onSelect = (selectedDate) => {
    setDate(selectedDate)
    onChange(selectedDate)
  }

  const onChange = (selectedDate) => {
    if (props.onChange) {
      props.onChange(parseValue(selectedDate))
    }
  }

  const onModalShow = () => {
    inputRef.current?.onTextFieldFocus()
  }

  const onModalHide = () => {
    inputRef.current?.onTextFieldBlur()
  }

  const renderIcon = (iconProps) => renderNode(Icon, icon, iconProps)

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{displayValue}</Text>
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback style={containerStyle} onPress={showPicker}>
      <View pointerEvents="box-only">
        <Input
          ref={inputRef}
          {...fcs}
          placeholder={placeholder}
          accessoryRight={icon && renderIcon}
          {...restProps}
          value={displayValue}
        />
        <DatePicker
          ref={pickerRef}
          {...restProps}
          date={date}
          onSelect={onSelect}
          onModalShow={onModalShow}
          onModalHide={onModalHide}
          onBackdropPress={hidePicker}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
