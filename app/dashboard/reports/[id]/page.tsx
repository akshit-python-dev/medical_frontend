"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useMedicalReports } from "@/hooks/useMedicalReports"
import {
  ArrowLeft,
  Download,
  Printer,
  Edit,
  FileText,
} from "lucide-react"

interface ReportDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = use(params)
  const reportId = parseInt(id, 10)
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { getReport } = useMedicalReports()

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const data = await getReport(reportId)
        if (!data) {
          notFound()
        }
        setReport(data)
      } catch (err) {
        console.error("[v0] Error fetching report:", err)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId, getReport])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <Spinner className="h-8 w-8" />
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    notFound()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    if (report.file) {
      window.open(report.file, '_blank')
    }
  }

  const getPatientName = (patient: any) => {
    if (patient && typeof patient === 'object' && patient.first_name && patient.last_name) {
      return `${patient.first_name} ${patient.last_name}`
    }
    return `Patient #${patient || 'N/A'}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/reports">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{report.title}</h1>
          <p className="text-muted-foreground">Report #{report.id} • {report.report_type}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          {report.file && (
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      {/* Report Content */}
      <div className="grid gap-6">
        {/* Report Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Report Details</CardTitle>
                <CardDescription>Medical report information</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Uploaded Date</p>
                <p className="font-semibold">{new Date(report.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{getPatientName(report.patient)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Report Type</p>
                <p className="font-medium">{report.report_type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{report.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">File Size</p>
                <p className="font-medium">{report.file_size ? `${(report.file_size / 1024).toFixed(2)} KB` : 'N/A'}</p>
              </div>
            </div>

            {report.description && (
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="whitespace-pre-wrap">{report.description}</p>
              </div>
            )}

            {report.file && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{report.file_url ? report.file_url.split('/').pop() : 'Report file'}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="ml-auto"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
