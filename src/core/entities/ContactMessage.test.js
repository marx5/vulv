import { describe, it, expect } from 'vitest'
import { ContactMessage } from './ContactMessage'

describe('ContactMessage', () => {
  it('trims input values', () => {
    const m = new ContactMessage({ name: '  An  ', email: ' a@b.co ', message: '  hello world ' })
    expect(m.name).toBe('An')
    expect(m.email).toBe('a@b.co')
    expect(m.message).toBe('hello world')
  })

  it('accepts valid data', () => {
    const m = new ContactMessage({ name: 'Vu', email: 'vu@example.com', message: 'Xin chào bạn' })
    expect(m.validate()).toEqual({ isValid: true, errors: {} })
  })

  it('reports errors for empty input', () => {
    const { isValid, errors } = new ContactMessage({}).validate()
    expect(isValid).toBe(false)
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  it('rejects short name, bad email and short message', () => {
    const { errors } = new ContactMessage({ name: 'A', email: 'not-an-email', message: 'hey' }).validate()
    expect(errors.name).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
  })

  it('toDTO returns ISO createdAt', () => {
    const dto = new ContactMessage({ name: 'Vu', email: 'vu@example.com', message: 'Xin chào' }).toDTO()
    expect(new Date(dto.createdAt).toISOString()).toBe(dto.createdAt)
  })
})
