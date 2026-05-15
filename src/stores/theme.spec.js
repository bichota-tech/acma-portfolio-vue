import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from './theme'

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock window.matchMedia para tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('should have toggleTheme action', () => {
    const store = useThemeStore()
    expect(typeof store.toggleTheme).toBe('function')
  })

  it('should have applyTheme action', () => {
    const store = useThemeStore()
    expect(typeof store.applyTheme).toBe('function')
  })

  it('should have setDark action', () => {
    const store = useThemeStore()
    expect(typeof store.setDark).toBe('function')
  })
})
