import { FormControlValue } from "./FormControl"
import useFormControl from "./useFormControl"

type State = keyof FormControlValue

type FormControlStateType = {
  props: { [key: string]: any }
  states: State[]
}

export default function useFormControlState({
  props,
  states,
}: FormControlStateType): FormControlValue {
  const formControl = useFormControl()

  return states.reduce((acc, state) => {
    acc[state] = props[state]
    if (formControl && typeof props[state] === "undefined") {
      acc[state] = formControl[state]
    }
    return acc
  }, {})
}
