import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity } from "react-native"
import { Icon, Text, Button, CheckBox } from "@ui-kitten/components"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { tw } from "react-native-tailwindcss"

import { Form, Column, Row, Container, Header, Content, Upload } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { useStores } from "app/models"

interface LoginValues {
  taikhoan: string
  matkhau: string
}

const loginSchema = Yup.object({
  taikhoan: Yup.string().label("Tài khoản").required("${label} không được để trống"),
  matkhau: Yup.string()
    .label("Mật khẩu")
    .required("${label} không được để trống")
    .min(3, "${label} yêu cầu ít nhất ${min} ký tự"),
})

interface LoginScreenProps extends AppStackScreenProps<AppRoute.LOGIN> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const { authStore } = useStores()

  const initialValues = useMemo<LoginValues>(
    () => ({
      taikhoan: "dungdv",
      matkhau: "dung92",
    }),
    [],
  )

  const [shouldRemember, setShouldRemember] = useState(true)
  const [passwordSecure, setPasswordSecure] = useState(true)

  const onFormSubmit = (values: LoginValues) => {
    authStore.login(values.taikhoan, values.matkhau)
  }

  const onPasswordPress = () => {
    setPasswordSecure(!passwordSecure)
  }

  const onRememberChange = (checked: boolean) => {
    setShouldRemember(checked)
  }

  const navigateLoginSms = () => {
    navigation.navigate(AppRoute.LOGIN_SMS)
  }

  const navigateRegister = () => {
    navigation.navigate(AppRoute.REGISTER)
  }

  const navigateForgetPass = () => {
    navigation.navigate(AppRoute.FORGET_PASS)
  }

  const renderForm = (formik: FormikProps<LoginValues>) => (
    <Column space={6}>
      <Column space={4}>
        <Form.Item name="taikhoan" label="Tài khoản">
          <Form.Input placeholder="Nhập tài khoản" />
        </Form.Item>
        <Form.Item
          name="matkhau"
          label={
            <Row space={1} justify="space-between">
              <Form.Label>Mật khẩu</Form.Label>
              <TouchableOpacity onPress={navigateForgetPass}>
                <Text status="primary">Quên mật khẩu</Text>
              </TouchableOpacity>
            </Row>
          }
        >
          <Form.Input
            placeholder="Nhập mật khẩu"
            autoCapitalize="none"
            accessoryRight={(iconProps) => (
              <TouchableOpacity onPress={onPasswordPress}>
                <Icon {...iconProps} pack="feather" name={passwordSecure ? "eye" : "eye-off"} />
              </TouchableOpacity>
            )}
            secureTextEntry={passwordSecure}
          />
        </Form.Item>
        <Row items="center" justify="space-between">
          <CheckBox checked={shouldRemember} onChange={onRememberChange}>
            Ghi nhớ mật khẩu
          </CheckBox>
        </Row>
      </Column>
      <Column space={2}>
        <Button onPress={formik.submitForm}>ĐĂNG NHẬP</Button>
        <Button appearance="outline" onPress={navigateRegister}>
          ĐĂNG KÝ
        </Button>
      </Column>
    </Column>
  )

  return (
    <Container>
      <Header />
      <Content keyboardEnabled>
        <Column space={10} style={[tw.flex1, tw.p4]}>
          <Text category="h1" style={tw.textCenter}>
            Đăng nhập
          </Text>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            component={renderForm}
            validationSchema={loginSchema}
          />
          <Row space={2} items="center">
            <Text category="s1">Đăng nhập qua:</Text>
            <Button
              onPress={navigateLoginSms}
              accessoryLeft={<Icon pack="feather" name="message-circle" />}
            >
              SMS
            </Button>
          </Row>
        </Column>
      </Content>
    </Container>
  )
})
