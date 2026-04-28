'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';

export interface DashboardStats {
  total_patients: number;
  today_appointments: number;
  upcoming_appointments: number;
  pending_invoices: number;
  total_revenue: string;
}

interface DashboardSummaryApiResponse {
  patients: {
    total: number;
    new_last_30_days: number;
  };
  appointments: {
    today_scheduled: number;
    upcoming_next_7_days: number;
    completed_total: number;
    cancelled_total: number;
  };
  billing: {
    pending_amount: string | number;
    overdue_amount: string | number;
    paid_amount: string | number;
    pending_count: number;
  };
  medical_records: {
    total: number;
    created_last_30_days: number;
  };
}

export function useDashboardStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, error, isLoading, mutate } = useSWR<DashboardStats>(
    mounted && apiClient.getToken() ? 'summary/' : null,
    async (url) => {
      const response = await apiClient.get(url) as DashboardSummaryApiResponse;
      return {
        total_patients: response.patients?.total ?? 0,
        today_appointments: response.appointments?.today_scheduled ?? 0,
        upcoming_appointments: response.appointments?.upcoming_next_7_days ?? 0,
        pending_invoices: response.billing?.pending_count ?? 0,
        total_revenue: String(response.billing?.paid_amount ?? '0'),
      };
    },
    { revalidateOnFocus: false, refreshInterval: 30000 }
  );

  return {
    stats: data ?? {
      total_patients: 0,
      today_appointments: 0,
      upcoming_appointments: 0,
      pending_invoices: 0,
      total_revenue: '0',
    },
    isLoading,
    error,
    mutate,
  };
}