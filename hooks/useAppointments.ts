'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import { Appointment, AppointmentStatus } from '@/lib/types'

type AppointmentListResponse = Appointment[] | { results?: Appointment[] }

function normalizeAppointments(data: AppointmentListResponse | undefined): Appointment[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export function useAppointments() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data, error, isLoading, mutate } = useSWR<AppointmentListResponse>(
    mounted && apiClient.getToken() ? 'appointments/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  )
  const appointments = normalizeAppointments(data)

  const createAppointment = useCallback(
    async (appointmentData: Partial<Appointment>) => {
      try {
        const response = await apiClient.post('appointments/', appointmentData)
        mutate((prev) => [...normalizeAppointments(prev), response], false)
        return response
      } catch (err) {
        console.error('[v0] Create appointment error:', err)
        throw err
      }
    },
    [mutate]
  )

  const getAppointment = useCallback(async (id: number) => {
    try {
      return await apiClient.get(`appointments/${id}/`)
    } catch (err) {
      console.error('[v0] Get appointment error:', err)
      throw err
    }
  }, [])

  const getTodayAppointments = useCallback(async () => {
    try {
      return await apiClient.get('appointments/today/')
    } catch (err) {
      console.error('[v0] Get today appointments error:', err)
      throw err
    }
  }, [])

  const getUpcomingAppointments = useCallback(async () => {
    try {
      return await apiClient.get('appointments/upcoming/')
    } catch (err) {
      console.error('[v0] Get upcoming appointments error:', err)
      throw err
    }
  }, [])

  const markCompleted = useCallback(
    async (id: number) => {
      try {
        const response = await apiClient.post(`appointments/${id}/mark_completed/`, {})
        mutate((prev) => normalizeAppointments(prev).map((a) => (a.id === id ? { ...a, status: AppointmentStatus.COMPLETED } : a)), false)
        return response
      } catch (err) {
        console.error('[v0] Mark completed error:', err)
        throw err
      }
    },
    [mutate]
  )

  const cancelAppointment = useCallback(
    async (id: number) => {
      try {
        const response = await apiClient.post(`appointments/${id}/cancel/`, {})
        mutate((prev) => normalizeAppointments(prev).map((a) => (a.id === id ? { ...a, status: AppointmentStatus.CANCELLED } : a)), false)
        return response
      } catch (err) {
        console.error('[v0] Cancel appointment error:', err)
        throw err
      }
    },
    [mutate]
  )

  const updateAppointment = useCallback(
    async (id: number, appointmentData: Partial<Appointment>) => {
      try {
        const response = await apiClient.patch(`appointments/${id}/`, appointmentData)
        mutate((prev) => normalizeAppointments(prev).map((a) => (a.id === id ? response : a)), false)
        return response
      } catch (err) {
        console.error('[v0] Update appointment error:', err)
        throw err
      }
    },
    [mutate]
  )

  return {
    appointments,
    isLoading,
    isError: !!error,
    error,
    createAppointment,
    getAppointment,
    getTodayAppointments,
    getUpcomingAppointments,
    markCompleted,
    cancelAppointment,
    updateAppointment,
    mutate,
  }
}
