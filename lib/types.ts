// Doctor/User types
export interface DoctorUser {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    phone: string
    specialization: string
    is_doctor?: boolean
    is_active: boolean
    date_joined: string
  }
  
  // Patient types
  export interface Patient {
    id: number
    doctor: number
    patient_id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    date_of_birth: string
    gender: 'M' | 'F' | 'O'
    address: string
    medical_history: string
    created_at: string
    updated_at: string
  }
  
  // Appointment types
  export enum AppointmentStatus {
    SCHEDULED = 'scheduled',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
  }
  
  export interface Appointment {
    id: number
    patient: number | Patient
    patient_name?: string
    doctor: number
    appointment_date: string
    appointment_time?: string
    status: AppointmentStatus
    reason: string
    notes: string
    created_at: string
    updated_at: string
  }
  
  // Medical Record types
  export interface MedicalRecord {
    id: number
    patient: number
    doctor: number
    appointment: number | null
    diagnosis: string
    treatment: string
    medications: string
    vital_signs: Record<string, any>
    created_at: string
    updated_at: string
  }
  
  // Medical Report types
  export enum ReportType {
    LAB_TEST = 'lab_test',
    XRAY = 'xray',
    ULTRASOUND = 'ultrasound',
    CT_SCAN = 'ct_scan',
    MRI = 'mri',
    PRESCRIPTION = 'prescription',
    OTHER = 'other',
  }
  
  export interface MedicalReport {
    id: number
    patient: number | Patient
    doctor?: number
    report_type: ReportType
    title: string
    file: string
    file_url?: string
    file_size?: number
    uploaded_by?: string
    description?: string
    created_at: string
    updated_at?: string
  }
  
  // Prescription types
  export interface Prescription {
    id: number
    patient: number | Patient
    patient_name?: string
    doctor?: number
    medication_name: string
    created_at: string
    updated_at?: string
  }

  export interface BillingItem {
    id?: number
    medicine_name: string
    amount: string | number
  }
  
  // Billing types
  export enum BillingStatus {
    PENDING = 'pending',
    PAID = 'paid',
    OVERDUE = 'overdue',
    CANCELLED = 'cancelled',
  }
  
  export interface Billing {
    id: number
    patient: number | Patient
    patient_name?: string
    doctor?: number
    items?: BillingItem[]
    amount: string | number
    status: BillingStatus
    description: string
    invoice_date?: string
    due_date: string
    paid_date?: string | null
    payment_date?: string | null
    created_at: string
    updated_at?: string
  }
  
  export interface BillingStats {
    total_patients: number
    total_appointments: number
    total_pending: string
    total_paid: string
    total_revenue: string
    pending_count: number
    overdue_count: number
  }
  
  // Dashboard stats types
  export interface DashboardStats {
    total_patients: number
    today_appointments: number
    upcoming_appointments: number
    pending_invoices: number
    total_revenue: string
  }
  
