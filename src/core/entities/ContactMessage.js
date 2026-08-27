/**
 * Domain Entity: ContactMessage
 * Đóng gói quy tắc nghiệp vụ và tính toàn vẹn (business invariants) của tin nhắn liên hệ
 * Thuần JavaScript - Không có phụ thuộc vào bất kỳ UI Framework nào (dep-no-framework-imports)
 */
export class ContactMessage {
  constructor({ name, email, message }) {
    this.name = (name || '').trim()
    this.email = (email || '').trim()
    this.message = (message || '').trim()
    this.createdAt = new Date()
  }

  /**
   * Kiểm tra tính hợp lệ của tin nhắn theo chuẩn Business Invariants
   * @returns {{ isValid: boolean, errors: Record<string, string> }}
   */
  validate() {
    const errors = {}

    if (!this.name) {
      errors.name = 'Vui lòng nhập họ và tên'
    } else if (this.name.length < 2) {
      errors.name = 'Tên phải có tối thiểu 2 ký tự'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!this.email) {
      errors.email = 'Vui lòng nhập địa chỉ email'
    } else if (!emailRegex.test(this.email)) {
      errors.email = 'Địa chỉ email không đúng định dạng'
    }

    if (!this.message) {
      errors.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (this.message.length < 5) {
      errors.message = 'Nội dung tin nhắn phải có ít nhất 5 ký tự'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  toDTO() {
    return {
      name: this.name,
      email: this.email,
      message: this.message,
      createdAt: this.createdAt.toISOString(),
    }
  }
}
