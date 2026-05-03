import jsPDF from 'jspdf'

export async function generatePrescriptionPDF(patient: any, prescriptions: any[]) {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

    // Header
    pdf.setFillColor(33, 150, 243)
    pdf.rect(0, 0, pageWidth, 35, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.text('PRESCRIPTION', pageWidth / 2, 15, { align: 'center' })
    
    pdf.setFontSize(10)
    pdf.text('Medical Prescription Document', pageWidth / 2, 25, { align: 'center' })

    // Reset colors
    pdf.setTextColor(0, 0, 0)
    pdf.setFillColor(240, 240, 240)

    yPosition = 45

    // Patient Information Section
    pdf.setFillColor(240, 240, 240)
    pdf.rect(15, yPosition - 5, pageWidth - 30, 40, 'F')
    
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.text('Patient Information', 20, yPosition)
    
    pdf.setFont(undefined, 'normal')
    pdf.setFontSize(10)
    yPosition += 8
    pdf.text(`Name: ${patient.first_name} ${patient.last_name}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Father's Name: ${patient.father_name || 'N/A'}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Email: ${patient.email}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Phone: ${patient.phone}`, 20, yPosition)
    yPosition += 6
    pdf.text(`Gender: ${patient.gender === 'M' ? 'Male' : patient.gender === 'F' ? 'Female' : 'Other'}`, 20, yPosition)

    yPosition += 15

    // Medications Section
    pdf.setFillColor(33, 150, 243)
    pdf.rect(15, yPosition - 5, pageWidth - 30, 8, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.text('Prescribed Medications', 20, yPosition + 2)
    
    pdf.setTextColor(0, 0, 0)
    yPosition += 15

    if (prescriptions.length === 0) {
      pdf.setFontSize(10)
      pdf.text('No medications prescribed', 20, yPosition)
    } else {
      prescriptions.forEach((prescription, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 50) {
          pdf.addPage()
          yPosition = 20
        }

        // Medicine number and name
        pdf.setFontSize(11)
        pdf.setFont(undefined, 'bold')
        pdf.setFillColor(220, 220, 220)
        pdf.rect(15, yPosition - 4, pageWidth - 30, 7, 'F')
        pdf.text(`${index + 1}. ${prescription.medication_name}`, 20, yPosition)
        
        yPosition += 10
        pdf.setFont(undefined, 'normal')
        pdf.setFontSize(10)

        const details = [
          `Dosage: ${prescription.dosage}`,
          `Frequency: ${prescription.frequency || 'As needed'}`,
          `Duration: ${prescription.duration || 'As directed'}`,
        ]

        if (prescription.instructions) {
          details.push(`Instructions: ${prescription.instructions}`)
        }

        details.forEach((detail) => {
          pdf.text(detail, 20, yPosition)
          yPosition += 5
        })

        yPosition += 5
      })
    }

    yPosition += 10

    // Footer
    pdf.setFontSize(9)
    pdf.setTextColor(100, 100, 100)
    
    const today = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    pdf.text(`Generated on: ${today}`, 20, yPosition)
    yPosition += 5
    pdf.text(`Patient ID: ${patient.id}`, 20, yPosition)

    // Save PDF
    const filename = `prescription-${patient.id}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  } catch (error) {
    console.error('[v0] Error generating prescription PDF:', error)
    throw error
  }
}