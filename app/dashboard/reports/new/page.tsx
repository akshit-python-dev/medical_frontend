'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useMedicalReports } from '@/hooks/useMedicalReports'
import { usePatients } from '@/hooks/usePatients'
import { useRouter } from 'next/navigation'
import { AlertCircle, Loader, Upload } from 'lucide-react'

export default function UploadReportPage() {
  const router = useRouter()
  const { uploadReport, isLoading } = useMedicalReports()
  const { patients } = usePatients()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [formData, setFormData] = useState({
    patient: '',
    report_type: 'LAB_REPORT',
    title: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!formData.patient || !formData.title || !selectedFile) {
      setUploadError('Please fill in all required fields and select a file')
      return
    }

    setIsSubmitting(true)
    setUploadError('')

    try {
      const fileFormData = new FormData()
      fileFormData.append('patient_id', formData.patient)
      fileFormData.append('report_type', formData.report_type)
      fileFormData.append('title', formData.title)
      fileFormData.append('description', formData.description)
      fileFormData.append('file', selectedFile)

      await uploadReport(fileFormData)
      router.push('/dashboard/reports')
    } catch (err) {
      console.error('[v0] Error uploading report:', err)
      setUploadError('Failed to upload report')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, selectedFile, uploadReport, router])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Medical Report</h1>
        <p className="text-muted-foreground">Add a new medical report for a patient</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {uploadError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Patient *</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.patient}
                onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
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
              <label className="text-sm font-medium">Report Type *</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.report_type}
                onChange={(e) => setFormData({ ...formData, report_type: e.target.value })}
              >
                <option value="lab_test">Lab Test</option>
                <option value="xray">X-Ray</option>
                <option value="ct_scan">CT Scan</option>
                <option value="ultrasound">Ultrasound</option>
                <option value="prescription">Prescription</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Report Title *</label>
              <Input
                placeholder="e.g., Blood Test Results"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Additional details about the report"
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Upload File *</label>
              <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DOC, DOCX up to 10MB</p>
                  {selectedFile && <p className="text-xs text-primary mt-2 font-medium">{selectedFile.name}</p>}
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
