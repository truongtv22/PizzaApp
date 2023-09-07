import { Instance, types } from "mobx-state-tree"
import * as authApi from "app/services/api/auth.api"
import { LoadingService } from "app/components"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybeNull(types.string),
    refreshtoken: types.maybeNull(types.string),
  })
  .volatile(() => ({
    persist: true,
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.token
    },
  }))
  .actions((self) => ({
    setToken: (token?: string, refreshtoken?: string) => {
      self.token = token
      self.refreshtoken = refreshtoken
    },
    logout: () => {
      self.token = null
      self.refreshtoken = null
    },
  }))
  .actions((self) => ({
    login: async (taikhoan: string, matkhau: string) => {
      LoadingService.show()
      const result = await authApi.login(taikhoan, matkhau)
      if (result.kind === "ok") {
        self.setToken(result.token, result.refreshtoken)
      }
    },
  }))
export interface AuthStore extends Instance<typeof AuthStoreModel> {}
