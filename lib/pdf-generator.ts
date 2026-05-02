import jsPDF from "jspdf"
import html2canvas from "html2canvas"

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
  dosage: string
  frequency: string
  duration: string
  instructions: string
  created_at: string
}

export const generatePatientPDF = async (
  patient: PatientPDFData,
  appointments: AppointmentData[] = [],
  prescriptions: PrescriptionData[] = []
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

  // Helper function to add a row
  const addRow = (
    label: string,
    value: string,
    yPos: number,
    isBold: boolean = false
  ): number => {
    pdf.setFont("helvetica", isBold ? "bold" : "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(...textMuted)
    pdf.text(label, 15, yPos)
    pdf.setTextColor(...textDark)
    pdf.setFont("helvetica", isBold ? "bold" : "normal")
    pdf.text(value, 80, yPos)
    return yPos + 6
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
  yPosition = addRow("Full Name", fullName, yPosition, true)
  yPosition = addRow("Father's Name", patient.father_name || "N/A", yPosition)
  yPosition = addRow(
    "Gender",
    patient.gender === "M" ? "Male" : patient.gender === "F" ? "Female" : "Other",
    yPosition
  )
  yPosition = addRow("Date of Birth", patient.date_of_birth, yPosition)
  yPosition = addRow("Age", `${patient.age || "N/A"} years`, yPosition)
  yPosition = addRow("Patient ID", `#${patient.id}`, yPosition)
  yPosition += 4

  // Contact Information
  yPosition = addSection("CONTACT INFORMATION", yPosition)
  yPosition = addRow("Email", patient.email, yPosition)
  yPosition = addRow("Phone", patient.phone, yPosition)
  yPosition = addRow("Address", patient.address, yPosition)
  yPosition += 4

  // Medical Information
  yPosition = addSection("MEDICAL INFORMATION", yPosition)
  yPosition = addRow("Medical History", patient.medical_history || "None", yPosition)
  yPosition = addRow(
    "Patient Since",
    new Date(patient.created_at).toLocaleDateString(),
    yPosition
  )
  yPosition += 4

  // Check if we need a new page for appointments
  if (appointments.length > 0 && yPosition > pageHeight - 60) {
    pdf.addPage()
    yPosition = 10
  }

  // Appointments Section
  if (appointments.length > 0) {
    yPosition = addSection("APPOINTMENT HISTORY", yPosition)
    
    appointments.slice(0, 5).forEach((apt, index) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage()
        yPosition = 10
      }
      
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...textDark)
      pdf.text(`${index + 1}. ${apt.reason}`, 15, yPosition)
      
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.setTextColor(...textMuted)
      pdf.text(
        `Date: ${new Date(apt.appointment_date).toLocaleString()} | Status: ${apt.status}`,
        20,
        yPosition + 5
      )
      
      yPosition += 10
    })

    if (appointments.length > 5) {
      pdf.setFont("helvetica", "italic")
      pdf.setFontSize(9)
      pdf.setTextColor(...textMuted)
      pdf.text(`... and ${appointments.length - 5} more appointments`, 15, yPosition)
      yPosition += 6
    }
    yPosition += 4
  }

  // Check if we need a new page for prescriptions
  if (prescriptions.length > 0 && yPosition > pageHeight - 80) {
    pdf.addPage()
    yPosition = 10
  }

  // Prescriptions Section
  if (prescriptions.length > 0) {
    yPosition = addSection("MEDICATIONS PRESCRIBED", yPosition)
    
    prescriptions.forEach((presc, index) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 10
        yPosition = addSection("MEDICATIONS PRESCRIBED (Continued)", yPosition)
      }

      // Medication number and name
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(10)
      pdf.setTextColor(...primaryColor)
      pdf.text(`${index + 1}. ${presc.medication_name}`, 15, yPosition)

      yPosition += 6

      // Medication details
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(9)
      pdf.setTextColor(...textMuted)
      
      const details = `Dosage: ${presc.dosage} | Frequency: ${presc.frequency} | Duration: ${presc.duration}`
      const splitDetails = pdf.splitTextToSize(details, pageWidth - 30)
      pdf.text(splitDetails, 20, yPosition)
      yPosition += splitDetails.length * 4 + 2

      if (presc.instructions) {
        pdf.setFont("helvetica", "italic")
        pdf.setFontSize(8)
        const splitInstructions = pdf.splitTextToSize(
          `Note: ${presc.instructions}`,
          pageWidth - 30
        )
        pdf.text(splitInstructions, 20, yPosition)
        yPosition += splitInstructions.length * 3.5 + 2
      }

      yPosition += 3
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