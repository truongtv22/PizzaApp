import { ApiResponse } from "apisauce"
import { API } from "app/constants/api"
import { User } from "app/models"
import { api } from "./api"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

type UserInfoResult = { kind: "ok"; user: User } | GeneralApiProblem

export async function getUserInfo(): Promise<UserInfoResult> {
  const response: ApiResponse<User> = await api.apisauce.get(API.USER_INFO)
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  const user = response.data
  return { kind: "ok", user }
}
