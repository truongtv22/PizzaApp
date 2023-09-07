import React from "react"
import Stack, { StackProps } from "./Stack"

export default function Row(props: StackProps) {
  return <Stack direction="row" {...props} />
}
