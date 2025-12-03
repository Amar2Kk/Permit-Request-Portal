<template>
  <div>
    <div class="mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        تقديم طلب تصريح جديد
      </h2>
      <p class="text-sm sm:text-base text-gray-600">
        يرجى ملء الحقول المطلوبة بعناية وفقًا للبيانات الرسمية
      </p>
    </div>

    <div class="max-w-5xl mx-auto">
      <UiCard>
        <div
          class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              بيانات مقدم الطلب
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              تأكد من مطابقة البيانات مع الهوية الرسمية لتسهيل عملية المراجعة.
            </p>
          </div>
          <div class="rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-800 max-w-xs">
            <p class="font-semibold mb-1">ملاحظات هامة</p>
            <ul class="space-y-0.5 list-disc list-inside">
              <li>جميع الحقول مطلوبة</li>
              <li>مراجعة الطلب خلال ٣-٥ أيام عمل</li>
            </ul>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Applicant Name -->
            <UiInput id="applicant_name" v-model="formData.applicant_name" label="اسم مقدم الطلب"
              placeholder="أدخل الاسم الرباعي كما في الهوية" required :error="errors.applicant_name" />

            <!-- Applicant Email -->
            <UiInput id="applicant_email" v-model="formData.applicant_email" type="email" label="البريد الإلكتروني"
              placeholder="name@example.com" required :error="errors.applicant_email" />

            <!-- Permit Type -->
            <UiInput id="permit_type" v-model="formData.permit_type" label="نوع التصريح"
              placeholder="أدخل نوع التصريح المطلوب" required :error="errors.permit_type" class="md:col-span-2" />
          </div>

          <!-- Actions -->
          <div class="flex justify-start border-t border-gray-200 mt-2 pt-4">
            <UiButton type="submit" variant="primary" :loading="isSubmitting" :disabled="isSubmitting"
              class="w-full sm:w-auto">
              {{ isSubmitting ? "جاري التقديم..." : "تقديم الطلب" }}
            </UiButton>
          </div>
        </form>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreatePermitDto } from "~/types";

const { createPermit } = usePermits();
const router = useRouter();
const { success, error: showError } = useToast();

// Form state
const formData = ref<CreatePermitDto>({
  applicant_name: "",
  applicant_email: "",
  permit_type: "",
});

const errors = ref<Partial<Record<keyof CreatePermitDto, string>>>({});
const isSubmitting = ref(false);

// Form validation
function validateForm(): boolean {
  errors.value = {};
  let isValid = true;

  if (!formData.value.applicant_name.trim()) {
    errors.value.applicant_name = "الاسم مطلوب";
    isValid = false;
  } else if (formData.value.applicant_name.trim().length < 3) {
    errors.value.applicant_name = "الاسم يجب أن يكون 3 أحرف على الأقل";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.value.applicant_email.trim()) {
    errors.value.applicant_email = "البريد الإلكتروني مطلوب";
    isValid = false;
  } else if (!emailRegex.test(formData.value.applicant_email)) {
    errors.value.applicant_email = "البريد الإلكتروني غير صحيح";
    isValid = false;
  }

  if (!formData.value.permit_type) {
    errors.value.permit_type = "نوع التصريح مطلوب";
    isValid = false;
  }

  return isValid;
}

// Handle form submission
async function handleSubmit() {
  if (!validateForm()) {
    showError("يرجى تصحيح الأخطاء في النموذج");
    return;
  }

  isSubmitting.value = true;

  try {
    await createPermit(formData.value);
    success(
      "تم تقديم الطلب بنجاح! سيتم توجيهك إلى قائمة الطلبات خلال 5 ثوانٍ...",
      5000
    );

    // Reset form and redirect after 5 seconds
    setTimeout(() => {
      resetForm();
      router.push("/");
    }, 5000);
  } catch (err) {
    console.error("Error submitting application:", err);
    showError("حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.");
  } finally {
    isSubmitting.value = false;
  }
}

// Reset form
function resetForm() {
  formData.value = {
    applicant_name: "",
    applicant_email: "",
    permit_type: "",
  };
  errors.value = {};
}
</script>
