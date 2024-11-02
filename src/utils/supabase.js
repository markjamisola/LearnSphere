import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const formActionDefault = {
    formProcess: false,
    formStatus: 200,
    formErrorMessage: '',
    formSuccessMessage: ''

}
export const isAuthenticated = async () => {
    const { data, error } = await supabase.auth.getSession()
  
    if (error) {
      console.error('Error getting session:', error.message)
      return false
    }
  
    return !!data.session
  }

  export const getUserInformation = async () => {
    const { data, error } = await supabase.auth.getUser()
  
    if (error || !data || !data.user) {
      console.error('Error getting user information:', error ? error.message : 'No user data')
      return null // Return null or some default value when there's no user
    }
  
    return data.user.user_metadata
  }
  