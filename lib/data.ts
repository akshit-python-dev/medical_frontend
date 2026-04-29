export interface Patient {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  gender: "M" | "F" | "O"
  address: string
  medical_history: string
  age?: number
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: number
  patient: number | Patient
  patient_name: string
  doctor: number
  appointment_date: string
  status: "scheduled" | "completed" | "cancelled"
  reason: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface MedicalReport {
  id: number
  patient: number | Patient
  report_type: string
  title: string
  file?: string
  file_url?: string
  description?: string
  created_at: string
}

export interface Medicine {
  id: string
  medication_name: string
  dosage: string
  frequency: string
  duration: string
}

export interface Prescription {
  id: number
  patient: number | Patient
  patient_name?: string
  medication_name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  notes?: string
  created_at: string
}

export interface Invoice {
  id: number
  patient: number | Patient
  patient_name: string
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
  description: string
  invoice_date: string
  due_date: string
  payment_date?: string | null
  created_at: string
}

export interface Notification {
  id: string
  type: "appointment" | "report" | "medicine" | "billing"
  title: string
  message: string
  date: string
  read: boolean
}

export const patients: Patient[] = [
  {
    id: 1,
    first_name: "Rahul",
    last_name: "Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    date_of_birth: "1992-03-15",
    gender: "M",
    address: "123 MG Road, Sector 15, New Delhi",
    medical_history: "Hypertension, Diabetes Type 2",
    age: 32,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-03-20T15:30:00Z",
  },
  {
    id: 2,
    first_name: "Priya",
    last_name: "Patel",
    email: "priya.patel@email.com",
    phone: "+91 87654 32109",
    date_of_birth: "1996-07-22",
    gender: "F",
    address: "45 Green Avenue, Andheri West, Mumbai",
    medical_history: "Asthma, Allergies",
    age: 28,
    created_at: "2024-02-10T09:15:00Z",
    updated_at: "2024-03-18T14:45:00Z",
  },
  {
    id: 3,
    first_name: "Amit",
    last_name: "Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 76543 21098",
    date_of_birth: "1979-05-10",
    gender: "M",
    address: "78 Lake View, Koramangala, Bangalore",
    medical_history: "Cardiac Issues, High Cholesterol",
    age: 45,
    created_at: "2023-11-20T11:00:00Z",
    updated_at: "2024-03-15T16:20:00Z",
  },
  {
    id: 4,
    first_name: "Sneha",
    last_name: "Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 65432 10987",
    date_of_birth: "2016-02-14",
    gender: "F",
    address: "12 Hill Road, Banjara Hills, Hyderabad",
    medical_history: "ADHD, Speech Delay",
    age: 8,
    created_at: "2024-01-05T08:30:00Z",
    updated_at: "2024-03-22T17:00:00Z",
  },
  {
    id: 5,
    first_name: "Mohammed",
    last_name: "Ali",
    email: "mohammed.ali@email.com",
    phone: "+91 54321 09876",
    date_of_birth: "1969-08-30",
    gender: "M",
    address: "90 Park Street, Kolkata",
    medical_history: "Arthritis, Diabetes Type 2",
    age: 55,
    created_at: "2023-09-12T13:45:00Z",
    updated_at: "2024-03-10T10:15:00Z",
  },
  {
    id: 6,
    first_name: "Ananya",
    last_name: "Singh",
    email: "ananya.singh@email.com",
    phone: "+91 43210 98765",
    date_of_birth: "2012-06-18",
    gender: "F",
    address: "56 Civil Lines, Lucknow",
    medical_history: "Autism Spectrum Disorder",
    age: 12,
    created_at: "2024-02-28T12:00:00Z",
    updated_at: "2024-03-25T15:30:00Z",
  },
]

export const appointments: Appointment[] = [
  {
    id: 1,
    patient: 1,
    patient_name: "Rahul Sharma",
    doctor: 1,
    appointment_date: "2024-03-27T09:00:00Z",
    status: "scheduled",
    reason: "Follow-up",
    notes: "Regular checkup",
    created_at: "2024-03-26T10:00:00Z",
    updated_at: "2024-03-26T10:00:00Z",
  },
  {
    id: 2,
    patient: 2,
    patient_name: "Priya Patel",
    doctor: 1,
    appointment_date: "2024-03-27T10:30:00Z",
    status: "scheduled",
    reason: "Consultation",
    notes: "Asthma review",
    created_at: "2024-03-26T10:15:00Z",
    updated_at: "2024-03-26T10:15:00Z",
  },
  {
    id: 3,
    patient: 4,
    patient_name: "Sneha Reddy",
    doctor: 1,
    appointment_date: "2024-03-27T14:00:00Z",
    status: "scheduled",
    reason: "Therapy Session",
    notes: "Speech therapy",
    created_at: "2024-03-26T11:00:00Z",
    updated_at: "2024-03-26T11:00:00Z",
  },
  {
    id: 4,
    patient: 3,
    patient_name: "Amit Kumar",
    doctor: 1,
    appointment_date: "2024-03-26T11:00:00Z",
    status: "completed",
    reason: "Check-up",
    notes: "Cardiac check",
    created_at: "2024-03-25T09:00:00Z",
    updated_at: "2024-03-26T11:30:00Z",
  },
  {
    id: 5,
    patient: 6,
    patient_name: "Ananya Singh",
    doctor: 1,
    appointment_date: "2024-03-28T15:30:00Z",
    status: "scheduled",
    reason: "Evaluation",
    notes: "ASD evaluation",
    created_at: "2024-03-26T12:00:00Z",
    updated_at: "2024-03-26T12:00:00Z",
  },
  {
    id: 6,
    patient: 5,
    patient_name: "Mohammed Ali",
    doctor: 1,
    appointment_date: "2024-03-25T16:00:00Z",
    status: "cancelled",
    reason: "Follow-up",
    notes: "Patient requested cancellation",
    created_at: "2024-03-24T14:00:00Z",
    updated_at: "2024-03-25T09:00:00Z",
  },
]

export const medicalReports: MedicalReport[] = [
  {
    id: 1,
    patient: 4,
    report_type: "lab_test",
    title: "ADHD Assessment Report",
    description: "Comprehensive ADHD evaluation with speech assessment",
    file_url: "speech_assessment.pdf",
    created_at: "2024-03-22T14:00:00Z",
  },
  {
    id: 2,
    patient: 6,
    report_type: "lab_test",
    title: "Autism Spectrum Disorder Evaluation",
    description: "Behavioral and cognitive assessment for ASD",
    file_url: "behavioral_assessment.pdf",
    created_at: "2024-03-25T13:30:00Z",
  },
]

export const prescriptions: Prescription[] = [
  {
    id: 1,
    patient: 1,
    patient_name: "Rahul Sharma",
    medication_name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily (Morning & Night)",
    duration: "30 days",
    instructions: "Take after meals with water",
    notes: "Monitor blood sugar levels weekly. Follow low-sodium diet.",
    created_at: "2024-03-20T10:00:00Z",
  },
  {
    id: 2,
    patient: 1,
    patient_name: "Rahul Sharma",
    medication_name: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take before breakfast",
    notes: "For hypertension management",
    created_at: "2024-03-20T10:00:00Z",
  },
  {
    id: 3,
    patient: 4,
    patient_name: "Sneha Reddy",
    medication_name: "Methylphenidate",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take with breakfast",
    notes: "Continue speech therapy sessions twice a week.",
    created_at: "2024-03-22T11:00:00Z",
  },
]

export const invoices: Invoice[] = [
  {
    id: 1,
    patient: 1,
    patient_name: "Rahul Sharma",
    amount: 2500,
    status: "paid",
    description: "Consultation Fee, Blood Tests, ECG",
    invoice_date: "2024-03-20T10:00:00Z",
    due_date: "2024-04-03",
    payment_date: "2024-03-25",
    created_at: "2024-03-20T10:00:00Z",
  },
  {
    id: 2,
    patient: 4,
    patient_name: "Sneha Reddy",
    amount: 4000,
    status: "pending",
    description: "Consultation Fee, Therapy Session, Assessment Report",
    invoice_date: "2024-03-22T11:00:00Z",
    due_date: "2024-04-05",
    payment_date: null,
    created_at: "2024-03-22T11:00:00Z",
  },
  {
    id: 3,
    patient: 3,
    patient_name: "Amit Kumar",
    amount: 4000,
    status: "paid",
    description: "Consultation Fee, Cardiac Tests",
    invoice_date: "2024-03-15T14:00:00Z",
    due_date: "2024-03-29",
    payment_date: "2024-03-28",
    created_at: "2024-03-15T14:00:00Z",
  },
  {
    id: 4,
    patient: 5,
    patient_name: "Mohammed Ali",
    amount: 1500,
    status: "overdue",
    description: "Consultation Fee, X-Ray",
    invoice_date: "2024-02-28T09:00:00Z",
    due_date: "2024-03-14",
    payment_date: null,
    created_at: "2024-02-28T09:00:00Z",
  },
]

export const notifications: Notification[] = [
  {
    id: "N001",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Rahul Sharma has an appointment at 09:00 AM today",
    date: "2024-03-27T08:00:00",
    read: false,
  },
  {
    id: "N002",
    type: "report",
    title: "Pending Report",
    message: "Blood test results for Priya Patel are ready for review",
    date: "2024-03-26T14:30:00",
    read: false,
  },
  {
    id: "N003",
    type: "medicine",
    title: "Medicine Refill",
    message: "Amit Kumar&apos;s prescription expires in 5 days",
    date: "2024-03-25T10:00:00",
    read: true,
  },
  {
    id: "N004",
    type: "billing",
    title: "Payment Overdue",
    message: "Invoice #INV004 for Mohammed Ali is overdue",
    date: "2024-03-20T09:00:00",
    read: true,
  },
]

export const dashboardStats = {
  totalPatients: 156,
  todayAppointments: 8,
  pendingReports: 12,
  activeTreatments: 45,
  monthlyRevenue: 285000,
  weeklyRevenue: 68500,
}

export const patientGrowthData = [
  { month: "Jan", patients: 120 },
  { month: "Feb", patients: 132 },
  { month: "Mar", patients: 145 },
  { month: "Apr", patients: 156 },
  { month: "May", patients: 168 },
  { month: "Jun", patients: 180 },
]

export const appointmentData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 15 },
  { day: "Wed", appointments: 10 },
  { day: "Thu", appointments: 18 },
  { day: "Fri", appointments: 14 },
  { day: "Sat", appointments: 8 },
]

export const revenueData = [
  { month: "Jan", revenue: 245000 },
  { month: "Feb", revenue: 268000 },
  { month: "Mar", revenue: 285000 },
  { month: "Apr", revenue: 302000 },
  { month: "May", revenue: 318000 },
  { month: "Jun", revenue: 342000 },
]
