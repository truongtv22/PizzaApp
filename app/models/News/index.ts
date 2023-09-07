import { Instance, types } from "mobx-state-tree"

export const NewsModel = types.model({
  _id: types.maybeNull(types.string),
  danhmuc_id: types.maybeNull(types.string),
  tieude: types.maybeNull(types.string),
  noidung: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
})
export interface News extends Instance<typeof NewsModel> {}

export const NewsCategoryModel = types.model({
  _id: types.maybeNull(types.string),
  tendanhmuc: types.maybeNull(types.string),
})
export interface NewsCategory extends Instance<typeof NewsCategoryModel> {}
