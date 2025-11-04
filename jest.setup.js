// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock environment variables
process.env.PAYLOAD_SECRET = 'test-secret-key-for-testing'
process.env.DATABASE_URI = 'mongodb://localhost:27017/test-db'
process.env.NODE_ENV = 'test'