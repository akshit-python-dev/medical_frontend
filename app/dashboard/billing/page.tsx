'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
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
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, IndianRupee, CheckCircle2, MoreHorizontal, AlertCircle, Loader, Trash2, Edit } from 'lucide-react'
import { Billing, BillingItem, BillingStatus } from '@/lib/types'

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

export default function BillingPage() {
  const { invoices, stats, isLoading, isError, error, createInvoice, updateInvoice, markPaid } = useBillingStats()
  const { patients } = usePatients()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Billing | null>(null)
  const [newInvoice, setNewInvoice] = useState({
    patient: '',
    due_date: getTodayDate(),
  })
  const [editInvoice, setEditInvoice] = useState({
    patient: '',
    due_date: getTodayDate(),
  })
  const [invoiceItems, setInvoiceItems] = useState<BillingItem[]>([
    { medicine_name: '', amount: '' },
  ])
  const [editInvoiceItems, setEditInvoiceItems] = useState<BillingItem[]>([
    { medicine_name: '', amount: '' },
  ])

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
    const medicineNames = (invoice.items || []).map((item) => item.medicine_name.toLowerCase()).join(' ')
    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicineNames.includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAmount = invoiceItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
  const editTotalAmount = editInvoiceItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)

  const handleCreateInvoice = useCallback(async () => {
    const validItems = invoiceItems.filter(
      (item) => item.medicine_name.trim() && Number(item.amount) > 0
    )

    if (!newInvoice.patient || !newInvoice.due_date || validItems.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Select a patient, due date, and at least one medicine with price',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createInvoice({
        patient_id: parseInt(newInvoice.patient, 10),
        due_date: newInvoice.due_date,
        status: BillingStatus.PENDING,
        items: validItems,
      })
      setIsAddDialogOpen(false)
      setNewInvoice({
        patient: '',
        due_date: getTodayDate(),
      })
      setInvoiceItems([{ medicine_name: '', amount: '' }])
      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      })
    } catch (err) {
      console.error('[v0] Error creating invoice:', err)
      toast({
        title: 'Error',
        description: 'Failed to create invoice',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [newInvoice, invoiceItems, createInvoice, toast])

  const handleMarkPaid = useCallback(
    async (id: number) => {
      try {
        await markPaid(id)
        toast({
          title: 'Success',
          description: 'Invoice marked as paid',
        })
      } catch (err) {
        console.error('[v0] Error marking paid:', err)
        toast({
          title: 'Error',
          description: 'Failed to mark invoice as paid',
          variant: 'destructive',
        })
      }
    },
    [markPaid, toast]
  )

  const handleAddMedicine = () => {
    setInvoiceItems((prev) => [...prev, { medicine_name: '', amount: '' }])
  }

  const handleRemoveMedicine = (index: number) => {
    setInvoiceItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleUpdateMedicine = (index: number, field: keyof BillingItem, value: string) => {
    setInvoiceItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    )
  }

  const handleEditAddMedicine = () => {
    setEditInvoiceItems((prev) => [...prev, { medicine_name: '', amount: '' }])
  }

  const handleEditRemoveMedicine = (index: number) => {
    setEditInvoiceItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleEditUpdateMedicine = (index: number, field: keyof BillingItem, value: string) => {
    setEditInvoiceItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    )
  }

  const handleEditInvoice = (invoice: Billing) => {
    setEditingInvoice(invoice)
    setEditInvoice({
      patient:
        typeof invoice.patient === 'object' && invoice.patient !== null
          ? String(invoice.patient.id)
          : String(invoice.patient),
      due_date: invoice.due_date || getTodayDate(),
    })
    setEditInvoiceItems(
      invoice.items && invoice.items.length > 0
        ? invoice.items.map((item) => ({
            id: item.id,
            medicine_name: item.medicine_name,
            amount: item.amount,
          }))
        : [{ medicine_name: invoice.description || '', amount: invoice.amount }]
    )
    setIsEditDialogOpen(true)
  }

  const handleSaveInvoice = useCallback(async () => {
    if (!editingInvoice) return

    const validItems = editInvoiceItems.filter(
      (item) => item.medicine_name.trim() && Number(item.amount) > 0
    )

    if (!editInvoice.patient || !editInvoice.due_date || validItems.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Select a patient, due date, and at least one medicine with price',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await updateInvoice(editingInvoice.id, {
        patient_id: parseInt(editInvoice.patient, 10),
        due_date: editInvoice.due_date,
        items: validItems,
      })
      setIsEditDialogOpen(false)
      setEditingInvoice(null)
      setEditInvoice({
        patient: '',
        due_date: getTodayDate(),
      })
      setEditInvoiceItems([{ medicine_name: '', amount: '' }])
      toast({
        title: 'Success',
        description: 'Invoice updated successfully',
      })
    } catch (err) {
      console.error('[v0] Error updating invoice:', err)
      toast({
        title: 'Error',
        description: 'Failed to update invoice',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [editingInvoice, editInvoice, editInvoiceItems, toast, updateInvoice])

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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Medicines *</label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedicine}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Medicine
                  </Button>
                </div>
                {invoiceItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-[1fr_140px_auto] gap-3 items-end">
                    <div>
                      <label className="text-sm font-medium">Medicine Name</label>
                      <Input
                        placeholder="e.g., Paracetamol"
                        value={item.medicine_name}
                        onChange={(e) => handleUpdateMedicine(index, 'medicine_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.amount}
                        onChange={(e) => handleUpdateMedicine(index, 'amount', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveMedicine(index)}
                      disabled={invoiceItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                  Total Amount: Rs. {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
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
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Invoice</DialogTitle>
              <DialogDescription>Update patient, due date, and bill items</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={editInvoice.patient}
                  onChange={(e) => setEditInvoice({ ...editInvoice, patient: e.target.value })}
                >
                  <option value="">Select a patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.first_name} {p.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Medicines *</label>
                  <Button type="button" variant="outline" size="sm" onClick={handleEditAddMedicine}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add More Medicine
                  </Button>
                </div>
                {editInvoiceItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-[1fr_140px_auto] gap-3 items-end">
                    <div>
                      <label className="text-sm font-medium">Medicine Name</label>
                      <Input
                        placeholder="e.g., Paracetamol"
                        value={item.medicine_name}
                        onChange={(e) => handleEditUpdateMedicine(index, 'medicine_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Price (₹)</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={item.amount}
                        onChange={(e) => handleEditUpdateMedicine(index, 'amount', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditRemoveMedicine(index)}
                      disabled={editInvoiceItems.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
                  Total Amount: Rs. {editTotalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={editInvoice.due_date}
                  onChange={(e) => setEditInvoice({ ...editInvoice, due_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSaveInvoice} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Invoice'
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
                    <TableHead>Medicines</TableHead>
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
                      <TableCell>
                        {invoice.items && invoice.items.length > 0 ? (
                          <div className="space-y-1">
                            {invoice.items.map((item, index) => (
                              <div key={`${invoice.id}-${index}`} className="text-sm">
                                {item.medicine_name}
                              </div>
                            ))}
                          </div>
                        ) : (
                          invoice.description
                        )}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditInvoice(invoice)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Invoice
                            </DropdownMenuItem>
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
