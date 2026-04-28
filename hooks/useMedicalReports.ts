'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import { apiClient } from '@/lib/api-client'
import { MedicalReport, ReportType } from '@/lib/types'

type MedicalReportListResponse = MedicalReport[] | { results?: MedicalReport[] }

function normalizeMedicalReports(data: MedicalReportListResponse | undefined): MedicalReport[] {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}

export function useMedicalReports(reportType?: ReportType) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const query = reportType ? `?type=${reportType}` : ''

  const { data, error, isLoading, mutate } = useSWR<MedicalReportListResponse>(
    mounted && apiClient.getToken() ? `medical-reports/${query}` : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  )
  const reports = normalizeMedicalReports(data)

  const uploadReport = useCallback(
    async (formData: FormData) => {
      try {
        const token = apiClient.getToken()
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medical-reports/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        mutate((prev) => [...normalizeMedicalReports(prev), data], false)
        return data
      } catch (err) {
        console.error('[v0] Upload report error:', err)
        throw err
      }
    },
    [mutate]
  )

  const getReport = useCallback(async (id: number) => {
    try {
      return await apiClient.get(`medical-reports/${id}/`)
    } catch (err) {
      console.error('[v0] Get report error:', err)
      throw err
    }
  }, [])

  const deleteReport = useCallback(
    async (id: number) => {
      try {
        await apiClient.delete(`medical-reports/${id}/`)
        mutate((prev) => normalizeMedicalReports(prev).filter((r) => r.id !== id), false)
      } catch (err) {
        console.error('[v0] Delete report error:', err)
        throw err
      }
    },
    [mutate]
  )

  return {
    reports,
    isLoading,
    isError: !!error,
    error,
    uploadReport,
    getReport,
    deleteReport,
    mutate,
  }
}
