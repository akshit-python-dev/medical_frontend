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
import { usePrescriptions } from '@/hooks/usePrescriptions'
import { usePatients } from '@/hooks/usePatients'
import { Plus, Search, Pill, MoreHorizontal, AlertCircle, Loader, Trash2 } from 'lucide-react'

export default function PrescriptionsPage() {
  const { prescriptions, isLoading, isError, error, createPrescription, deletePrescription } = usePrescriptions()
  const { patients } = usePatients()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    medication_name: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  })

  const getPatientDisplayName = (patient: unknown) => {
    if (patient && typeof patient === 'object' && 'first_name' in patient && 'last_name' in patient) {
      const p = patient as { first_name?: string; last_name?: string; id?: number }
      const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim()
      return fullName || `Patient #${p.id ?? 'N/A'}`
    }
    return `Patient #${patient as number}`
  }

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patientName = getPatientDisplayName(prescription.patient).toLowerCase()
    const instructions = (prescription.instructions || '').toLowerCase()
    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      prescription.medication_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructions.includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleCreatePrescription = useCallback(async () => {
    if (!newPrescription.patient || !newPrescription.medication_name || !newPrescription.dosage) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      await createPrescription({
        patient: parseInt(newPrescription.patient, 10),
        medication_name: newPrescription.medication_name,
        dosage: newPrescription.dosage,
        frequency: newPrescription.frequency,
        duration: newPrescription.duration,
        instructions: newPrescription.instructions,
      })
      setIsAddDialogOpen(false)
      setNewPrescription({
        patient: '',
        medication_name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      })
    } catch (err) {
      console.error('[v0] Error creating prescription:', err)
      alert('Failed to create prescription')
    } finally {
      setIsSubmitting(false)
    }
  }, [newPrescription, createPrescription])

  const handleDeletePrescription = useCallback(
    async (id: number) => {
      if (!confirm('Are you sure you want to delete this prescription?')) return

      try {
        await deletePrescription(id)
      } catch (err) {
        console.error('[v0] Error deleting prescription:', err)
        alert('Failed to delete prescription')
      }
    },
    [deletePrescription]
  )

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Prescriptions</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to load prescriptions'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">Manage patient medications and prescriptions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>Add a new medication prescription for a patient</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newPrescription.patient}
                  onChange={(e) => setNewPrescription({ ...newPrescription, patient: e.target.value })}
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
                <label className="text-sm font-medium">Medication Name *</label>
                {/* <Input
                  placeholder="e.g., Aspirin, Amoxicillin"
                  value={newPrescription.medication_name}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medication_name: e.target.value })}
                /> */}
                <textarea
                  placeholder="e.g., Aspirin, Amoxicillin"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={newPrescription.medication_name}
                  onChange={(e) => setNewPrescription({ ...newPrescription, medication_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Dosage *</label>
                <Input
                  placeholder="e.g., 500mg, 10ml"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Frequency</label>
                <Input
                  placeholder="e.g., Twice daily, Once at bedtime"
                  value={newPrescription.frequency}
                  onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  placeholder="e.g., 7 days, 1 month"
                  value={newPrescription.duration}
                  onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  placeholder="Additional instructions or warnings"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleCreatePrescription} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Prescription'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredPrescriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Instructions</TableHead>
                    <TableHead>Prescribed Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{getPatientDisplayName(prescription.patient)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-muted-foreground" />
                          {prescription.medication_name}
                        </div>
                      </TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.frequency}</TableCell>
                      <TableCell>{prescription.duration}</TableCell>
                      <TableCell className="max-w-[220px] truncate" title={prescription.instructions || ''}>
                        {prescription.instructions || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(prescription.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDeletePrescription(prescription.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
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
              <p className="text-muted-foreground">No prescriptions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
