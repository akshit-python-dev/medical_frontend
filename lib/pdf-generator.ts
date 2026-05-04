import jsPDF from "jspdf"

export interface PatientPDFData {
  id: number
  first_name: string
  last_name: string
  father_name: string
  gender: string
  date_of_birth: string
  email: string
  phone: string
  address: string
  medical_history: string
  age?: number
  created_at: string
  updated_at: string
}

export interface AppointmentData {
  id: number
  reason: string
  appointment_date: string
  status: string
}

export interface PrescriptionData {
  id: number
  medication_name: string
  created_at: string
}

export interface MedicalRecordData {
  id: number
  diagnosis: string
  treatment: string
  medications: string
  follow_up_date?: string
  created_at: string
  vital_signs?: Record<string, string | number>
}

export interface BillingItemData {
  id?: number
  medicine_name: string
  amount: string | number
}

export interface BillingData {
  id: number
  amount: string | number
  status: string
  description: string
  invoice_date?: string
  due_date?: string
  payment_date?: string | null
  items?: BillingItemData[]
}

export const generatePatientPDF = async (
  patient: PatientPDFData,
  appointments: AppointmentData[] = [],
  prescriptions: PrescriptionData[] = [],
  medicalRecords: MedicalRecordData[] = [],
  bills: BillingData[] = []
) => {
  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 10

  // Color scheme
  const primaryColor = [52, 104, 188] as [number, number, number] // Blue
  const secondaryColor = [240, 242, 245] as [number, number, number] // Light gray
  const textDark = [30, 30, 30] as [number, number, number]
  const textMuted = [120, 120, 120] as [number, number, number]
  const borderColor = [210, 220, 235] as [number, number, number]

  // Helper function to add a section
  const addSection = (title: string, yPos: number): number => {
    pdf.setFillColor(...primaryColor)
    pdf.rect(10, yPos, pageWidth - 20, 8, "F")
    pdf.setTextColor(255, 255, 255)
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(12)
    pdf.text(title, 15, yPos + 6)
    pdf.setTextColor(...textDark)
    return yPos + 12
  }

  const ensurePageSpace = (requiredHeight: number, continuedTitle?: string) => {
    if (yPosition <= pageHeight - requiredHeight) return
    pdf.addPage()
    yPosition = 12
    if (continuedTitle) {
      yPosition = addSection(continuedTitle, yPosition)
    }
  }

  const addWrappedRow = (label: string, value: string, yPos: number): number => {
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(10)
    pdf.setTextColor(...textMuted)
    pdf.text(label, 15, yPos)

    pdf.setTextColor(...textDark)
    pdf.setFont("helvetica", "normal")
    const lines = pdf.splitTextToSize(value || "N/A", pageWidth - 70)
    pdf.text(lines, 80, yPos)
    return yPos + Math.max(6, lines.length * 4.5)
  }

  const addParagraph = (text: string, x: number, yPos: number, width: number): number => {
    const lines = pdf.splitTextToSize(text || "N/A", width)
    pdf.text(lines, x, yPos)
    return yPos + lines.length * 4.5
  }

  // Header
  pdf.setFillColor(...primaryColor)
  pdf.rect(0, 0, pageWidth, 20, "F")
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(18)
  pdf.text("PATIENT MEDICAL REPORT", 15, 10)
  pdf.setFontSize(10)
  pdf.text(
    `Generated on ${new Date().toLocaleString()}`,
    15,
    16
  )

  yPosition = 25

  // Patient Basic Information
  yPosition = addSection("PATIENT INFORMATION", yPosition)

  const fullName = `${patient.first_name} ${patient.last_name}`
  yPosition = addWrappedRow("Full Name", fullName, yPosition)
  yPosition = addWrappedRow("Father's Name", patient.father_name || "N/A", yPosition)
  yPosition = addWrappedRow(
    "Gender",
    patient.gender === "M" ? "Male" : patient.gender === "F" ? "Female" : "Other",
    yPosition
  )
  yPosition = addWrappedRow("Date of Birth", patient.date_of_birth, yPosition)
  yPosition = addWrappedRow("Age", `${patient.age || "N/A"} years`, yPosition)
  yPosition = addWrappedRow("Patient ID", `#${patient.id}`, yPosition)
  yPosition += 4

  // Contact Information
  yPosition = addSection("CONTACT INFORMATION", yPosition)
  yPosition = addWrappedRow("Email", patient.email, yPosition)
  yPosition = addWrappedRow("Phone", patient.phone, yPosition)
  yPosition = addWrappedRow("Address", patient.address, yPosition)
  yPosition += 4

  // Medical Information
  yPosition = addSection("MEDICAL INFORMATION", yPosition)
  yPosition = addWrappedRow("Medical History", patient.medical_history || "None", yPosition)
  yPosition = addWrappedRow(
    "Patient Since",
    new Date(patient.created_at).toLocaleDateString(),
    yPosition
  )
  yPosition += 4

  // Appointments Section
  if (appointments.length > 0) {
    ensurePageSpace(30)
    yPosition = addSection("APPOINTMENT HISTORY", yPosition)

    appointments.forEach((apt, index) => {
      ensurePageSpace(22, "APPOINTMENT HISTORY (Continued)")
      pdf.setDrawColor(...borderColor)
      pdf.setFillColor(...secondaryColor)
      pdf.roundedRect(12, yPosition - 4, pageWidth - 24, 16, 2, 2, "FD")

      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...textDark)
      pdf.text(`${index + 1}. ${apt.reason || "Appointment"}`, 16, yPosition + 1)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.setTextColor(...textMuted)
      pdf.text(`Date: ${new Date(apt.appointment_date).toLocaleString()}`, 16, yPosition + 6)
      pdf.text(`Status: ${apt.status || "N/A"}`, 16, yPosition + 10.5)

      yPosition += 18
    })
    yPosition += 4
  }

  if (medicalRecords.length > 0) {
    ensurePageSpace(40)
    yPosition = addSection("MEDICAL RECORDS", yPosition)

    medicalRecords.forEach((record, index) => {
      ensurePageSpace(40, "MEDICAL RECORDS (Continued)")

      pdf.setDrawColor(...borderColor)
      pdf.roundedRect(12, yPosition - 4, pageWidth - 24, 34, 2, 2, "S")
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...primaryColor)
      pdf.text(`Record ${index + 1}`, 16, yPosition + 1)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.setTextColor(...textDark)
      yPosition = addParagraph(`Diagnosis: ${record.diagnosis || "N/A"}`, 16, yPosition + 6, pageWidth - 32)
      yPosition = addParagraph(`Treatment: ${record.treatment || "N/A"}`, 16, yPosition, pageWidth - 32)
      yPosition = addParagraph(`Medications: ${record.medications || "N/A"}`, 16, yPosition, pageWidth - 32)

      if (record.follow_up_date) {
        pdf.setTextColor(...textMuted)
        pdf.text(`Follow-up: ${new Date(record.follow_up_date).toLocaleDateString()}`, 16, yPosition + 1)
        yPosition += 6
      } else {
        yPosition += 3
      }
    })
    yPosition += 4
  }

  if (bills.length > 0) {
    ensurePageSpace(40)
    yPosition = addSection("BILLING HISTORY", yPosition)

    bills.forEach((bill) => {
      const billLines =
        bill.items && bill.items.length > 0
          ? bill.items.map((item) => `${item.medicine_name}: Rs. ${Number(item.amount).toFixed(2)}`)
          : [bill.description || "No bill description"]

      const blockHeight = 18 + billLines.length * 4.5
      ensurePageSpace(blockHeight, "BILLING HISTORY (Continued)")

      pdf.setDrawColor(...borderColor)
      pdf.setFillColor(...secondaryColor)
      pdf.roundedRect(12, yPosition - 4, pageWidth - 24, blockHeight, 2, 2, "FD")
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...textDark)
      pdf.text(`Invoice #${bill.id}`, 16, yPosition + 1)
      pdf.text(`Amount: Rs. ${Number(bill.amount).toFixed(2)}`, pageWidth - 65, yPosition + 1)

      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.setTextColor(...textMuted)
      pdf.text(
        `Status: ${bill.status} | Due: ${bill.due_date ? new Date(bill.due_date).toLocaleDateString() : "N/A"}`,
        16,
        yPosition + 6
      )

      let billY = yPosition + 11
      pdf.setTextColor(...textDark)
      billLines.forEach((line) => {
        const wrappedLine = pdf.splitTextToSize(line, pageWidth - 32)
        pdf.text(wrappedLine, 16, billY)
        billY += wrappedLine.length * 4.5
      })

      yPosition = billY + 3
    })
    yPosition += 4
  }

  // Prescriptions Section
  if (prescriptions.length > 0) {
    ensurePageSpace(40)
    yPosition = addSection("MEDICATIONS PRESCRIBED", yPosition)

    prescriptions.forEach((presc, index) => {
      const medicineLines = pdf.splitTextToSize(
        presc.medication_name || "No medicine details provided",
        pageWidth - 34
      )
      const blockHeight = 12 + medicineLines.length * 4.5
      ensurePageSpace(blockHeight + 6, "MEDICATIONS PRESCRIBED (Continued)")

      pdf.setDrawColor(...borderColor)
      pdf.roundedRect(12, yPosition - 4, pageWidth - 24, blockHeight, 2, 2, "S")
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...primaryColor)
      pdf.text(`${index + 1}. Prescription`, 16, yPosition + 1)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(...textMuted)
      pdf.setFontSize(8.5)
      pdf.text(`Issued: ${new Date(presc.created_at).toLocaleDateString()}`, pageWidth - 55, yPosition + 1)

      pdf.setFontSize(9)
      pdf.setTextColor(...textDark)
      pdf.text(medicineLines, 16, yPosition + 7)
      yPosition += blockHeight + 2
    })
  }

  // Footer
  const footerY = pageHeight - 10
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(8)
  pdf.setTextColor(...textMuted)
  pdf.text(
    `Patient Medical Report - ${fullName} (ID: ${patient.id})`,
    15,
    footerY
  )
  
  const pageCount = (pdf as any).internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i)
    pdf.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 30,
      footerY
    )
  }

  // Save the PDF
  const fileName = `patient-${patient.id}-report-${new Date().toISOString().split("T")[0]}.pdf`
  pdf.save(fileName)
}
