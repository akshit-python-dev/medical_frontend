"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
import { usePatients } from "@/hooks/usePatients"
import { generatePatientPDF } from "@/lib/pdf-generator"
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
} from "lucide-react"

interface PatientProfilePageProps {
  params: Promise<{ id: string }>
}

export default function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { id } = use(params)
  const patientId = parseInt(id, 10)
  const [patient, setPatient] = useState<any>(null)
  const [medicalRecords, setMedicalRecords] = useState<any[]>([])
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([])
  const [billingSummary, setBillingSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { getPatient, getPatientMedicalHistory, getUpcomingAppointments, getBillingSummary } = usePatients()

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

        // Fetch medical history (MedicalRecords)
        try {
          const historyData = await getPatientMedicalHistory(patientId)
          setMedicalRecords(Array.isArray(historyData) ? historyData : [])
        } catch (err) {
          console.error("[v0] Error fetching medical history:", err)
        }

        // Fetch upcoming appointments
        try {
          const appointmentsData = await getUpcomingAppointments(patientId)
          setUpcomingAppointments(Array.isArray(appointmentsData) ? appointmentsData : [])
        } catch (err) {
          console.error("[v0] Error fetching upcoming appointments:", err)
        }

        // Fetch billing summary
        try {
          const summaryData = await getBillingSummary(patientId)
          setBillingSummary(summaryData)
        } catch (err) {
          console.error("[v0] Error fetching billing summary:", err)
        }
      } catch (err) {
        console.error("[v0] Error fetching patient:", err)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchPatientData()
  }, [patientId, getPatient, getPatientMedicalHistory, getUpcomingAppointments, getBillingSummary])

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
  const prescriptions = medicalRecords.flatMap((record: any) => record.prescriptions || [])
  const bills = patient.bills || []

  const fullName = `${patient.first_name} ${patient.last_name}`

  const handleDownloadPatientInfo = async () => {
    try {
      await generatePatientPDF(patient, appointments, prescriptions)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
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
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

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
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>
                All prescriptions issued to this patient
              </CardDescription>
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
                              <p className="font-medium break-words">{prescription.medication_name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {prescription.dosage} • {prescription.frequency}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Detailed View */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm">Prescription Details</h3>
                    {prescriptions.map((prescription: any, index: number) => (
                      <div
                        key={prescription.id}
                        className="p-4 rounded-lg bg-secondary/50 border border-border"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-base">{prescription.medication_name}</p>
                            <div className="grid gap-2 mt-3 sm:grid-cols-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Dosage</p>
                                <p className="text-sm font-medium">{prescription.dosage}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Frequency</p>
                                <p className="text-sm font-medium">{prescription.frequency}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Duration</p>
                                <p className="text-sm font-medium">{prescription.duration}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Date Prescribed</p>
                                <p className="text-sm font-medium">{new Date(prescription.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            {prescription.instructions && (
                              <div className="mt-3 p-2 rounded bg-primary/5 border-l-2 border-primary">
                                <p className="text-xs text-muted-foreground">Instructions</p>
                                <p className="text-sm mt-1">{prescription.instructions}</p>
                              </div>
                            )}
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
