<template>
  <div>
    <div class="mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        قائمة طلبات التصاريح
      </h2>
      <p class="text-sm sm:text-base text-gray-600">
        عرض جميع طلبات التصاريح المقدمة
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card bg-danger-50 border-danger-200">
      <p class="text-danger-600">حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!applications || applications.length === 0" class="card text-center py-12">
      <div class="text-6xl mb-4">📋</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        لا توجد طلبات
      </h3>
      <p class="text-gray-600 mb-6">
        لم يتم تقديم أي طلبات حتى الآن
      </p>
      <NuxtLink to="/apply">
        <UiButton variant="primary">
          تقديم طلب جديد
        </UiButton>
      </NuxtLink>
    </div>

    <!-- Applications List -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UiCard
        v-for="application in applications"
        :key="application.id"
        hover
      >
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ application.applicant_name }}
            </h3>
            <UiBadge :variant="getStatusVariant(application.application_status)">
              {{ getStatusLabel(application.application_status) }}
            </UiBadge>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-gray-600">
              <span class="font-medium">البريد الإلكتروني:</span>
              <span>{{ application.applicant_email }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-gray-600">
              <span class="font-medium">نوع التصريح:</span>
              <span>{{ application.permit_type }}</span>
            </div>
            
            <div class="flex items-center gap-2 text-gray-500 text-xs">
              <span class="font-medium">تاريخ التقديم:</span>
              <span>{{ formatDate(application.submitted_at) }}</span>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication } from '~/types'

const { getStatusLabel } = usePermits()

// Fetch applications
const { data: applications, pending, error } = await useAsyncData<PermitApplication[]>(
  'permits',
  () => $fetch('/api/permits')
)

function getStatusVariant(status: string): 'pending' | 'approved' | 'rejected' {
  const map: Record<string, 'pending' | 'approved' | 'rejected'> = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  }
  return map[status] || 'pending'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>

