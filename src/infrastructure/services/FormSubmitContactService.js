import { ContactGateway } from '../../core/ports/ContactGateway'

/**
 * Infrastructure Service: FormSubmitContactService
 * Triển khai ContactGateway sử dụng FormSubmit.co AJAX Endpoint
 * Chuyển tiếp toàn bộ nội dung tin nhắn trực tiếp về hòm thư Email cá nhân
 */
export class FormSubmitContactService extends ContactGateway {
  /**
   * @param {Object} options
   * @param {string} options.targetEmail Email nhận thông báo
   */
  constructor({ targetEmail = 'vulv.bnvn@gmail.com' } = {}) {
    super()
    this.targetEmail = targetEmail
  }

  /**
   * Gửi tin nhắn qua FormSubmit.co API
   * @param {import('../../core/entities/ContactMessage').ContactMessage} contactMessage
   */
  async sendMessage(contactMessage) {
    const dto = contactMessage.toDTO()

    const payload = {
      name: dto.name,
      email: dto.email,
      message: dto.message,
      _subject: `[Portfolio VuLV] Tin nhắn mới từ ${dto.name}`,
      _template: 'table',
      _captcha: 'false',
    }

    const response = await fetch(`https://formsubmit.co/ajax/${this.targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || 'Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau hoặc gửi email trực tiếp.'
      )
    }

    const result = await response.json().catch(() => ({}))

    return {
      success: true,
      messageId: result.id || `msg_${Date.now()}`,
    }
  }
}
