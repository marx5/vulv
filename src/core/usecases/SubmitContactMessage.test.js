import { describe, it, expect, vi } from 'vitest'
import { SubmitContactMessage } from './SubmitContactMessage'

const validInput = { name: 'Vu', email: 'vu@example.com', message: 'Xin chào bạn' }

describe('SubmitContactMessage', () => {
  it('throws without a gateway', () => {
    expect(() => new SubmitContactMessage()).toThrow()
  })

  it('returns validation errors without calling the gateway', async () => {
    const gateway = { sendMessage: vi.fn() }
    const result = await new SubmitContactMessage(gateway).execute({ name: '', email: '', message: '' })
    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
    expect(gateway.sendMessage).not.toHaveBeenCalled()
  })

  it('forwards a valid message to the gateway', async () => {
    const gateway = { sendMessage: vi.fn().mockResolvedValue({ success: true, messageId: '1' }) }
    const result = await new SubmitContactMessage(gateway).execute(validInput)
    expect(gateway.sendMessage).toHaveBeenCalledOnce()
    expect(result).toEqual({ success: true, messageId: '1' })
  })

  it('converts gateway errors into a failed result', async () => {
    const gateway = { sendMessage: vi.fn().mockRejectedValue(new Error('boom')) }
    const result = await new SubmitContactMessage(gateway).execute(validInput)
    expect(result).toEqual({ success: false, error: 'boom' })
  })
})
