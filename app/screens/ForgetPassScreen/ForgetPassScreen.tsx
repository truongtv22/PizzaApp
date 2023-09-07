import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
import { tw } from "react-native-tailwindcss"
import { Formik, FormikProps } from "formik"
import { View } from "react-native"
import { Text, Button } from "@ui-kitten/components"

import { Form, Toast, Column, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"

interface ForgetPassValues {
  email: string
}

const forgetPassSchema = Yup.object({
  email: Yup.string()
    .label("Email")
    .required("${label} không được để trống")
    .email("${label} không đúng định dạng"),
})

interface ForgetPassScreenProps extends AppStackScreenProps<AppRoute.FORGET_PASS> {}

export const ForgetPassScreen: FC<ForgetPassScreenProps> = observer(function ForgetPassScreen({
  navigation,
}) {
  const initialValues: ForgetPassValues = {
    email: "",
  }

  const onFormSubmit = (values: ForgetPassValues) => {
    Toast.showText("Chức năng đang phát triển")
  }

  const renderForm = (formik: FormikProps<ForgetPassValues>) => (
    <Column space={8}>
      <Form.Item name="email" label="Email" required>
        <Form.Input placeholder="Nhập email" keyboardType="email-address" autoCapitalize="none" />
      </Form.Item>
      <Column space={2}>
        <Button onPress={formik.submitForm}>HOÀN THÀNH</Button>
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
          <Text category="h2">Khôi phục mật khẩu</Text>
          <View style={tw.w3_4}>
            <Text category="p2" style={tw.textCenter}>
              Vui lòng nhập địa chỉ email của bạn. Kiểm tra lại hộp thư email sau khi hoàn thành.
            </Text>
          </View>
        </Column>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          component={renderForm}
          validationSchema={forgetPassSchema}
        />
      </Content>
    </Container>
  )
})
