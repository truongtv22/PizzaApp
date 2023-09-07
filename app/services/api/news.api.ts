import { ApiResponse } from "apisauce"
import { API } from "app/constants/api"
import { formatString } from "app/utils/formatString"
import { News, NewsCategory } from "app/models/News"

import { api } from "./api"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { ApiListResponse } from "./api.types"

type NewsListResult = { kind: "ok"; data: News[] } | GeneralApiProblem
type NewsCategoryListResult = { kind: "ok"; data: NewsCategory[] } | GeneralApiProblem

export async function getLatestNews(): Promise<NewsListResult> {
  const response: ApiResponse<ApiListResponse<News>> = await api.apisauce.get(
    formatString(API.NEWS_QUERY, 1, 0),
  )
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  const { rows } = response.data
  return { kind: "ok", data: rows }
}

export async function getNewsCategory(): Promise<NewsCategoryListResult> {
  const response: ApiResponse<ApiListResponse<NewsCategory>> = await api.apisauce.get(
    formatString(API.NEWS_CATEGORY_QUERY, 1, 0),
  )
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  const { rows } = response.data
  return { kind: "ok", data: rows }
}

export async function getNewsByCategory(categoryId: string): Promise<NewsListResult> {
  const response: ApiResponse<ApiListResponse<News>> = await api.apisauce.get(
    formatString(API.NEWS_QUERY, 1, 0),
    { danhmuc_id: categoryId },
  )
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) return problem
  }

  const { rows } = response.data
  return { kind: "ok", data: rows }
}
