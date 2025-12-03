export interface PermitApplication {
  id: string
  applicant_name: string
  applicant_email: string
  permit_type: string
  application_status: 'PENDING' | 'APPROVED' | 'REJECTED'
  submitted_at: string
}

export interface CreatePermitDto {
  applicant_name: string
  applicant_email: string
  permit_type: string
}

