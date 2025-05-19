import '@testing-library/jest-dom'

import { TextDecoder, TextEncoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

let globalStore = {}
const localStorageMock = {
  getItem: jest.fn(key => globalStore[key] || null),
  setItem: jest.fn((key, value) => {
    globalStore[key] = String(value)
  }),
  removeItem: jest.fn(key => {
    delete globalStore[key]
  }),
  clear: jest.fn(() => {
    globalStore = {}
  }),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

beforeEach(() => {
  localStorageMock.clear()
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
})
