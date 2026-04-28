'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import { Prescription } from '@/lib/types'

type PrescriptionListResponse = Prescription[] | { results?: Prescription[] }

function normalizePrescriptions(data: PrescriptionListResponse | undefined): Prescription[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export function usePrescriptions() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data, error, isLoading, mutate } = useSWR<PrescriptionListResponse>(
    mounted && apiClient.getToken() ? 'prescriptions/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  )
  const prescriptions = normalizePrescriptions(data)

  const createPrescription = useCallback(
    async (prescriptionData: Partial<Prescription>) => {
      try {
        const response = await apiClient.post('prescriptions/', prescriptionData)
        mutate((prev) => [...normalizePrescriptions(prev), response], false)
        return response
      } catch (err) {
        console.error('[v0] Create prescription error:', err)
        throw err
      }
    },
    [mutate]
  )

  const getPrescription = useCallback(async (id: number) => {
    try {
      return await apiClient.get(`prescriptions/${id}/`)
    } catch (err) {
      console.error('[v0] Get prescription error:', err)
      throw err
    }
  }, [])

  const updatePrescription = useCallback(
    async (id: number, prescriptionData: Partial<Prescription>) => {
      try {
        const response = await apiClient.patch(`prescriptions/${id}/`, prescriptionData)
        mutate((prev) => normalizePrescriptions(prev).map((p) => (p.id === id ? response : p)), false)
        return response
      } catch (err) {
        console.error('[v0] Update prescription error:', err)
        throw err
      }
    },
    [mutate]
  )

  const deletePrescription = useCallback(
    async (id: number) => {
      try {
        await apiClient.delete(`prescriptions/${id}/`)
        mutate((prev) => normalizePrescriptions(prev).filter((p) => p.id !== id), false)
      } catch (err) {
        console.error('[v0] Delete prescription error:', err)
        throw err
      }
    },
    [mutate]
  )

  return {
    prescriptions,
    isLoading,
    isError: !!error,
    error,
    createPrescription,
    getPrescription,
    updatePrescription,
    deletePrescription,
    mutate,
  }
}
