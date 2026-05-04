'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import { DoctorUser } from '@/lib/types'

export function useAuth() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hasToken = mounted ? !!apiClient.getToken() : false

  const { data: user, error, isLoading, mutate } = useSWR<DoctorUser>(
    mounted && hasToken ? 'auth/profile/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  )

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await apiClient.post('token/', { username, password })
        apiClient.setToken(response.access)
        if (typeof window !== 'undefined') {
          localStorage.setItem('refresh_token', response.refresh)
        }
        mutate()
        return response
      } catch (err) {
        console.error('[v0] Login error:', err)
        throw err
      }
    },
    [mutate]
  )

  const logout = useCallback(() => {
    apiClient.clearToken()
    mutate(undefined, false)
  }, [mutate])

  const updateProfile = useCallback(
    async (profileData: Partial<DoctorUser>) => {
      try {
        const response = await apiClient.patch('auth/update_profile/', profileData)
        mutate(response, false)
        return response
      } catch (err) {
        console.error('[v0] Update profile error:', err)
        throw err
      }
    },
    [mutate]
  )

  const register = useCallback(
    async (userData: {
      username: string
      email: string
      password: string
      first_name: string
      last_name: string
      phone: string
      specialization: string
    }) => {
      try {
        const response = await apiClient.post('auth/register/', userData)
        apiClient.setToken(response.access)
        if (typeof window !== 'undefined') {
          localStorage.setItem('refresh_token', response.refresh)
        }
        mutate()
        return response
      } catch (err) {
        console.error('[v0] Registration error:', err)
        throw err
      }
    },
    [mutate]
  )

  return {
    user,
    isLoading: !mounted || (hasToken && isLoading),
    isError: !!error,
    error,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    hasToken,
  }
}
