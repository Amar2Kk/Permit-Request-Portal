<template>
  <div>
    <div class="mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        إدارة طلبات التصاريح
      </h2>
      <p class="text-sm sm:text-base text-gray-600">
        إدارة وتحديث حالة طلبات التصاريح
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

    <!-- Applications Table -->
    <div v-if="applications && applications.length > 0" class="card overflow-hidden p-0">
      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الاسم
              </th>
              <th
                class="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                البريد الإلكتروني
              </th>
              <th
                class="hidden lg:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نوع التصريح
              </th>
              <th class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th
                class="hidden sm:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
              <th class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="application in applications" :key="application.id">
              <td class="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">
                <div class="truncate max-w-[100px] sm:max-w-none">
                  {{ application.applicant_name }}
                </div>
                <div class="md:hidden text-xs text-gray-500 mt-1 truncate">
                  {{ application.applicant_email }}
                </div>
              </td>
              <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ application.applicant_email }}
              </td>
              <td class="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ application.permit_type }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <UiBadge :variant="getStatusVariant(application.application_status)">
                  {{ getStatusLabel(application.application_status) }}
                </UiBadge>
              </td>
              <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                {{ formatDate(application.submitted_at) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1 sm:gap-2 sm:space-x-2 sm:space-x-reverse">
                  <button v-if="application.application_status !== 'APPROVED'"
                    @click="updateStatus(application.id, 'APPROVED')" :disabled="updatingId === application.id"
                    class="text-success-600 hover:text-success-900 disabled:opacity-50 whitespace-nowrap">
                    قبول
                  </button>
                  <button v-if="application.application_status !== 'REJECTED'"
                    @click="updateStatus(application.id, 'REJECTED')" :disabled="updatingId === application.id"
                    class="text-danger-600 hover:text-danger-900 disabled:opacity-50 whitespace-nowrap">
                    رفض
                  </button>
                  <button v-if="application.application_status !== 'PENDING'"
                    @click="updateStatus(application.id, 'PENDING')" :disabled="updatingId === application.id"
                    class="text-warning-600 hover:text-warning-900 disabled:opacity-50 whitespace-nowrap">
                    مراجعة
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="card text-center py-12">
      <div class="flex justify-center mb-4 text-gray-400">
        <span class="w-16 h-16 flex items-center justify-center" v-html="processSvg(clipboardIcon)" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        لا توجد طلبات
      </h3>
      <p class="text-gray-600">
        لم يتم تقديم أي طلبات حتى الآن
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PermitApplication } from '~/types'
import clipboardIcon from '~/assets/icons/Clipboard.svg?raw'

const { getStatusLabel } = usePermits()
const { success, error: showError } = useToast()
const updatingId = ref<string | null>(null)

// Helper function to process SVG for proper sizing
function processSvg(svgContent: string, size: string = '100%'): string {
  return svgContent
    .replace(/width="[^"]*"/g, `width="${size}"`)
    .replace(/height="[^"]*"/g, `height="${size}"`)
    .replace(/<svg/, '<svg class="w-full h-full"')
}

// Fetch applications
const { data: applications, pending, error, refresh } = await useAsyncData<PermitApplication[]>(
  'admin-permits',
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
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

async function updateStatus(id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') {
  if (updatingId.value) return

  updatingId.value = id

  try {
    await $fetch(`/api/permits/${id}`, {
      method: 'PATCH',
      body: {
        application_status: status,
      },
    })

    success('تم تحديث حالة الطلب بنجاح')

    // Refresh the list
    await refresh()
  } catch (err) {
    console.error('Error updating status:', err)
    showError('حدث خطأ أثناء تحديث الحالة')
  } finally {
    updatingId.value = null
  }
}
</script>
