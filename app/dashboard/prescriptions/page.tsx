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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { usePrescriptions } from '@/hooks/usePrescriptions'
import { usePatients } from '@/hooks/usePatients'
import { useToast } from '@/hooks/use-toast'
import { Plus, Search, Pill, MoreHorizontal, AlertCircle, Loader, Trash2, X, Edit, Download } from 'lucide-react'

export default function PrescriptionsPage() {
  const { prescriptions, isLoading, isError, error, createPrescription, deletePrescription, updatePrescription } = usePrescriptions()
  const { patients } = usePatients()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState('')
  const [editingPrescription, setEditingPrescription] = useState<any>(null)
  const [editFormData, setEditFormData] = useState<any>(null)
  const [medicines, setMedicines] = useState<Array<{
    medication_name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }>>([
    {
      medication_name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    }
  ])

  // const getPatientDisplayName = (patient: unknown) => {
  //   // if (patient && typeof patient === 'object' && 'first_name' in patient && 'last_name' in patient) {
  //   //   const p = patient as { first_name?: string; last_name?: string; id?: number }
  //   //   const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim()
  //   //   return fullName || `Patient #${p.id ?? 'N/A'}`
  //   // }
  //   if (patient && patient.patient_name){
  //     return patient.patient_name
  //   }
  //   return `Patient #${patient as number}`
  // }

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const patientName = prescription.patient_name.toLowerCase()
    const instructions = (prescription.instructions || '').toLowerCase()
    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      prescription.medication_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructions.includes(searchQuery.toLowerCase())
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

    const validMedicines = medicines.filter(m => m.medication_name && m.dosage)
    if (validMedicines.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one medication",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Create each medicine as a separate prescription
      for (const medicine of validMedicines) {
        await createPrescription({
          patient: parseInt(selectedPatient, 10),
          ...medicine,
        })
      }
      setIsAddDialogOpen(false)
      setSelectedPatient('')
      setMedicines([{
        medication_name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      }])
      toast({
        title: "Success",
        description: `${validMedicines.length} prescription(s) created successfully`,
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
  }, [selectedPatient, medicines, createPrescription, toast])

  const handleAddMedicine = () => {
    setMedicines([...medicines, {
      medication_name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    }])
  }

  const handleRemoveMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const handleUpdateMedicine = (index: number, field: string, value: string) => {
    const updatedMedicines = [...medicines]
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value }
    setMedicines(updatedMedicines)
  }

  const handleEditPrescription = (prescription: any) => {
    setEditingPrescription(prescription)
    setEditFormData({
      medication_name: prescription.medication_name,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      instructions: prescription.instructions,
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEditPrescription = async () => {
    if (!editFormData.medication_name || !editFormData.dosage) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await updatePrescription(editingPrescription.id, editFormData)
      setIsEditDialogOpen(false)
      setEditingPrescription(null)
      setEditFormData(null)
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
              <DialogDescription>Add multiple medications for a patient</DialogDescription>
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

              {/* Medications Accordion */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium">Medications *</label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMedicine}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </Button>
                </div>
                {medicines.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No medications added</p>
                ) : (
                  <Accordion type="single" collapsible className="w-full border rounded-lg">
                    {medicines.map((medicine, index) => (
                      <AccordionItem key={index} value={`medicine-${index}`} className="border-b last:border-b-0">
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="flex-1 hover:no-underline">
                            <div className="text-left">
                              <p className="font-medium">
                                {medicine.medication_name || `Medicine ${index + 1}`}
                              </p>
                              {medicine.dosage && (
                                <p className="text-xs text-muted-foreground">{medicine.dosage}</p>
                              )}
                            </div>
                          </AccordionTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveMedicine(index)
                            }}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <AccordionContent className="space-y-4 pt-4">
                          <div>
                            <label className="text-sm font-medium">Medication Name *</label>
                            <Input
                              placeholder="e.g., Aspirin, Amoxicillin"
                              value={medicine.medication_name}
                              onChange={(e) => handleUpdateMedicine(index, 'medication_name', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Dosage *</label>
                              <Input
                                placeholder="e.g., 500mg, 10ml"
                                value={medicine.dosage}
                                onChange={(e) => handleUpdateMedicine(index, 'dosage', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Frequency</label>
                              <Input
                                placeholder="e.g., Twice daily"
                                value={medicine.frequency}
                                onChange={(e) => handleUpdateMedicine(index, 'frequency', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Duration</label>
                              <Input
                                placeholder="e.g., 7 days"
                                value={medicine.duration}
                                onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Instructions</label>
                            <textarea
                              placeholder="Additional instructions or warnings"
                              className="w-full px-3 py-2 border rounded-md"
                              rows={2}
                              value={medicine.instructions}
                              onChange={(e) => handleUpdateMedicine(index, 'instructions', e.target.value)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
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
                      <TableCell className="font-medium">{prescription.patient_name}</TableCell>
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
            <DialogDescription>Update prescription details</DialogDescription>
          </DialogHeader>
          {editFormData && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Medication Name *</label>
                <Input
                  placeholder="e.g., Aspirin"
                  value={editFormData.medication_name}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      medication_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Dosage *</label>
                  <Input
                    placeholder="e.g., 500mg"
                    value={editFormData.dosage}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        dosage: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Input
                    placeholder="e.g., Twice daily"
                    value={editFormData.frequency}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        frequency: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Duration</label>
                <Input
                  placeholder="e.g., 7 days"
                  value={editFormData.duration}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      duration: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Instructions</label>
                <textarea
                  placeholder="Special instructions"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={editFormData.instructions}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      instructions: e.target.value,
                    })
                  }
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
