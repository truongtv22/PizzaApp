import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Formik, FormikProps } from "formik"
import { Text, Button } from "@ui-kitten/components"
import { tw } from "react-native-tailwindcss"
import * as Yup from "yup"
import "yup-phone-lite"

import { Form, Column, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { GIOI_TINH } from "app/constants/constants"

interface RegisterValues {
  taikhoan: string
  matkhau: string
  xacnhanmatkhau: string
  hoten: string
  cccd?: string
  email: string
  dienthoai: string
  ngaysinh?: string
  gioitinh?: number // 1: Nam, 2: Nữ, 3: Khác
  diachi?: string
}

const registerSchema = Yup.object({
  taikhoan: Yup.string()
    .label("Họ và tên")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
  matkhau: Yup.string()
    .label("Mật khẩu")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
  xacnhanmatkhau: Yup.string()
    .label("Xác nhận mật khẩu")
    .required("${label} không được để trống")
    .oneOf([Yup.ref("matkhau")], "Mật khẩu không khớp"),
  hoten: Yup.string()
    .label("Họ và tên")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
  email: Yup.string().label("Email").email("${label} không đúng định dạng"),
  dienthoai: Yup.string().label("Số điện thoại").phone("VN", "${label} không đúng định dạng"),
})

interface RegisterScreenProps extends AppStackScreenProps<AppRoute.REGISTER> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen() {
  const initialValues = useMemo<RegisterValues>(
    () => ({
      taikhoan: "",
      matkhau: "",
      xacnhanmatkhau: "",
      hoten: "",
      email: "",
      dienthoai: "",
    }),
    [],
  )

  const onFormSubmit = (values: RegisterValues) => {}

  const renderForm = (formik: FormikProps<RegisterValues>) => (
    <Column space={6}>
      <Column space={4}>
        <Form.Item name="taikhoan" label="Tài khoản" required>
          <Form.Input placeholder="Nhập tài khoản" />
        </Form.Item>
        <Form.Item name="matkhau" label="Mật khẩu" required>
          <Form.Input placeholder="Nhập mật khẩu" autoCapitalize="none" secureTextEntry />
        </Form.Item>
        <Form.Item name="xacnhanmatkhau" label="Xác nhận mật khẩu" required>
          <Form.Input placeholder="Nhập lại mật khẩu" autoCapitalize="none" secureTextEntry />
        </Form.Item>
        <Form.Item name="hoten" label="Họ và tên" required>
          <Form.Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item name="ngaysinh" label="Ngày sinh">
          <Form.DatePicker />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Form.Input placeholder="Nhập email" keyboardType="email-address" autoCapitalize="none" />
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
      </Column>
      <Button onPress={formik.submitForm}>ĐĂNG KÝ</Button>
    </Column>
  )

  return (
    <Container>
      <Header />
      <Content keyboardEnabled>
        <Column space={6} style={[tw.flex1, tw.p4]}>
          <Text category="h1" style={tw.textCenter}>
            Đăng ký
          </Text>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            component={renderForm}
            validationSchema={registerSchema}
          />
        </Column>
      </Content>
    </Container>
  )
})
