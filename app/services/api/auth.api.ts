import { ApiResponse } from "apisauce"
import { API } from "app/constants/api"
import { api } from "./api"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

type LoginData = { token: string; refreshtoken: string }

type LoginResult = ({ kind: "ok" } & LoginData) | GeneralApiProblem

export async function login(taikhoan: string, matkhau: string): Promise<LoginResult> {
  const response: ApiResponse<LoginData> = await api.apisauce.post(API.LOGIN, {
    taikhoan,
    matkhau,
  })
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  const { token, refreshtoken } = response.data
  return { kind: "ok", token, refreshtoken }
}
