import React, { Ref, forwardRef } from "react"
import { tw } from "react-native-tailwindcss"
import { Layout } from "@ui-kitten/components"
import Modal, { ModalRef, ModalProps } from "../Modal/Modal"

export interface BaseDatePickerProps extends ModalProps {
  Component?: typeof React.Component
}

const BaseDatePicker = forwardRef((props: BaseDatePickerProps, modalRef: Ref<ModalRef>) => {
  const {
    Component: Calendar,
    visible,
    onModalShow,
    onModalHide,
    onBackdropPress,
    ...restProps
  } = props

  return (
    <Modal
      ref={modalRef}
      style={tw.wAuto}
      visible={visible}
      onModalShow={onModalShow}
      onModalHide={onModalHide}
      onBackdropPress={onBackdropPress}
    >
      <Layout style={tw.rounded}>
        <Calendar {...restProps} />
      </Layout>
    </Modal>
  )
})

export default BaseDatePicker
