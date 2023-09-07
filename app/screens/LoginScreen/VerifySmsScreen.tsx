import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import * as Yup from "yup"
import "yup-phone-lite"
import { tw, color } from "react-native-tailwindcss"
import { TouchableOpacity, View } from "react-native"
import { Text, Button } from "@ui-kitten/components"
import OTPTextInput from "react-native-otp-textinput"

import { Column, Row, CountDown, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"

interface VerifySmsScreenProps extends AppStackScreenProps<AppRoute.VERIFY_SMS> {}

export const VerifySmsScreen: FC<VerifySmsScreenProps> = observer(function VerifySmsScreen({
  navigation,
}) {
  return (
    <Container>
      <Header />
      <Content contentContainerStyle={tw.p4}>
        <Column space={16}>
          <Column space={4}>
            <Text category="h2" style={tw.textCenter}>
              Xác nhận mã OTP
            </Text>
            <Column>
              <Text category="p2" style={tw.textCenter}>
                Mã xác nhận OTP đã được gửi vào số điện thoại của bạn.
              </Text>
              <Text category="p2" style={tw.textCenter}>
                Vui lòng nhập mã xác nhận vào phía dưới
              </Text>
            </Column>
          </Column>
          <Column space={16}>
            <Column space={8} items="center">
              <OTPTextInput
                inputCount={6}
                tintColor={color.primary}
                keyboardType="numeric"
                textInputStyle={tw.w10}
                containerStyle={tw.justifyCenter}
              />
              <Row space={1}>
                <CountDown formatText={(count) => `Còn ${count}s.`} />
                <TouchableOpacity onPress={() => {}}>
                  <Text status="primary">GỬI LẠI MÃ</Text>
                </TouchableOpacity>
              </Row>
            </Column>
            <Column space={2}>
              <Button onPress={() => {}}>XÁC NHẬN</Button>
              <Button appearance="outline" onPress={navigation.goBack}>
                QUAY VỀ ĐĂNG NHẬP
              </Button>
            </Column>
          </Column>
        </Column>
      </Content>
    </Container>
  )
})
