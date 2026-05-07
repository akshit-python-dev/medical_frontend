import jsPDF from 'jspdf'
import { Billing, Patient } from '@/lib/types'

export interface InvoiceData {
  invoice: Billing
  patient: Patient | null
  doctor?: {
    name: string
    phone?: string
    email?: string
  }
}

export function generateInvoicePDF(data: InvoiceData) {
  const { invoice, patient } = data
  
  // Create PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 20

  // Set colors
  const primaryColor = '#1e40af' // blue-800
  const textColor = '#1f2937' // gray-900
  const lightGray = '#f3f4f6' // gray-100

  // Header
  pdf.setFontSize(24)
  pdf.setTextColor(primaryColor)
  pdf.text('INVOICE', pageWidth / 2, yPosition, { align: 'center' })
  yPosition += 15

  // Invoice Details Section
  pdf.setFontSize(10)
  pdf.setTextColor(textColor)

  const invoiceNumber = `INV-${invoice.id}`
  const patientId = patient?.patient_id || `PAT-${patient?.id || invoice.id}`
  const invoiceDate = invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString() : new Date().toLocaleDateString()
  const dueDate = invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'

  // Left column - Invoice info
  pdf.setFont('Helvetica', 'bold')
  pdf.text('Invoice Number:', 20, yPosition)
  pdf.setFont('Helvetica', 'normal')
  pdf.text(invoiceNumber, 65, yPosition)
  yPosition += 7

  pdf.setFont('Helvetica', 'bold')
  pdf.text('Invoice Date:', 20, yPosition)
  pdf.setFont('Helvetica', 'normal')
  pdf.text(invoiceDate, 65, yPosition)
  yPosition += 7

  pdf.setFont('Helvetica', 'bold')
  pdf.text('Due Date:', 20, yPosition)
  pdf.setFont('Helvetica', 'normal')
  pdf.text(dueDate, 65, yPosition)
  yPosition += 7

  pdf.setFont('Helvetica', 'bold')
  pdf.text('Status:', 20, yPosition)
  pdf.setFont('Helvetica', 'normal')
  pdf.text(invoice.status.toUpperCase(), 65, yPosition)
  yPosition += 12

  // Patient Information Section
  pdf.setFontSize(11)
  pdf.setFont('Helvetica', 'bold')
  pdf.setTextColor(primaryColor)
  pdf.text('PATIENT INFORMATION', 20, yPosition)
  yPosition += 7

  pdf.setFontSize(10)
  pdf.setFont('Helvetica', 'bold')
  pdf.setTextColor(textColor)
  pdf.text('Patient ID:', 20, yPosition)
  pdf.setFont('Helvetica', 'normal')
  pdf.text(patientId, 65, yPosition)
  yPosition += 6

  if (patient) {
    pdf.setFont('Helvetica', 'bold')
    pdf.text('Name:', 20, yPosition)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(`${patient.first_name} ${patient.last_name}`, 65, yPosition)
    yPosition += 6

    pdf.setFont('Helvetica', 'bold')
    pdf.text('Email:', 20, yPosition)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(patient.email, 65, yPosition)
    yPosition += 6

    pdf.setFont('Helvetica', 'bold')
    pdf.text('Phone:', 20, yPosition)
    pdf.setFont('Helvetica', 'normal')
    pdf.text(patient.phone, 65, yPosition)
    yPosition += 6

    pdf.setFont('Helvetica', 'bold')
    pdf.text('Address:', 20, yPosition)
    const maxWidth = 110
    const addressLines = pdf.splitTextToSize(patient.address || 'N/A', maxWidth)
    pdf.setFont('Helvetica', 'normal')
    addressLines.forEach((line: string) => {
      pdf.text(line, 65, yPosition)
      yPosition += 5
    })
  }

  yPosition += 5

  // Items Table
  pdf.setFontSize(11)
  pdf.setFont('Helvetica', 'bold')
  pdf.setTextColor(primaryColor)
  pdf.text('INVOICE ITEMS', 20, yPosition)
  yPosition += 8

  // Table header
  const tableTop = yPosition
  const col1X = 20
  const col2X = 130
  const rowHeight = 7
  const headerHeight = 8

  // Header background
  pdf.setFillColor(30, 64, 175) // blue-800
  pdf.rect(col1X - 2, tableTop, pageWidth - 40, headerHeight, 'F')

  // Header text
  pdf.setFont('Helvetica', 'bold')
  pdf.setTextColor('#ffffff')
  pdf.setFontSize(10)
  pdf.text('Medicine / Item', col1X, tableTop + 5)
  pdf.text('Amount', col2X, tableTop + 5)

  yPosition = tableTop + headerHeight + 8

  // Table rows
  pdf.setTextColor(textColor)
  pdf.setFont('Helvetica', 'normal')
  pdf.setFontSize(9)

  if (invoice.items && invoice.items.length > 0) {
    invoice.items.forEach((item) => {
      const medicineName = item.medicine_name || 'N/A'
      const amount = typeof item.amount === 'string' ? item.amount : item.amount.toString()

      // Item name
      const nameLines = pdf.splitTextToSize(medicineName, 100)
      let itemHeight = nameLines.length * rowHeight

      // Check if we need a new page
      if (yPosition + itemHeight > pageHeight - 40) {
        pdf.addPage()
        yPosition = 20
      }

      nameLines.forEach((line: string, index: number) => {
        pdf.text(line, col1X, yPosition + index * rowHeight)
      })

      // Amount
      pdf.text(`${amount}`, col2X, yPosition)
      yPosition += itemHeight + 2
    })
  } else {
    pdf.text('No items', col1X, yPosition)
    yPosition += 7
  }

  // Total row
  yPosition += 3
  pdf.setFillColor(243, 244, 246) // gray-100
  pdf.rect(col1X - 2, yPosition - 5, pageWidth - 40, 10, 'F')

  pdf.setFont('Helvetica', 'bold')
  pdf.setFontSize(11)
  pdf.setTextColor(textColor)
  pdf.text('TOTAL AMOUNT:', col1X, yPosition)

  const totalAmount = typeof invoice.amount === 'string' ? invoice.amount : invoice.amount.toString()
  pdf.text(`${totalAmount}`, col2X, yPosition)

  yPosition += 15

  // Payment Status
  pdf.setFontSize(10)
  pdf.setFont('Helvetica', 'bold')
  pdf.setTextColor(primaryColor)
  pdf.text('PAYMENT STATUS', 20, yPosition)
  yPosition += 7

  pdf.setFont('Helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.setTextColor(textColor)

  if (invoice.status === 'paid' && invoice.paid_date) {
    const paidDate = new Date(invoice.paid_date).toLocaleDateString()
    pdf.text(`Paid on: ${paidDate}`, 20, yPosition)
  } else if (invoice.status === 'pending') {
    pdf.text('Status: Pending Payment', 20, yPosition)
  } else if (invoice.status === 'overdue') {
    pdf.text('Status: Overdue', 20, yPosition)
  } else if (invoice.status === 'cancelled') {
    pdf.text('Status: Cancelled', 20, yPosition)
  }

  yPosition += 8

  // Notes section if description exists
  if (invoice.description) {
    pdf.setFont('Helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(primaryColor)
    pdf.text('NOTES', 20, yPosition)
    yPosition += 6

    pdf.setFont('Helvetica', 'normal')
    pdf.setFontSize(9)
    pdf.setTextColor(textColor)
    const descLines = pdf.splitTextToSize(invoice.description, pageWidth - 40)
    descLines.forEach((line: string) => {
      pdf.text(line, 20, yPosition)
      yPosition += 5
    })
  }

  // Footer
  yPosition = pageHeight - 20
  pdf.setFontSize(8)
  pdf.setTextColor('#9ca3af') // gray-400
  pdf.text('This is a computer generated invoice. No signature is required.', pageWidth / 2, yPosition, { align: 'center' })
  pdf.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, yPosition + 5, { align: 'center' })

  // Download the PDF
  const filename = `invoice-${invoice.id}.pdf`
  pdf.save(filename)
}
