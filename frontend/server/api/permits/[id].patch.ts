export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  // Validate status
  const validStatuses = ['PENDING', 'APPROVED', 'REJECTED']
  if (body.application_status && !validStatuses.includes(body.application_status)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid application status',
    })
  }
  
  try {
    const response = await $fetch(`${config.backendBaseUrl}/applications/${id}`, {
      method: 'PATCH',
      body,
    })
    
    return response
  } catch (error) {
    console.error('Error updating permit:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update permit application',
    })
  }
})

