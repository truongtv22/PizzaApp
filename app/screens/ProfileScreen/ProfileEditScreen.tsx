import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { Formik } from "formik"
import { TouchableOpacity, View } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import { Form, Modal, Toast, Column, Avatar, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { useStores } from "app/models"
import { GIOI_TINH } from "app/constants/constants"

interface ProfileEditScreenProps extends AppStackScreenProps<AppRoute.PROFILE_EDIT> {}

export const ProfileEditScreen: FC<ProfileEditScreenProps> = observer(function ProfileEditScreen() {
  const {
    userStore: { user },
  } = useStores()

  const initialValues = {
    hoten: user.hoten,
    email: user.email,
    ngaysinh: user.ngaysinh,
    gioitinh: user.gioitinh,
    dienthoai: user.dienthoai,
  }

  const modalRef = React.useRef()

  const closeModal = () => {
    modalRef.current?.hide()
  }

  const onFormSubmit = (values) => {
    modalRef.current?.show()
  }

  const onAvatarChange = () => {
    Toast.showText("Chức năng đang phát triển")
  }

  const renderForm = useCallback(
    (formik) => (
      <Column space={6}>
        <Column space={4}>
          <Form.Item name="hoten" label="Họ và tên" required>
            <Form.Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item name="ngaysinh" label="Ngày sinh">
            <Form.DatePicker />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Form.Input
              placeholder="Nhập email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Form.Item>
          <Form.Item name="dienthoai" label="Số điện thoại">
            <Form.Input
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </Form.Item>
          <Form.Item name="gioitinh" label="Giới tính">
            <Form.Select options={GIOI_TINH} placeholder="Giới tính" />
          </Form.Item>
          <Form.Item name="diachi" label="Địa chỉ">
            <Form.Input multiline placeholder="Nhập địa chỉ" />
          </Form.Item>
          <View style={tw.h2} />
        </Column>
        <Button onPress={formik.handleSubmit}>CẬP NHẬT</Button>
      </Column>
    ),
    [],
  )

  return (
    <Container>
      <Header status="primary" title="Chỉnh sửa cá nhân" />
      <Content keyboardEnabled>
        <Column space={6} style={tw.p4}>
          <View style={[tw.itemsCenter, tw.justifyCenter]}>
            <TouchableOpacity onPress={onAvatarChange}>
              <Avatar style={[tw.w24, tw.h24]} title="Ng" status="primary" />
              <Avatar
                size="small"
                icon={{ name: "camera" }}
                style={[tw.absolute, { right: -10, bottom: -10 }]}
                onPress={onAvatarChange}
              />
            </TouchableOpacity>
          </View>
          <Formik initialValues={initialValues} onSubmit={onFormSubmit} component={renderForm} />
        </Column>
      </Content>
      <Modal ref={modalRef} onBackdropPress={closeModal}>
        <Container style={[tw.p6, tw.rounded]}>
          <View style={tw.itemsCenter}>
            <Avatar icon={{ name: "checkmark" }} style={[tw.w20, tw.h20]} status="success" />
          </View>
          <View style={tw.h6} />
          <View style={tw.itemsCenter}>
            <Text category="h4">Thành công</Text>
            <View style={tw.h1} />
            <Text appearance="hint">Chỉnh sửa thành công</Text>
          </View>
        </Container>
      </Modal>
    </Container>
  )
})
