import { useState, useCallback } from 'react'

/**
 * Hook quản lý trạng thái form liên hệ, validation và submit feedback
 */
export function useContactForm(initialValues = { name: '', email: '', message: '' }) {
  const [formData, setFormData] = useState(initialValues)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e, onSuccess) => {
    if (e && e.preventDefault) e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return
    }

    setIsSubmitting(true)
    setIsSubmitted(true)

    if (onSuccess) {
      onSuccess(formData)
    }

    setTimeout(() => {
      setFormData(initialValues)
      setIsSubmitting(false)
    }, 2000)
  }, [formData, initialValues])

  return {
    formData,
    isSubmitted,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
  }
}
