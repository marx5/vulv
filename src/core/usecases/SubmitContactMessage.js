import { ContactMessage } from '../entities/ContactMessage'

/**
 * Use Case: SubmitContactMessage
 * Điều phối luồng nghiệp vụ gửi tin nhắn liên hệ (Application Business Rules)
 * - Khởi tạo entity ContactMessage
 * - Kiểm tra tính hợp lệ (Validation)
 * - Chuyển tiếp tới Gateway hạ tầng
 * - 0% phụ thuộc vào React, UI hoặc DOM
 */
export class SubmitContactMessage {
  /**
   * @param {import('../ports/ContactGateway').ContactGateway} contactGateway
   */
  constructor(contactGateway) {
    if (!contactGateway) {
      throw new Error('SubmitContactMessage requires a ContactGateway implementation')
    }
    this.contactGateway = contactGateway
  }

  /**
   * Thực thi Use Case
   * @param {{ name: string, email: string, message: string }} input
   * @returns {Promise<{ success: boolean, errors?: Record<string, string>, messageId?: string, error?: string }>}
   */
  async execute(input) {
    const messageEntity = new ContactMessage(input)
    const validation = messageEntity.validate()

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
      }
    }

    try {
      const response = await this.contactGateway.sendMessage(messageEntity)
      return response
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Đã có lỗi xảy ra khi gửi tin nhắn',
      }
    }
  }
}
