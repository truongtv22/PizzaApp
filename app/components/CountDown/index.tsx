import React from "react"
import { useCountDown } from "ahooks"
import { Text, TextProps } from "@ui-kitten/components"

export interface CountDownProps extends TextProps {
  /**
   * The rest of time (s)
   * @default 60
   */
  time?: number
  /**
   * Format countdown text
   */
  formatText?: (count: number) => string
  /**
   * Function to call when countdown completes
   */
  onFinish?: () => void
}

export const CountDown = ({ time = 60, formatText, onFinish, ...props }: CountDownProps) => {
  const [countdown] = useCountDown({
    leftTime: time * 1000,
    onEnd: onFinish,
  })

  const count = React.useMemo(() => {
    return Math.round(countdown / 1000)
  }, [countdown])

  if (formatText) {
    return <Text {...props}>{formatText(count)}</Text>
  }
  return <Text {...props}>{count}</Text>
}
