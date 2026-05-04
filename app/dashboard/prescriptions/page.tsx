'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, Pill, MoreHorizontal, AlertCircle, Loader, Trash2, Edit } from 'lucide-react'
import { Prescription } from '@/lib/types'

export default function PrescriptionsPage() {
  const { prescriptions, isLoading, isError, error, createPrescription, deletePrescription, updatePrescription } = usePrescriptions()
  const { patients } = usePatients()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState('')
  const [medicationText, setMedicationText] = useState('')
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null)
  const [editMedicationText, setEditMedicationText] = useState('')

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patientName = (prescription.patient_name || '').toLowerCase()
    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      prescription.medication_name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleCreatePrescription = useCallback(async () => {
    if (!selectedPatient) {
      toast({
        title: "Validation Error",
        description: "Please select a patient",
        variant: "destructive",
      })
      return
    }

    if (!medicationText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter medicine details",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createPrescription({
        patient: parseInt(selectedPatient, 10),
        medication_name: medicationText.trim(),
      })
      setIsAddDialogOpen(false)
      setSelectedPatient('')
      setMedicationText('')
      toast({
        title: "Success",
        description: "Prescription created successfully",
        variant: "default",
      })
    } catch (err) {
      console.error('[v0] Error creating prescription:', err)
      toast({
        title: "Error",
        description: "Failed to create prescription",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedPatient, medicationText, createPrescription, toast])

  const handleEditPrescription = (prescription: Prescription) => {
    setEditingPrescription(prescription)
    setEditMedicationText(prescription.medication_name)
    setIsEditDialogOpen(true)
  }

  const handleSaveEditPrescription = async () => {
    if (!editingPrescription || !editMedicationText.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter medicine details",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await updatePrescription(editingPrescription.id, {
        medication_name: editMedicationText.trim(),
      })
      setIsEditDialogOpen(false)
      setEditingPrescription(null)
      setEditMedicationText('')
      toast({
        title: "Success",
        description: "Prescription updated successfully",
        variant: "default",
      })
    } catch (err) {
      console.error('[v0] Error updating prescription:', err)
      toast({
        title: "Error",
        description: "Failed to update prescription",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>Select a patient and enter medicines in one text box</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
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
                <label className="text-sm font-medium">Medicine Name *</label>
                <Textarea
                  placeholder={`Enter one or more medicines.\nExample:\nParacetamol 500mg\nAmoxicillin 250mg`}
                  className="min-h-40 mt-2"
                  value={medicationText}
                  onChange={(e) => setMedicationText(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Add each medicine on a new line.
                </p>
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
                  'Create Prescriptions'
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
                    <TableHead>Medicines</TableHead>
                    <TableHead>Prescribed Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">{prescription.patient_name}</TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <Pill className="h-4 w-4 text-muted-foreground mt-1" />
                          <p className="whitespace-pre-line">{prescription.medication_name}</p>
                        </div>
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
                            <DropdownMenuItem onClick={() => handleEditPrescription(prescription)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
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

      {/* Edit Prescription Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prescription</DialogTitle>
            <DialogDescription>Update the medicines text for this prescription</DialogDescription>
          </DialogHeader>
          {editingPrescription && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Medicine Name *</label>
                <Textarea
                  placeholder="Enter one or more medicines"
                  className="min-h-40 mt-2"
                  value={editMedicationText}
                  onChange={(e) => setEditMedicationText(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditPrescription} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
