import { User } from "app/models"

/**
 *
 * @param {object} user
 * @param {string} user.hoten
 */
export function getFullname(user: User) {
  return user.hoten || ""
}

/**
 *
 * @param {object} user
 * @param {string} user.hoten
 */
export function getShortname(user: User) {
  const fullname = getFullname(user)
  return convertShortname(fullname)
}

/**
 *
 * @param {string} name
 */
const convertShortname = (name: string) => {
  name = name.toUpperCase()
  const array = name.split(" ")
  if (name.length === 2 || array.length === 1) return name[0]
  const res = array[array.length - 2].charAt(0) + array[array.length - 1].charAt(0)
  return res
}
