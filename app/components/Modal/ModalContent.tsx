import React, { useEffect } from "react"
import { BackHandler } from "react-native"

export interface ModalContentProps {
  children?: React.ReactNode
  backPressEnabled: boolean
  onModalShow?: () => void
  onModalHide?: () => void
  onBackButtonPress?: () => boolean
}

export default function ModalContent(props: ModalContentProps) {
  const { children, backPressEnabled = true, onModalShow, onModalHide, onBackButtonPress } = props

  useEffect(() => {
    if (onModalShow) onModalShow()
    return () => {
      if (onModalHide) onModalHide()
    }
  }, [])

  useEffect(() => {
    const backButtonSub = BackHandler.addEventListener("hardwareBackPress", onBackPress)
    return () => backButtonSub.remove()
  }, [])

  const onBackPress = () => {
    if (!backPressEnabled) {
      return true
    }
    if (onBackButtonPress) {
      return onBackButtonPress()
    }
    return false
  }

  return children
}
