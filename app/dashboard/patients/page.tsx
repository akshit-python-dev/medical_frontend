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
import { usePatients } from '@/hooks/usePatients'
import { Plus, MoreHorizontal, Edit, Trash2, Eye, AlertCircle, Search, Loader } from 'lucide-react'
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"

export default function PatientsPage() {
  const { patients, isLoading, isError, error, createPatient, updatePatient, deletePatient } = usePatients()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPatient, setEditingPatient] = useState<any>(null)
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    father_name: '',
    gender: 'M',
    address: '',
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  )

  const handleAddPatient = useCallback(async () => {
    if (!newPatient.first_name || !newPatient.last_name || !newPatient.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createPatient(newPatient)
      setIsAddDialogOpen(false)
      setNewPatient({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        father_name: '',
        gender: 'M',
        address: '',
      })
      toast({
        title: "Success",
        description: "Patient created successfully",
        variant: "default",
      })
    } catch (err) {
      console.error('[v0] Error creating patient:', err)
      toast({
        title: "Error",
        description: "Failed to create patient",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [newPatient, createPatient, toast])

  const handleEditPatient = useCallback(
    async (patient: any) => {
      setEditingPatient(patient)
      setNewPatient({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        phone: patient.phone,
        date_of_birth: patient.date_of_birth || '',
        father_name: patient.father_name || '',
        gender: patient.gender,
        address: patient.address,
      })
      setIsEditDialogOpen(true)
    },
    []
  )

  const handleSaveEdit = useCallback(async () => {
    if (!newPatient.first_name || !newPatient.last_name || !newPatient.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      await updatePatient(editingPatient.id, newPatient)
      setIsEditDialogOpen(false)
      setEditingPatient(null)
      setNewPatient({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        father_name: '',
        gender: 'M',
        address: '',
      })
      toast({
        title: "Success",
        description: "Patient updated successfully",
        variant: "default",
      })
    } catch (err) {
      console.error('[v0] Error updating patient:', err)
      toast({
        title: "Error",
        description: "Failed to update patient",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [newPatient, editingPatient, updatePatient, toast])

  const handleDeletePatient = useCallback(
    async (id: number) => {
      if (!confirm('Are you sure you want to delete this patient?')) return

      try {
        await deletePatient(id)
        toast({
          title: "Success",
          description: "Patient deleted successfully",
          variant: "default",
        })
      } catch (err) {
        console.error('[v0] Error deleting patient:', err)
        toast({
          title: "Error",
          description: "Failed to delete patient",
          variant: "destructive",
        })
      }
    },
    [deletePatient, toast]
  )

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Patients</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to load patients'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage and view patient records</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Fill in the patient information below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">First Name *</label>
                <Input
                  placeholder="First name"
                  value={newPatient.first_name}
                  onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name *</label>
                <Input
                  placeholder="Last name"
                  value={newPatient.last_name}
                  onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="Phone number"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={newPatient.date_of_birth}
                  onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Father&apos;s Name</label>
                <Input
                  placeholder="Father's name"
                  value={newPatient.father_name}
                  onChange={(e) => setNewPatient({ ...newPatient, father_name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Gender</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  placeholder="Address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Patient'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update patient information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">First Name *</label>
              <Input
                placeholder="First name"
                value={newPatient.first_name}
                onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name *</label>
              <Input
                placeholder="Last name"
                value={newPatient.last_name}
                onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                placeholder="Phone number"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                value={newPatient.date_of_birth}
                onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Father&apos;s Name</label>
              <Input
                placeholder="Father's name"
                value={newPatient.father_name}
                onChange={(e) => setNewPatient({ ...newPatient, father_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="Address"
                value={newPatient.address}
                onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
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
          ) : filteredPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.first_name} {patient.last_name}
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/patients/${patient.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPatient(patient)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeletePatient(patient.id)}
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
              <p className="text-muted-foreground">No patients found. Create one to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
