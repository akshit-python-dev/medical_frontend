"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useDashboardStats } from "@/hooks/useDashboardStats"
import { useAppointments } from "@/hooks/useAppointments"
import { usePatients } from "@/hooks/usePatients"
import { useBillingStats } from "@/hooks/useBillingStats"
import {
  Users,
  Calendar,
  FileText,
  Activity,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Clock,
  AlertCircle,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DashboardPage() {
  const { user, isLoading: authLoading, isError: authError } = useAuth()
  const { stats, isLoading: statsLoading } = useDashboardStats()
  const { appointments, isLoading: appointmentsLoading } = useAppointments()
  const { patients, isLoading: patientsLoading } = usePatients()
  const { stats: billingStats } = useBillingStats()

  if (authError) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load dashboard. Please try refreshing the page.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const isLoading = authLoading || statsLoading || appointmentsLoading || patientsLoading

  const statCards = [
    {
      title: "Total Patients",
      value: stats.total_patients || 0,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Today's Appointments",
      value: stats.today_appointments || 0,
      icon: Calendar,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Upcoming Appointments",
      value: stats.upcoming_appointments || 0,
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
    {
      title: "Pending Invoices",
      value: stats.pending_invoices || 0,
      icon: FileText,
      color: "bg-success/10 text-success",
    },
  ]

  const todayAppointments = appointments
    .filter((a) => a.status === "scheduled")
    .slice(0, 5)

  const getPatientName = (patient: unknown, fallbackName?: string) => {
    if (fallbackName) return fallbackName
    if (patient && typeof patient === "object" && "first_name" in patient && "last_name" in patient) {
      const p = patient as { first_name?: string; last_name?: string; id?: number }
      const fullName = `${p.first_name || ""} ${p.last_name || ""}`.trim()
      return fullName || `Patient #${p.id ?? "N/A"}`
    }
    return `Patient #${patient as number}`
  }

  // const recentPatients = patients.slice(0, 5)
const recentPatients = patients
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.first_name || "Doctor"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening at your clinic today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/patients">
              <Users className="h-4 w-4 mr-2" />
              Add Patient
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                  {isLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="text-3xl font-bold">{stat.value}</div>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  {isLoading ? (
                    <Skeleton className="h-8 w-32" />
                  ) : (
                    parseFloat(billingStats.total_revenue || "0").toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pending Invoices</p>
              <div className="text-xl font-semibold flex items-center justify-end gap-1">
                <IndianRupee className="h-4 w-4" />
                {isLoading ? (
                  <Skeleton className="h-6 w-24" />
                ) : (
                  parseFloat(billingStats.total_pending || "0").toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments & Patients Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              {isLoading ? "Loading..." : `${todayAppointments.length} scheduled appointments`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{getPatientName(apt.patient, apt.patient_name)}</p>
                      <p className="text-xs text-muted-foreground">{apt.appointment_date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{apt.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No appointments scheduled for today</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>
              {isLoading ? "Loading..." : `${recentPatients.length} recent patients`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : recentPatients.length > 0 ? (
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">
                        {patient.first_name} {patient.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{patient.email}</p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/dashboard/patients/${patient.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No patients yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

