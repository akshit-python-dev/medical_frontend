'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface ApiConfig {
  method?: string
  body?: any
  headers?: Record<string, string>
}

class ApiClient {
  private token: string | null = null
  private refreshPromise: Promise<boolean> | null = null

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token)
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token')
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  async request(endpoint: string, config: ApiConfig = {}) {
    const url = `${API_URL}/${endpoint}`
    const method = config.method || 'GET'

    const requestConfig: RequestInit = {
      method,
      headers: this.getHeaders(),
    }

    if (config.body) {
      requestConfig.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, requestConfig)

      if (response.status === 401) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          return this.request(endpoint, config)
        } else {
          this.clearToken()
          // throw new Error('Session expired')
        }
      }

      if (!response.ok) {
        let error = `API Error: ${response.status}`
        try {
          const errorData = await response.json()
          error = errorData.detail || JSON.stringify(errorData)
        } catch {
          error = await response.text()
        }
        throw new Error(error)
      }

      if (response.status === 204) {
        return null
      }

      return response.json()
    } catch (error) {
      console.error(`[v0] API Error (${endpoint}):`, error)
      throw error
    }
  }

  async refreshToken(): Promise<boolean> {
    if (typeof window === 'undefined') return false

    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) return false

    if (this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        })

        if (response.ok) {
          const data = await response.json()
          this.setToken(data.access)
          return true
        }
        return false
      } catch (error) {
        console.error('[v0] Token refresh failed', error)
        return false
      } finally {
        this.refreshPromise = null
      }
    })()

    try {
      return await this.refreshPromise
    } finally {
      this.refreshPromise = null
    }
  }

  get(endpoint: string, config?: ApiConfig) {
    return this.request(endpoint, { ...config, method: 'GET' })
  }

  post(endpoint: string, body: any, config?: ApiConfig) {
    return this.request(endpoint, { ...config, method: 'POST', body })
  }

  patch(endpoint: string, body: any, config?: ApiConfig) {
    return this.request(endpoint, { ...config, method: 'PATCH', body })
  }

  delete(endpoint: string, config?: ApiConfig) {
    return this.request(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
