import React, { useMemo, useCallback } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { Text, Select, SelectItem, IndexPath, SelectProps } from "@ui-kitten/components"

import useStyled from "app/utils/useStyled"
import useFormControlState from "../FormControl/useFormControlState"

type RawValue = string | number

export type SelectValue = RawValue | RawValue[]

export interface FormSelectProps extends Omit<SelectProps, "value"> {
  value?: SelectValue
  options?: any[]
  multiple?: boolean
  onChange?: (value) => void
  parseValue?: (selected) => any
  formatValue?: (value) => any
  getOptionLabel?: (option) => any
  getOptionValue?: (option) => any
  containerStyle?: StyleProp<ViewStyle>
}

const _parseValue = (selected) => (typeof selected === "object" ? selected.value : selected)
const _formatValue = (value) => value
const _getOptionLabel = (option) => (typeof option === "object" ? option.label : option)
const _getOptionValue = (option) => (typeof option === "object" ? option.value : option)

export default function FormSelect(props: FormSelectProps) {
  const {
    value,
    options = [],
    multiple,
    onChange,
    parseValue = _parseValue,
    formatValue = _formatValue,
    getOptionLabel = _getOptionLabel,
    getOptionValue = _getOptionValue,
    containerStyle,
    ...selectProps
  } = props
  const { eva } = useStyled("Select", props)

  const fcs = useFormControlState({
    props,
    states: ["status", "variant", "disabled", "readonly"],
  })

  const { borderColor, borderBottomWidth } = eva.style

  const computedStyle = useMemo(
    () => ({
      container: {
        borderBottomWidth,
        borderBottomColor: borderColor,
      },
    }),
    [],
  )

  const computedValue = useMemo(() => {
    if (Array.isArray(value) && multiple) {
      return value.map(formatValue)
    }
    return formatValue(value)
  }, [value, multiple])

  const computedOptions = useMemo(() => {
    const results = []
    for (let i = 0; i < options.length; i += 1) {
      const option = options[i]
      results.push(getOptionValue(option))
    }
    return results
  }, [options])

  const selectedIndex = useMemo(() => {
    if (Array.isArray(computedValue) && multiple) {
      const indexesPath = computedValue.reduce((results, currValue) => {
        const foundIndex = computedOptions.indexOf(getOptionValue(currValue))
        if (foundIndex !== -1) {
          results.push(new IndexPath(foundIndex))
        }
        return results
      }, [])
      return indexesPath
    }
    if (computedValue) {
      const foundIndex = computedOptions.indexOf(getOptionValue(computedValue))
      if (foundIndex !== -1) {
        const indexPath = new IndexPath(foundIndex)
        return indexPath
      }
    }
    return null
  }, [multiple, computedValue, computedOptions])

  const displayValue = useMemo(() => {
    if (options.length > 0 && selectedIndex) {
      if (Array.isArray(selectedIndex) && multiple) {
        return selectedIndex.map(({ row }) => getOptionLabel(options[row])).join(", ")
      }
      return getOptionLabel(options[selectedIndex.row])
    }
    return ""
  }, [options, multiple, selectedIndex])

  const onSelectChange = useCallback(
    (selectedPath) => {
      let selectedOption
      if (multiple) {
        selectedOption = selectedPath.map(({ row }) => parseValue(options[row]))
      } else {
        selectedOption = parseValue(options[selectedPath.row])
      }
      if (onChange) {
        onChange(selectedOption)
      }
    },
    [options, multiple],
  )

  const renderOption = useCallback(
    (option) => <SelectItem key={getOptionValue(option)} title={getOptionLabel(option)} />,
    [],
  )

  if (fcs.readonly) {
    return (
      <View style={containerStyle}>
        <Text>{displayValue}</Text>
      </View>
    )
  }

  return (
    <View style={[computedStyle.container, containerStyle]}>
      <Select
        {...fcs}
        {...selectProps}
        value={displayValue}
        onSelect={onSelectChange}
        multiSelect={multiple}
        selectedIndex={selectedIndex}
      >
        {options.map(renderOption)}
      </Select>
    </View>
  )
}
