import { Instance, types } from "mobx-state-tree"
import * as userApi from "app/services/api/user.api"
import { LoadingService } from "app/components"

export const UserModel = types.model({
  _id: types.maybeNull(types.string),
  taikhoan: types.maybeNull(types.string),
  hoten: types.maybeNull(types.string),
  cccd: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  dienthoai: types.maybeNull(types.string),
  ngaysinh: types.maybeNull(types.string),
  gioitinh: types.maybeNull(types.number), // 1: Nam, 2: Nữ, 3: Khác
  diachi: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
})
export interface User extends Instance<typeof UserModel> {}

export const UserStoreModel = types
  .model("UserStore")
  .props({ user: types.optional(UserModel, {}) })
  .actions((self) => ({
    setUser: (user: User) => {
      self.user = user
    },
  }))
  .actions((self) => ({
    getUserInfo: async () => {
      LoadingService.show()
      const result = await userApi.getUserInfo()
      if (result.kind === "ok") {
        self.setUser(result.user)
      }
    },
  }))
