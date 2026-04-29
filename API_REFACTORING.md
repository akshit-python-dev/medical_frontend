# API Refactoring Documentation

## Overview
Updated the patient detail page to use patient-specific API endpoints instead of fetching from multiple generic endpoints and filtering client-side.

## Backend API Endpoints Used

### Patient Detail Page - Patient-Specific Endpoints

The following endpoints are now used for the patient profile page:

#### 1. **Get Patient Detail**
```
GET /api/patients/{id}/
```
**Response:** `PatientDetailSerializer` - Returns complete patient data with nested relationships:
- `id`, `first_name`, `last_name`, `email`, `phone`, `date_of_birth`, `age`, `gender`, `address`, `medical_history`
- `appointments` - List of all appointments (nested)
- `medical_records` - List of all medical records (nested)
- `medical_reports` - List of all medical reports (nested)
- `bills` - List of all billing records (nested)

#### 2. **Get Patient Medical History**
```
GET /api/patients/{id}/medical_history/
```
**Response:** Array of `MedicalRecordSerializer`
- Contains complete medical records including diagnosis, treatment, vital signs
- Each record includes associated prescriptions

#### 3. **Get Upcoming Appointments**
```
GET /api/patients/{id}/upcoming_appointments/
```
**Response:** Array of `AppointmentSerializer`
- Filters appointments for status='scheduled' and future dates
- Ordered by appointment_date

#### 4. **Get Billing Summary**
```
GET /api/patients/{id}/billing_summary/
```
**Response:** JSON object with billing statistics
```json
{
  "total_bills": 10,
  "paid_amount": 50000,
  "pending_amount": 15000,
  "overdue_amount": 5000
}
```

## Frontend Changes

### usePatients Hook
The hook already includes these methods:
- `getPatient(id)` - Fetches patient with nested data
- `getPatientMedicalHistory(id)` - Fetches medical history
- `getUpcomingAppointments(id)` - Fetches upcoming appointments
- `getBillingSummary(id)` - Fetches billing summary

### Patient Detail Page (`app/dashboard/patients/[id]/page.tsx`)

#### Before (Issues)
```typescript
// Fetched from multiple generic endpoints
const { appointments } = useAppointments()        // All appointments globally
const { reports } = useMedicalReports()           // All reports globally
const { prescriptions } = usePrescriptions()      // All prescriptions globally
const { invoices } = useBillingStats()            // All invoices globally

// Then filtered client-side
const patientAppointments = appointments.filter((a) => a.patient === patientId)
const patientReports = reports.filter((r) => r.patient === patientId)
const patientPrescriptions = prescriptions.filter((p) => p.patient === patientId)
const patientInvoices = invoices.filter((i) => i.patient === patientId)
```

**Problems:**
- Fetches all global data (inefficient)
- Client-side filtering (wasteful bandwidth)
- Multiple separate API calls
- No single source of truth for patient data

#### After (Fixed)
```typescript
// Uses patient-specific endpoints
const { getPatient, getPatientMedicalHistory, getUpcomingAppointments, getBillingSummary } = usePatients()

// Fetches patient detail (includes nested appointments, reports, bills)
const patientData = await getPatient(patientId)  // PatientDetailSerializer
const appointments = patientData.appointments
const medicalReports = patientData.medical_reports
const bills = patientData.bills

// Fetches specific patient data
const medicalRecords = await getPatientMedicalHistory(patientId)
const prescriptions = medicalRecords.flatMap((r) => r.prescriptions)

// Fetches billing summary
const billingSummary = await getBillingSummary(patientId)
```

**Benefits:**
- Server-side filtering (only relevant data fetched)
- Single patient detail API call with nested data
- Specialized endpoints for specific queries
- Better performance and bandwidth usage
- Aligned with backend API design

## Data Flow

```
Patient Detail Page
  ├── usePatients hook
  │   ├── getPatient(id) → PatientDetailSerializer
  │   │   ├── patient info
  │   │   ├── appointments []
  │   │   ├── medical_reports []
  │   │   └── bills []
  │   │
  │   ├── getPatientMedicalHistory(id) → MedicalRecord[]
  │   │   ├── medical_record 1
  │   │   │   └── prescriptions []
  │   │   └── medical_record 2
  │   │       └── prescriptions []
  │   │
  │   ├── getUpcomingAppointments(id) → Appointment[]
  │   │
  │   └── getBillingSummary(id) → BillingSummary
  │       ├── total_bills
  │       ├── paid_amount
  │       ├── pending_amount
  │       └── overdue_amount
  │
  └── Tabs Rendering
      ├── Patient Info
      ├── Appointments (from patientData.appointments)
      ├── Medical Reports (from patientData.medical_reports)
      ├── Prescriptions (from medicalRecords[].prescriptions)
      └── Billing (from patientData.bills)
```

## Backend Response Examples

### Patient Detail Response
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "date_of_birth": "1990-05-15",
  "age": 34,
  "gender": "M",
  "address": "123 Main St, City",
  "medical_history": "Diabetes, Hypertension",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-04-29T15:30:00Z",
  "appointments": [
    {
      "id": 1,
      "appointment_date": "2024-05-10T10:00:00Z",
      "status": "scheduled",
      "reason": "General Checkup",
      "notes": "Regular checkup"
    }
  ],
  "medical_records": [
    {
      "id": 1,
      "diagnosis": "Type 2 Diabetes",
      "treatment": "Medication and diet control",
      "vital_signs": {"blood_pressure": "120/80"}
    }
  ],
  "medical_reports": [
    {
      "id": 1,
      "title": "Blood Test Report",
      "report_type": "lab_test",
      "file": "/media/reports/blood_test.pdf",
      "created_at": "2024-04-20T12:00:00Z"
    }
  ],
  "bills": [
    {
      "id": 1,
      "amount": "5000",
      "status": "paid",
      "invoice_date": "2024-04-01",
      "due_date": "2024-04-15"
    }
  ]
}
```

## API Best Practices Implemented

1. **Nested Serializers** - PatientDetailSerializer includes related data
2. **Filtering Server-Side** - Patient-specific endpoints return only relevant data
3. **Specialized Endpoints** - Dedicated endpoints for specific queries (medical_history, upcoming_appointments, billing_summary)
4. **Single Responsibility** - Each endpoint has a clear, focused purpose
5. **Bandwidth Optimization** - Only necessary data is fetched

## Migration Notes

- The patient detail page now requires fewer API calls
- No need to fetch global data and filter client-side
- Medical records are properly nested with their prescriptions
- Billing data comes directly from patient detail endpoint
- Backward compatible with existing hook implementations
