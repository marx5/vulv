import { useState, useCallback, useMemo } from 'react'
import { SubmitContactMessage } from '../core/usecases/SubmitContactMessage'
import { FormSubmitContactService } from '../infrastructure/services/FormSubmitContactService'

// Khởi tạo instance mặc định của Infrastructure Service (FormSubmit) & Use Case
const defaultContactService = new FormSubmitContactService({ targetEmail: 'vulv.bnvn@gmail.com' })
const defaultSubmitUseCase = new SubmitContactMessage(defaultContactService)

/**
 * Presenter / Controller Hook: useContactForm
 * Kết nối giữa React View và Lớp Use Case Clean Architecture
 */
export function useContactForm(
  initialValues = { name: '', email: '', message: '' },
  submitUseCase = defaultSubmitUseCase
) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Xóa lỗi validation của field khi người dùng bắt đầu gõ lại
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev }
        delete next[name]
        return next
      }
      return prev
    })
  }, [])

  const handleSubmit = useCallback(
    async (e, onSuccess) => {
      if (e && e.preventDefault) e.preventDefault()

      setServerError(null)
      setIsSubmitting(true)

      const result = await submitUseCase.execute(formData)

      setIsSubmitting(false)

      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors)
        } else if (result.error) {
          setServerError(result.error)
        }
        return
      }

      // Thành công
      setErrors({})
      setIsSubmitted(true)

      if (onSuccess) {
        onSuccess(result)
      }

      // Reset form sau 3 giây
      setTimeout(() => {
        setFormData(initialValues)
        setIsSubmitted(false)
      }, 3000)
    },
    [formData, initialValues, submitUseCase]
  )

  return {
    formData,
    errors,
    serverError,
    isSubmitted,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
  }
}
