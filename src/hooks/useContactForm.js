import { useState, useCallback, useEffect, useRef } from 'react'
import { SubmitContactMessage } from '../core/usecases/SubmitContactMessage'
import { FormSubmitContactService } from '../infrastructure/services/FormSubmitContactService'
import { CONTACT_EMAIL } from '../data/portfolioData'

// Khởi tạo instance mặc định của Infrastructure Service (FormSubmit) & Use Case
const defaultContactService = new FormSubmitContactService({ targetEmail: CONTACT_EMAIL })
const defaultSubmitUseCase = new SubmitContactMessage(defaultContactService)

/**
 * Presenter / Controller Hook: useContactForm
 * Kết nối giữa React View và Lớp Use Case Clean Architecture
 */
export function useContactForm(
  initialValues = { name: '', email: '', message: '', website: '' },
  submitUseCase = defaultSubmitUseCase
) {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)
  const resetTimerRef = useRef(null)

  // Dọn timer reset form khi component bị unmount
  useEffect(() => () => clearTimeout(resetTimerRef.current), [])

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

      // Honeypot bị điền => nhiều khả năng là bot: giả lập thành công, không gửi đi
      if (formData.website) {
        setIsSubmitted(true)
        return
      }

      setIsSubmitting(true)

      let result
      try {
        result = await submitUseCase.execute(formData)
      } catch (err) {
        setServerError(err?.message || 'Đã có lỗi xảy ra, vui lòng thử lại.')
        return
      } finally {
        setIsSubmitting(false)
      }

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
      clearTimeout(resetTimerRef.current)
      resetTimerRef.current = setTimeout(() => {
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
