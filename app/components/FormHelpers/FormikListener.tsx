import React from "react"
import isEqual from "lodash/isEqual"
import { useFormikContext } from "formik"

const defaultShouldTriggerErrors = (errors, nextErrors) => !isEqual(errors, nextErrors)

export default function FormikListener(props) {
  const shouldTriggerErrors = props?.shouldTriggerErrors || defaultShouldTriggerErrors

  const formik = useFormikContext()
  const [errors, setErrors] = React.useState(formik.errors)

  React.useEffect(() => {
    if (shouldTriggerErrors(errors, formik.errors)) {
      props?.onError(formik.errors)
      setErrors(errors)
    }
  }, [formik.submitCount, formik.errors])

  return null
}
