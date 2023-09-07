/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "app/config"
import { API } from "app/constants"
import { RootStore } from "app/models"
import { Toast, LoadingService } from "app/components"
import type { ApiConfig } from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig
  requestsCount: number

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.requestsCount = 0
  }

  setToken(token: string) {
    this.apisauce.setHeader("Authorization", token ? `Bearer ${token}` : "")
  }

  setupInterceptor(_rootStore: RootStore) {
    this.apisauce.axiosInstance.interceptors.request.use(
      async (config) => {
        this.requestsCount++
        return config
      },
      (error) => {
        this.requestsCount--
        return Promise.reject(error)
      },
    )

    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => {
        this.requestsCount--
        this.updateActivityLoading()

        return response
      },
      async (error) => {
        this.requestsCount--
        this.updateActivityLoading()

        let errorText = "Lỗi xảy ra, vui lòng kiểm tra hoặc liên hệ quản trị viên"
        if (error.response && error.response.status === 401 && !error.config._retry) {
          const { refreshtoken } = _rootStore.authStore
          error.config._retry = true
          const newToken = await this.fetchRefreshToken(refreshtoken)
          if (newToken && newToken.token) {
            error.config.headers["Authorization"] = `Bearer ${newToken.token}`
            _rootStore.authStore.setToken(newToken.token, newToken.refreshtoken)
            return this.apisauce.axiosInstance.request(error.config)
          } else {
            errorText = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại"
            _rootStore.authStore.logout()
          }
        }
        if (error.response && error.response.data && error.response.data.message) {
          errorText = error.response.data.message
        }
        Toast.showText(errorText)

        return Promise.reject(error)
      },
    )
  }

  updateActivityLoading() {
    const isLoading = LoadingService.isLoading()
    if (isLoading && this.requestsCount <= 0) {
      LoadingService.hide()
    }
  }

  async fetchRefreshToken(token: string): Promise<{ token: string; refreshtoken: string } | null> {
    try {
      const response = await fetch(`${this.config.url}${API.REFRESH_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      return null
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
