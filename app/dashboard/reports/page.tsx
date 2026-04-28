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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useMedicalReports } from '@/hooks/useMedicalReports'
import { Plus, Search, FileText, Download, AlertCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function ReportsPage() {
  const { reports, isLoading, isError, error, deleteReport } = useMedicalReports()
  const [searchQuery, setSearchQuery] = useState('')

  const getPatientName = (patient: unknown) => {
    if (patient && typeof patient === 'object' && 'first_name' in patient && 'last_name' in patient) {
      const p = patient as { first_name?: string; last_name?: string; id?: number }
      const fullName = `${p.first_name || ''} ${p.last_name || ''}`.trim()
      return fullName || `Patient #${p.id ?? 'N/A'}`
    }
    return `Patient #${patient as number}`
  }

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.report_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getPatientName(report.patient).toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteReport = useCallback(
    async (id: number) => {
      if (!confirm('Are you sure you want to delete this report?')) return

      try {
        await deleteReport(id)
      } catch (err) {
        console.error('[v0] Error deleting report:', err)
        alert('Failed to delete report')
      }
    },
    [deleteReport]
  )

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Medical Reports</h1>
          <Button asChild>
            <Link href="/dashboard/reports/new">
              <Plus className="h-4 w-4 mr-2" />
              Upload Report
            </Link>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error?.message || 'Failed to load reports'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Medical Reports</h1>
          <p className="text-muted-foreground">View and manage patient medical reports</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reports/new">
            <Plus className="h-4 w-4 mr-2" />
            Upload Report
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardDescription>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
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
          ) : filteredReports.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Uploaded Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {report.report_type}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>{getPatientName(report.patient)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(report.file, '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reports found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
