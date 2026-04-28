'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';
import { Billing } from '@/lib/types';

export interface BillingStats {
  total_revenue: string;
  total_pending: string;
  total_paid: string;
  pending_count: number;
  overdue_count: number;
  currency: string;
}

type BillingListResponse = Billing[] | { results?: Billing[] };

function normalizeBilling(data: BillingListResponse | undefined): Billing[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export function useBillingStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: summaryData,
    error: summaryError,
    isLoading: summaryLoading,
    mutate: mutateSummary,
  } = useSWR<BillingStats>(
    mounted && apiClient.getToken() ? 'billing/summary/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  );

  const {
    data: invoicesData,
    error: invoicesError,
    isLoading: invoicesLoading,
    mutate: mutateInvoices,
  } = useSWR<BillingListResponse>(
    mounted && apiClient.getToken() ? 'billing/' : null,
    (url) => apiClient.get(url),
    { revalidateOnFocus: false }
  );
  const invoices = normalizeBilling(invoicesData);

  const markAsPaid = async (invoiceId: number) => {
    const result = await apiClient.post(`billing/${invoiceId}/mark_paid/`, {});
    mutateSummary();
    mutateInvoices((prev) =>
      normalizeBilling(prev).map((invoice) =>
        invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice
      ),
      false
    );
    return result;
  };

  const createInvoice = async (invoiceData: Partial<Billing> & { patient_id?: number }) => {
    const result = await apiClient.post('billing/', invoiceData);
    mutateInvoices((prev) => [...normalizeBilling(prev), result], false);
    mutateSummary();
    return result;
  };

  return {
    invoices,
    stats: summaryData ?? {
      total_revenue: '0',
      total_pending: '0',
      total_paid: '0',
      pending_count: 0,
      overdue_count: 0,
      currency: 'INR',
    },
    isLoading: summaryLoading || invoicesLoading,
    isError: !!summaryError || !!invoicesError,
    error: summaryError || invoicesError,
    mutate: () => {
      mutateSummary();
      mutateInvoices();
    },
    createInvoice,
    markAsPaid,
    markPaid: markAsPaid,
  };
}