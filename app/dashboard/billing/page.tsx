'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useBillingStats } from '@/hooks/useBillingStats'
import { usePatients } from '@/hooks/usePatients'
import { Plus, Search, IndianRupee, CheckCircle2, MoreHorizontal, AlertCircle, Loader } from 'lucide-react'
import { BillingStatus } from '@/lib/types'

export default function BillingPage() {
  const { invoices, stats, isLoading, isError, error, createInvoice, markPaid } = useBillingStats()
  const { patients } = usePatients()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    patient: '',
    amount: 0,
    description: '',
    due_date: '',
  })

  const getPatientName = (patient: unknown, fallbackName?: string) => {
    if (fallbackName) return fallbackName
    if (patient && typeof patient === 'object' && 'first_name' in patient && 'last_name' in patient) {
      const p = patient as { first_name?: string; last_name?: string; id?: number }
      const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim()
      return fullName || `Patient #${p.id ?? 'N/A'}`
    }
    return `Patient #${patient as number}`
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const patientName = getPatientName(invoice.patient, invoice.patient_name).toLowerCase()
    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateInvoice = useCallback(async () => {
    if (!newInvoice.patient || !newInvoice.amount || !newInvoice.description) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      await createInvoice({
        patient_id: parseInt(newInvoice.patient, 10),
        amount: newInvoice.amount,
        description: newInvoice.description,
        due_date: newInvoice.due_date,
        status: BillingStatus.PENDING,
      })
      setIsAddDialogOpen(false)
      setNewInvoice({
        patient: '',
        amount: 0,
        description: '',
        due_date: '',
      })
    } catch (err) {
      console.error('[v0] Error creating invoice:', err)
      alert('Failed to create invoice')
    } finally {
      setIsSubmitting(false)
    }
  }, [newInvoice, createInvoice])

  const handleMarkPaid = useCallback(
    async (id: number) => {
      try {
        await markPaid(id)
      } catch (err) {
        console.error('[v0] Error marking paid:', err)
        alert('Failed to mark invoice as paid')
      }
    },
    [markPaid]
  )

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Billing</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to load billing data'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const totalRevenue = stats.total_revenue || 0
  const paidRevenue = stats.total_paid || 0
  const pendingRevenue = stats.total_pending || 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Manage invoices and billing information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Create a new invoice for a patient</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newInvoice.patient}
                  onChange={(e) => setNewInvoice({ ...newInvoice, patient: e.target.value })}
                >
                  <option value="">Select a patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.first_name} {p.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Input
                  placeholder="e.g., Consultation, Lab Tests"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount (₹) *</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={newInvoice.amount || ''}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={newInvoice.due_date}
                  onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvoice} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Invoice'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold flex items-center gap-1">
                  <IndianRupee className="h-5 w-5" />
                  {totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Paid</p>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold flex items-center gap-1 text-green-600">
                  <IndianRupee className="h-5 w-5" />
                  {paidRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pending</p>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold flex items-center gap-1 text-orange-600">
                  <IndianRupee className="h-5 w-5" />
                  {pendingRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardDescription>
            <select
              className="px-3 py-2 border rounded-md text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value={BillingStatus.PENDING}>Pending</option>
              <option value={BillingStatus.PAID}>Paid</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">INV-{invoice.id}</TableCell>
                      <TableCell>{getPatientName(invoice.patient, invoice.patient_name)}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 font-medium">
                          <IndianRupee className="h-4 w-4" />
                          {invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.due_date || '-'}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            invoice.status === BillingStatus.PAID
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {invoice.status !== BillingStatus.PAID && (
                              <DropdownMenuItem onClick={() => handleMarkPaid(invoice.id)}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark as Paid
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No invoices found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
