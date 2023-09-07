import React, { Ref, forwardRef, useImperativeHandle, useState } from "react"
import { Modal as RkModal, ModalProps as RkModalProps } from "@ui-kitten/components"

import styles from "./styles"
import ModalContent from "./ModalContent"

export interface ModalProps extends RkModalProps {
  dismissEnabled?: boolean
  onModalShow?: () => void
  onModalHide?: () => void
  onBackdropPress?: () => boolean
}

export interface ModalRef {
  show: () => void
  hide: () => void
}

const Modal = forwardRef((props: ModalProps, ref: Ref<ModalRef>) => {
  const [visible, setVisible] = useState(false)

  const { dismissEnabled = true, onModalShow, onModalHide, onBackdropPress, ...restProps } = props

  const show = () => setVisible(true)

  const hide = () => setVisible(false)

  const _onBackdropPress = () => {
    if (dismissEnabled) {
      if (onBackdropPress) {
        onBackdropPress()
      } else {
        hide()
      }
    }
  }

  useImperativeHandle(ref, () => ({ show, hide }))

  return (
    <RkModal
      {...restProps}
      visible={visible}
      style={[styles.modal, props.style]}
      backdropStyle={[styles.backdrop, props.backdropStyle]}
      onBackdropPress={_onBackdropPress}
    >
      <ModalContent
        onModalShow={onModalShow}
        onModalHide={onModalHide}
        backPressEnabled={dismissEnabled}
        onBackButtonPress={onBackdropPress}
      >
        {props.children}
      </ModalContent>
    </RkModal>
  )
})

export default Modal
