export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  // Basic validation
  if (!body.applicant_name || !body.applicant_email || !body.permit_type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.applicant_email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format',
    })
  }
  
  try {
    const response = await $fetch(`${config.backendBaseUrl}/applications`, {
      method: 'POST',
      body: {
        applicant_name: body.applicant_name,
        applicant_email: body.applicant_email,
        permit_type: body.permit_type,
      },
    })
    
    return response
  } catch (error) {
    console.error('Error creating permit:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create permit application',
    })
  }
})

