'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import { Patient } from '@/lib/types'

type PatientListResponse = Patient[] | { results?: Patient[] }

function normalizePatients(data: PatientListResponse | undefined): Patient[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export function usePatients() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data, error, isLoading, mutate } = useSWR<PatientListResponse>(
    mounted && apiClient.getToken() ? 'patients/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  )
  const patients = normalizePatients(data)

  const createPatient = useCallback(
    async (patientData: Partial<Patient>) => {
      try {
        const response = await apiClient.post('patients/', patientData)
        mutate((prev) => [...normalizePatients(prev), response], false)
        return response
      } catch (err) {
        console.error('[v0] Create patient error:', err)
        throw err
      }
    },
    [mutate]
  )

  const getPatient = useCallback(async (id: number) => {
    try {
      return await apiClient.get(`patients/${id}/`)
    } catch (err) {
      console.error('[v0] Get patient error:', err)
      throw err
    }
  }, [])

  const updatePatient = useCallback(
    async (id: number, patientData: Partial<Patient>) => {
      try {
        const response = await apiClient.patch(`patients/${id}/`, patientData)
        mutate((prev) => normalizePatients(prev).map((p) => (p.id === id ? response : p)), false)
        return response
      } catch (err) {
        console.error('[v0] Update patient error:', err)
        throw err
      }
    },
    [mutate]
  )

  const deletePatient = useCallback(
    async (id: number) => {
      try {
        await apiClient.delete(`patients/${id}/`)
        mutate((prev) => normalizePatients(prev).filter((p) => p.id !== id), false)
      } catch (err) {
        console.error('[v0] Delete patient error:', err)
        throw err
      }
    },
    [mutate]
  )

  const getPatientMedicalHistory = useCallback(async (patientId: number) => {
    try {
      return await apiClient.get(`patients/${patientId}/medical_history/`)
    } catch (err) {
      console.error('[v0] Get medical history error:', err)
      throw err
    }
  }, [])

  const getUpcomingAppointments = useCallback(async (patientId: number) => {
    try {
      return await apiClient.get(`patients/${patientId}/upcoming_appointments/`)
    } catch (err) {
      console.error('[v0] Get upcoming appointments error:', err)
      throw err
    }
  }, [])

  const getBillingSummary = useCallback(async (patientId: number) => {
    try {
      return await apiClient.get(`patients/${patientId}/billing_summary/`)
    } catch (err) {
      console.error('[v0] Get billing summary error:', err)
      throw err
    }
  }, [])

  return {
    patients,
    isLoading,
    isError: !!error,
    error,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient,
    getPatientMedicalHistory,
    getUpcomingAppointments,
    getBillingSummary,
    mutate,
  }
}
