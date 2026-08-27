import { ContactGateway } from '../../core/ports/ContactGateway'

/**
 * Infrastructure Service: MockContactService
 * Triển khai ContactGateway cho môi trường Client/Demo hoặc Local
 * Hỗ trợ lưu trữ local log và giả lập độ trễ mạng thực tế
 */
export class MockContactService extends ContactGateway {
  /**
   * @param {Object} options
   * @param {number} options.delayMs Giả lập độ trễ mạng
   */
  constructor({ delayMs = 600 } = {}) {
    super()
    this.delayMs = delayMs
  }

  /**
   * Gửi tin nhắn liên hệ
   * @param {import('../../core/entities/ContactMessage').ContactMessage} contactMessage
   */
  async sendMessage(contactMessage) {
    // Giả lập network latency
    await new Promise((resolve) => setTimeout(resolve, this.delayMs))

    const dto = contactMessage.toDTO()

    // Lưu vào LocalStorage để theo dõi (nếu có môi trường browser)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const existing = JSON.parse(localStorage.getItem('vulv_contact_messages') || '[]')
        existing.push(dto)
        localStorage.setItem('vulv_contact_messages', JSON.stringify(existing))
      }
    } catch {
      // Ignored for non-blocking local storage errors
    }

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
    }
  }
}
