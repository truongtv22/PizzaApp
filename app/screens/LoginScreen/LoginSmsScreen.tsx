import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
import "yup-phone-lite"
import { tw } from "react-native-tailwindcss"
import { Formik, FormikProps } from "formik"
import { View } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import { Form, Column, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"

interface LoginSmsValues {
  phone: string
}

const loginSmsSchema = Yup.object({
  phone: Yup.string()
    .label("Số điện thoại")
    .required("${label} không được để trống")
    .phone("VN", "${label} không đúng định dạng"),
})

interface LoginSmsScreenProps extends AppStackScreenProps<AppRoute.LOGIN_SMS> {}

export const LoginSmsScreen: FC<LoginSmsScreenProps> = observer(function LoginSmsScreen({
  navigation,
}) {
  const initialValues: LoginSmsValues = {
    phone: "",
  }

  const onFormSubmit = (values: LoginSmsValues) => {
    navigation.navigate(AppRoute.VERIFY_SMS)
  }

  const renderForm = (formik: FormikProps<LoginSmsValues>) => (
    <Column space={8}>
      <Form.Item name="phone" label="Số điện thoại" required>
        <Form.Input
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </Form.Item>
      <Column space={2}>
        <Button onPress={formik.submitForm}>TIẾP TỤC</Button>
        <Button appearance="outline" onPress={navigation.goBack}>
          QUAY VỀ ĐĂNG NHẬP
        </Button>
      </Column>
    </Column>
  )

  return (
    <Container>
      <Header />
      <Content contentContainerStyle={tw.p4}>
        <Column space={4} style={[tw.pB10, tw.itemsCenter]}>
          <Text category="h2">Đăng nhập SMS</Text>
          <View style={tw.w3_4}>
            <Text category="p2" style={tw.textCenter}>
              Vui lòng nhập số điện thoại để nhận mã xác thực được gửi đến.
            </Text>
          </View>
        </Column>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          component={renderForm}
          validationSchema={loginSmsSchema}
        />
      </Content>
    </Container>
  )
})
