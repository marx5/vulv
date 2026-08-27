/**
 * Port Interface: ContactGateway
 * Định nghĩa hợp đồng (contract) giao tiếp với hạ tầng gửi tin nhắn (Mock, REST API, Webhook, etc.)
 * Tuân thủ nguyên tắc Dependency Inversion: Use case phụ thuộc vào Port, không phụ thuộc vào triển khai cụ thể
 */
export class ContactGateway {
  /**
   * Gửi tin nhắn liên hệ
   * @param {import('../entities/ContactMessage').ContactMessage} contactMessage
   * @returns {Promise<{ success: boolean, messageId?: string, error?: string }>}
   */
  async sendMessage(contactMessage) {
    throw new Error('Method sendMessage() must be implemented')
  }
}
