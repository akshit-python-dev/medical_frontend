"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePatients } from "@/hooks/usePatients"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api-client"
import { generatePatientPDF } from "@/lib/pdf-generator"
import { generatePrescriptionPDF } from "@/lib/prescription-pdf-generator"
import { generateSinglePrescriptionPDF } from "@/lib/single-prescription-pdf"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Activity,
  Edit,
  Download,
  Loader,
} from "lucide-react"

interface PatientProfilePageProps {
  params: Promise<{ id: string }>
}

export default function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { toast } = useToast()
  const { id } = use(params)
  const patientId = parseInt(id, 10)
  const [patient, setPatient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [isEditPrescriptionOpen, setIsEditPrescriptionOpen] = useState(false)
  const [editingPrescription, setEditingPrescription] = useState<any>(null)
  const [prescriptionFormData, setPrescriptionFormData] = useState<any>(null)
  const [isSavingPrescription, setIsSavingPrescription] = useState(false)
  const [downloadFromDate, setDownloadFromDate] = useState<string>('')
  const [downloadToDate, setDownloadToDate] = useState<string>('')
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false)

  const { getPatient, updatePatient } = usePatients()

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true)
        
        // Fetch patient detail (returns PatientDetailSerializer with nested data)
        const patientData = await getPatient(patientId)
        if (!patientData) {
          notFound()
        }
        setPatient(patientData)

      } catch (err) {
        console.error("[v0] Error fetching patient:", err)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [patientId, getPatient])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <Spinner className="h-8 w-8" />
          <p className="text-muted-foreground">Loading patient details...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    notFound()
  }

  // Extract data from patient detail response
  const appointments = patient.appointments || []
  const medicalReports = patient.medical_reports || []
  const prescriptions = patient.prescriptions || []
  const bills = patient.bills || []

  const fullName = `${patient.first_name} ${patient.last_name}`

  const handleDownloadPatientInfo = async () => {
    try {
      await generatePatientPDF(
        patient,
        appointments,
        prescriptions,
        patient.medical_records || [],
        bills
      )
      toast({
        title: "Success",
        description: "Patient report downloaded successfully",
        variant: "default",
      })
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveEdit = async () => {
    if (!editData.first_name || !editData.last_name || !editData.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await updatePatient(patientId, editData)
      setPatient({ ...patient, ...editData })
      setIsEditDialogOpen(false)
      toast({
        title: "Success",
        description: "Patient information updated successfully",
        variant: "default",
      })
    } catch (error) {
      console.error("[v0] Error updating patient:", error)
      toast({
        title: "Error",
        description: "Failed to update patient information",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditClick = () => {
    setEditData({
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      phone: patient.phone,
      date_of_birth: patient.date_of_birth,
      father_name: patient.father_name,
      gender: patient.gender,
      address: patient.address,
      medical_history: patient.medical_history,
    })
    setIsEditDialogOpen(true)
  }

  const handleEditPrescription = (prescription: any) => {
    setEditingPrescription(prescription)
    setPrescriptionFormData({
      medication_name: prescription.medication_name,
    })
    setIsEditPrescriptionOpen(true)
  }

  const handleSavePrescription = async () => {
    if (!prescriptionFormData.medication_name?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter medicine details",
        variant: "destructive",
      })
      return
    }

    setIsSavingPrescription(true)
    try {
      const response = await apiClient.patch(`prescriptions/${editingPrescription.id}/`, {
        medication_name: prescriptionFormData.medication_name.trim(),
      })
      
      setPatient((prev: any) => ({
        ...prev,
        prescriptions: prev.prescriptions.map((p: any) =>
          p.id === editingPrescription.id ? response : p
        ),
      }))
      
      setIsEditPrescriptionOpen(false)
      toast({
        title: "Success",
        description: "Prescription updated successfully",
        variant: "default",
      })
    } catch (error) {
      console.error("[v0] Error updating prescription:", error)
      toast({
        title: "Error",
        description: "Failed to update prescription",
        variant: "destructive",
      })
    } finally {
      setIsSavingPrescription(false)
    }
  }

  const handleDownloadByDate = async () => {
    if (!downloadFromDate || !downloadToDate) {
      toast({
        title: "Validation Error",
        description: "Please select both from and to dates",
        variant: "destructive",
      })
      return
    }

    const fromDate = new Date(downloadFromDate)
    const toDate = new Date(downloadToDate)
    
    if (fromDate > toDate) {
      toast({
        title: "Validation Error",
        description: "From date must be before to date",
        variant: "destructive",
      })
      return
    }

    try {
      const filteredPrescriptions = prescriptions.filter((presc: any) => {
        const prescDate = new Date(presc.created_at)
        return prescDate >= fromDate && prescDate <= toDate
      })

      if (filteredPrescriptions.length === 0) {
        toast({
          title: "No Prescriptions",
          description: "No prescriptions found for the selected date range",
          variant: "destructive",
        })
        return
      }

      await generatePrescriptionPDF(patient, filteredPrescriptions)
      toast({
        title: "Success",
        description: `Downloaded ${filteredPrescriptions.length} prescription(s)`,
        variant: "default",
      })
      setIsDateFilterOpen(false)
      setDownloadFromDate('')
      setDownloadToDate('')
    } catch (error) {
      console.error("[v0] Error downloading prescriptions:", error)
      toast({
        title: "Error",
        description: "Failed to download prescriptions",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/patients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">View and manage patient information</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownloadPatientInfo} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handleEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Edit Prescription Dialog */}
      <Dialog open={isEditPrescriptionOpen} onOpenChange={setIsEditPrescriptionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prescription</DialogTitle>
            <DialogDescription>Update prescription details</DialogDescription>
          </DialogHeader>
          {prescriptionFormData && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Medication Name *</label>
                <Textarea
                  placeholder="Enter one or more medicines"
                  className="min-h-40"
                  value={prescriptionFormData.medication_name}
                  onChange={(e) =>
                    setPrescriptionFormData({
                      ...prescriptionFormData,
                      medication_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPrescriptionOpen(false)} disabled={isSavingPrescription}>
              Cancel
            </Button>
            <Button onClick={handleSavePrescription} disabled={isSavingPrescription}>
              {isSavingPrescription ? (
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

      {/* Edit Patient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Patient Information</DialogTitle>
            <DialogDescription>Update patient details</DialogDescription>
          </DialogHeader>
          {editData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name *</label>
                  <Input
                    value={editData.first_name}
                    onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name *</label>
                  <Input
                    value={editData.last_name}
                    onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    type="date"
                    value={editData.date_of_birth}
                    onChange={(e) => setEditData({ ...editData, date_of_birth: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Father&apos;s Name</label>
                  <Input
                    value={editData.father_name}
                    onChange={(e) => setEditData({ ...editData, father_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={editData.gender}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Medical History</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={editData.medical_history || ""}
                  onChange={(e) => setEditData({ ...editData, medical_history: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSaving}>
              {isSaving ? (
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

      {/* Patient Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl font-bold">
                {patient.first_name.charAt(0)}
              </div>
              <span className="mt-3 px-3 py-1 text-sm rounded-full bg-success/10 text-success">
                Active
              </span>
            </div>

            {/* Info Grid */}
            <div className="flex-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Full Name</span>
                </div>
                <p className="font-medium">{fullName}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Father&apos;s Name</span>
                </div>
                <p className="font-medium">{patient.father_name || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Gender</span>
                </div>
                <p className="font-medium">
                  {patient.gender === "M" ? "Male" : patient.gender === "F" ? "Female" : "Other"}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Date of Birth</span>
                </div>
                <p className="font-medium">{patient.date_of_birth}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-medium">{patient.phone}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-medium">{patient.email}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Address</span>
                </div>
                <p className="font-medium">{patient.address}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Patient Since</span>
                </div>
                <p className="font-medium">{new Date(patient.created_at).toLocaleDateString()}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Last Updated</span>
                </div>
                <p className="font-medium">{new Date(patient.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Medical History</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.medical_history && patient.medical_history.split(",").map((history: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {history.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>
                All appointments for this patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              {appointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No appointments found
                </p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment: any) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">{appointment.reason}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.appointment_date).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === "completed"
                            ? "bg-success/10 text-success"
                            : appointment.status === "cancelled"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medical Reports</CardTitle>
                <CardDescription>
                  All medical reports and assessments
                </CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/reports/new?patientId=${patient.id}`}>
                  Add Report
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {medicalReports.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reports found
                </p>
              ) : (
                <div className="space-y-4">
                  {medicalReports.map((report: any) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/reports/${report.id}`}>
                          View Report
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>
                  All prescriptions issued to this patient
                </CardDescription>
              </div>
              {prescriptions.length > 0 && (
                <div className="flex gap-2">
                  <Dialog open={isDateFilterOpen} onOpenChange={setIsDateFilterOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Download by Date
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Download Prescriptions by Date</DialogTitle>
                        <DialogDescription>
                          Select a date range to download prescriptions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">From Date</label>
                          <Input
                            type="date"
                            value={downloadFromDate}
                            onChange={(e) => setDownloadFromDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">To Date</label>
                          <Input
                            type="date"
                            value={downloadToDate}
                            onChange={(e) => setDownloadToDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDateFilterOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleDownloadByDate}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={async () => {
                      try {
                        await generatePrescriptionPDF(patient, prescriptions)
                        toast({
                          title: "Success",
                          description: "All prescriptions downloaded successfully",
                          variant: "default",
                        })
                      } catch (error) {
                        console.error("[v0] Error generating prescription PDF:", error)
                        toast({
                          title: "Error",
                          description: "Failed to generate PDF",
                          variant: "destructive",
                        })
                      }
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {prescriptions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No prescriptions found
                </p>
              ) : (
                <div className="space-y-6">
                  {/* Medications List */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">Medications List</h3>
                    <div className="border rounded-lg p-4 bg-secondary/30">
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {prescriptions.map((prescription: any, index: number) => (
                          <div
                            key={prescription.id}
                            className="flex gap-3 pb-2 border-b border-border/50 last:border-b-0"
                          >
                            <span className="font-semibold text-primary min-w-6 pt-0.5">{index + 1}.</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium break-words whitespace-pre-line">{prescription.medication_name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Detailed View with Download */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Individual Prescriptions</h3>
                    {prescriptions.map((prescription: any, index: number) => (
                      <div
                        key={prescription.id}
                        className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base text-blue-900 whitespace-pre-line">{prescription.medication_name}</p>
                            <div className="flex items-center justify-between mt-3">
                              <p className="text-xs text-gray-500">Issued: {new Date(prescription.created_at).toLocaleDateString('en-IN')}</p>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditPrescription(prescription)}
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={async () => {
                                    try {
                                      await generateSinglePrescriptionPDF(patient, prescription)
                                      toast({
                                        title: "Success",
                                        description: `${prescription.medication_name} prescription downloaded`,
                                        variant: "default",
                                      })
                                    } catch (error) {
                                      console.error("[v0] Error downloading prescription:", error)
                                      toast({
                                        title: "Error",
                                        description: "Failed to download prescription",
                                        variant: "destructive",
                                      })
                                    }
                                  }}
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                All invoices and payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bills.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No invoices found
                </p>
              ) : (
                <div className="space-y-4">
                  {bills.map((invoice: any) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">Invoice #{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(invoice.invoice_date || invoice.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {invoice.items && invoice.items.length > 0 && (
                          <div className="text-right text-sm text-muted-foreground">
                            {invoice.items.map((item: any, index: number) => (
                              <p key={`${invoice.id}-${index}`}>{item.medicine_name}</p>
                            ))}
                          </div>
                        )}
                        <p className="font-semibold">
                          ₹{Number(invoice.amount).toLocaleString()}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === "paid"
                              ? "bg-success/10 text-success"
                              : invoice.status === "overdue"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
