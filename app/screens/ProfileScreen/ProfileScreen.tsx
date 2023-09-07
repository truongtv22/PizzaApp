import React, { FC, useRef } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { View } from "react-native"
import { Icon, Text, Button, ListItem, Layout } from "@ui-kitten/components"

import { useStores } from "app/models"
import makeStyles from "app/utils/makeStyles"
import { getFullname, getShortname } from "app/utils/userHelper"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { Modal, ModalRef, Column, Avatar, Content, Container } from "app/components"

const useStyles = makeStyles({
  icon: {
    width: 22,
    height: 22,
    tintColor: "text-basic-color",
  },
})

interface ProfileScreenProps extends AppStackScreenProps<AppRoute.PROFILE> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen({
  navigation,
}) {
  const styles = useStyles()

  const {
    authStore,
    userStore: { user },
  } = useStores()

  const modalRef = useRef<ModalRef>()

  const confirmLogout = () => {
    modalRef.current?.show()
  }

  const cancelLogout = () => {
    modalRef.current?.hide()
  }

  const onLogoutPress = () => {
    modalRef.current?.hide()
    setTimeout(() => {
      authStore.logout()
      navigation.navigate(AppRoute.HOME)
    }, 200)
  }

  return (
    <Container>
      <Content contentContainerStyle={tw.p4}>
        <Column space={1} style={[tw.flex1, tw.itemsCenter, tw.justifyCenter]}>
          <Avatar
            style={[tw.w32, tw.h32]}
            icon={{ pack: "feather", name: "user" }}
            title={getShortname(user)}
            status="primary"
          />
          <Text category="h5">{getFullname(user)}</Text>
          <Text category="p1" style={tw.fontSemibold}>
            {user.email}
          </Text>
        </Column>
        <View style={tw.pY4}>
          <ListItem
            title="Chỉnh sửa cá nhân"
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="edit-outline" color="" />}
            accessoryRight={() => <Icon name="arrow-ios-forward" style={styles.icon} color="" />}
            onPress={() => navigation.navigate(AppRoute.PROFILE_EDIT)}
          />
          <ListItem
            title="Cài đặt"
            style={tw.mT2}
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="settings-outline" color="" />}
            accessoryRight={() => <Icon name="arrow-ios-forward" style={styles.icon} color="" />}
            onPress={() => {}}
          />
          <ListItem
            title="Trung tâm hỗ trợ"
            style={tw.mT2}
            accessoryLeft={(iconProps) => (
              <Icon {...iconProps} name="question-mark-circle-outline" color="" />
            )}
            accessoryRight={() => <Icon name="arrow-ios-forward" style={styles.icon} color="" />}
            onPress={() => {}}
          />
          <ListItem
            title="Thông tin ứng dụng"
            style={tw.mT2}
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="info-outline" color="" />}
            accessoryRight={() => <Icon name="arrow-ios-forward" style={styles.icon} color="" />}
            onPress={() => {}}
          />
          <ListItem
            title="Đăng xuất"
            style={tw.mT2}
            accessoryLeft={(iconProps) => <Icon {...iconProps} name="log-out-outline" color="" />}
            accessoryRight={() => <Icon name="arrow-ios-forward" style={styles.icon} color="" />}
            onPress={confirmLogout}
          />
        </View>
      </Content>
      <Modal ref={modalRef} style={tw.wAuto} dismissEnabled={false}>
        <Layout style={[tw.p6, tw.rounded]}>
          <View style={tw.itemsCenter}>
            <Avatar icon={{ name: "log-out" }} style={[tw.w20, tw.h20]} status="primary" />
          </View>
          <View style={[tw.pY6, tw.itemsCenter]}>
            <Text category="h4">Đăng xuất</Text>
            <View style={tw.h1} />
            <Text appearance="hint">Bạn có chắc chắn muốn đăng xuất?</Text>
          </View>
          <View style={[tw.flexRow, tw.justifyBetween]}>
            <Button style={tw.w32} status="basic" appearance="outline" onPress={cancelLogout}>
              Hủy bỏ
            </Button>
            <View style={tw.w4} />
            <Button status="danger" style={tw.w32} onPress={onLogoutPress}>
              Đăng xuất
            </Button>
          </View>
        </Layout>
      </Modal>
    </Container>
  )
})
