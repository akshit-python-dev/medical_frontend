import jsPDF from 'jspdf'

export async function generateSinglePrescriptionPDF(patient: any, prescription: any) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  let yPosition = margin

  // Define colors (medical theme)
  const primaryColor = [25, 103, 210] // Blue
  const lightGray = [245, 245, 245]
  const darkGray = [60, 60, 60]
  const textColor = [40, 40, 40]

  // Header background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, pageWidth, 40, 'F')

  // Hospital/Clinic Logo text
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('PRESCRIPTION', margin, 15)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('Medical Prescription Report', margin, 24)

  yPosition = 50

  // Prescription Header Info
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Prescription Details', margin, yPosition)
  yPosition += 8

  // Prescription date box
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(0.5)
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 20, 'FD')

  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Issue Date:', margin + 3, yPosition + 7)
  doc.setFont('helvetica', 'normal')
  doc.text(new Date().toLocaleDateString('en-IN'), margin + 30, yPosition + 7)

  doc.setFont('helvetica', 'bold')
//   doc.text('Rx ID:', margin + 3, yPosition + 15)
//   doc.setFont('helvetica', 'normal')
//   doc.text(`RX-${prescription.id}-${new Date().getTime()}`, margin + 20, yPosition + 15)

  yPosition += 28

  // Patient Information Section
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text('Patient Information', margin, yPosition)
  yPosition += 7

  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  const patientDetails = [
    [`Name: ${patient.first_name} ${patient.last_name}`, `Patient ID: ${patient.id}`],
    [`Father's Name: ${patient.father_name || 'N/A'}`, `Age: ${patient.age || 'N/A'} years`],
    [`Phone: ${patient.phone || 'N/A'}`, `Gender: ${patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}`],
    [`Email: ${patient.email}`, ''],
    [`Address: ${patient.address || 'N/A'}`, ''],
  ]

  patientDetails.forEach(([left, right]) => {
    doc.text(left, margin + 3, yPosition)
    if (right) {
      doc.text(right, pageWidth / 2 + 5, yPosition)
    }
    yPosition += 6
  })

  yPosition += 5

  // Medication Section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Medication Details', margin + 3, yPosition + 5)

  yPosition += 12

  // Medication box with border
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(1)
  doc.setFillColor(240, 245, 255)
  const medicineLines = doc.splitTextToSize(
    prescription.medication_name || 'No medicine details provided',
    pageWidth - 2 * margin - 10
  )
  const medicineBlockHeight = Math.max(60, 18 + medicineLines.length * 5)
  doc.rect(margin, yPosition, pageWidth - 2 * margin, medicineBlockHeight, 'FD')

  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Medicines', margin + 5, yPosition + 8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)

  let medicineY = yPosition + 16
  medicineLines.forEach((line: string) => {
    doc.text(line, margin + 5, medicineY)
    medicineY += 5
  })

  yPosition += medicineBlockHeight + 5

  // Important Notes Section
  if (yPosition > pageHeight - 45) {
    doc.addPage()
    yPosition = margin
  }
  doc.setDrawColor(200, 100, 100)
  doc.setLineWidth(0.5)
  doc.setFillColor(255, 240, 240)
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 30, 'FD')

  doc.setTextColor(178, 34, 34)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('Important Notes:', margin + 3, yPosition + 5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(textColor[0], textColor[1], textColor[2])
  const notes = [
    '• Keep medication in a cool, dry place',
    '• Do not share this prescription with others',
    '• Consult doctor before stopping any medicine',
    '• Report any side effects immediately',
  ]
  let notesY = yPosition + 12
  notes.forEach((note) => {
    doc.text(note, margin + 3, notesY)
    notesY += 5
  })

  // Footer
  doc.setTextColor(150, 150, 150)
  doc.setFontSize(7)
  doc.text(
    `Generated on: ${new Date().toLocaleString('en-IN')} | Prescription ID: RX-${prescription.id}`,
    margin,
    pageHeight - 10
  )
  doc.text(
    'This is a digitally generated prescription. Valid without signature.',
    margin,
    pageHeight - 5
  )

  // Download
  const fileName = `prescription-${patient.id}-${prescription.id}-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
