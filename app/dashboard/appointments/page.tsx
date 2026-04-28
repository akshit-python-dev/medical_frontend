'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { useAppointments } from '@/hooks/useAppointments'
import { usePatients } from '@/hooks/usePatients'
import { Plus, Search, Calendar, Clock, CheckCircle2, XCircle, MoreHorizontal, AlertCircle, Loader } from 'lucide-react'
import { AppointmentStatus } from '@/lib/types'

export default function AppointmentsPage() {
  const { appointments, isLoading, isError, error, createAppointment, markCompleted, cancelAppointment } = useAppointments()
  const { patients } = usePatients()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('scheduled')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    appointment_date: '',
    appointment_time: '09:00',
    reason: '',
    notes: '',
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

  const filteredAppointments = appointments
    .filter((apt) => {
      const patientName = getPatientName(apt.patient, apt.patient_name).toLowerCase()
      const matchesSearch =
        patientName.includes(searchQuery.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTab = activeTab === 'all' || apt.status === activeTab
      return matchesSearch && matchesTab
    })
    .sort((a, b) => new Date(b.appointment_date).getTime() - new Date(a.appointment_date).getTime())

  const handleAddAppointment = useCallback(async () => {
    if (!newAppointment.patient || !newAppointment.appointment_date || !newAppointment.reason) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    try {
      await createAppointment({
        patient_id: parseInt(newAppointment.patient, 10),
        appointment_date: newAppointment.appointment_date,
        appointment_time: newAppointment.appointment_time,
        reason: newAppointment.reason,
        notes: newAppointment.notes,
        status: AppointmentStatus.SCHEDULED,
      })
      setIsAddDialogOpen(false)
      setNewAppointment({
        patient: '',
        appointment_date: '',
        appointment_time: '09:00',
        reason: '',
        notes: '',
      })
    } catch (err) {
      console.error('[v0] Error creating appointment:', err)
      alert('Failed to create appointment')
    } finally {
      setIsSubmitting(false)
    }
  }, [newAppointment, createAppointment])

  const handleMarkCompleted = useCallback(
    async (id: number) => {
      try {
        await markCompleted(id)
      } catch (err) {
        console.error('[v0] Error marking completed:', err)
        alert('Failed to mark appointment as completed')
      }
    },
    [markCompleted]
  )

  const handleCancelAppointment = useCallback(
    async (id: number) => {
      if (!confirm('Are you sure you want to cancel this appointment?')) return

      try {
        await cancelAppointment(id)
      } catch (err) {
        console.error('[v0] Error cancelling appointment:', err)
        alert('Failed to cancel appointment')
      }
    },
    [cancelAppointment]
  )

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to load appointments'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Create a new appointment for a patient</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Patient *</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAppointment.patient}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
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
                <label className="text-sm font-medium">Date *</label>
                <Input
                  type="date"
                  value={newAppointment.appointment_date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={newAppointment.appointment_time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, appointment_time: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reason *</label>
                <Input
                  placeholder="e.g., Consultation, Follow-up"
                  value={newAppointment.reason}
                  onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  placeholder="Additional notes"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddAppointment} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  'Schedule'
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
                placeholder="Search appointments..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="scheduled">
                <Calendar className="h-4 w-4 mr-2" />
                Scheduled
              </TabsTrigger>
              <TabsTrigger value="completed">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                <XCircle className="h-4 w-4 mr-2" />
                Cancelled
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>

            {['scheduled', 'completed', 'cancelled', 'all'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : filteredAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.map((apt) => (
                          <TableRow key={apt.id}>
                            <TableCell className="font-medium">{getPatientName(apt.patient, apt.patient_name)}</TableCell>
                            <TableCell>{apt.appointment_date}</TableCell>
                            <TableCell>{apt.appointment_time}</TableCell>
                            <TableCell>{apt.reason}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  apt.status === AppointmentStatus.SCHEDULED
                                    ? 'bg-blue-100 text-blue-800'
                                    : apt.status === AppointmentStatus.COMPLETED
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {apt.status}
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
                                  {apt.status === AppointmentStatus.SCHEDULED && (
                                    <DropdownMenuItem onClick={() => handleMarkCompleted(apt.id)}>
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      Mark Completed
                                    </DropdownMenuItem>
                                  )}
                                  {apt.status !== AppointmentStatus.CANCELLED && (
                                    <DropdownMenuItem
                                      onClick={() => handleCancelAppointment(apt.id)}
                                      className="text-destructive"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Cancel
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
                    <p className="text-muted-foreground">No appointments found</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
