export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  
  try {
    const response = await $fetch(`${config.backendBaseUrl}/applications`, {
      method: 'GET',
    })
    
    return response
  } catch (error) {
    console.error('Error fetching permits:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch permit applications',
    })
  }
})

