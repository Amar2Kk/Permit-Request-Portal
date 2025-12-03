import type { PermitApplication, CreatePermitDto } from '~/types'

export function usePermits() {
  const fetchPermits = async () => {
    return await $fetch<PermitApplication[]>('/api/permits')
  }

  const createPermit = async (data: CreatePermitDto) => {
    return await $fetch<PermitApplication>('/api/permits', {
      method: 'POST',
      body: data,
    })
  }

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      PENDING: 'قيد المراجعة',
      APPROVED: 'مقبول',
      REJECTED: 'مرفوض',
    }
    return labels[status] || status
  }

  const getStatusClass = (status: string): string => {
    const classes: Record<string, string> = {
      PENDING: 'badge-pending',
      APPROVED: 'badge-approved',
      REJECTED: 'badge-rejected',
    }
    return classes[status] || 'badge-pending'
  }

  return {
    fetchPermits,
    createPermit,
    getStatusLabel,
    getStatusClass,
  }
}

