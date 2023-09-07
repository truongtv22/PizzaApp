import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "./AuthStore/AuthStore"
import { UserStoreModel } from "./UserStore/UserStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
