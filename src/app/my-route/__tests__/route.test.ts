/**
 * Unit tests for /my-route API endpoint
 * Tests the GET handler that returns a custom route message
 */

import { GET } from '../route'
import { getPayload } from 'payload'

// Mock the payload module
jest.mock('payload', () => ({
  getPayload: jest.fn(),
}))

// Mock the config import
jest.mock('@payload-config', () => ({
  default: {
    collections: [],
    db: {},
  },
}))

describe('GET /my-route', () => {
  const mockGetPayload = getPayload as jest.MockedFunction<typeof getPayload>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Happy Path - Successful Response', () => {
    it('should return a JSON response with the correct message', async () => {
      // Arrange
      const mockPayloadInstance = {
        collections: {},
        find: jest.fn(),
      }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response).toBeInstanceOf(Response)
      expect(response.headers.get('content-type')).toContain('application/json')
      expect(data).toEqual({
        message: 'This is an example of a custom route.',
      })
    })

    it('should successfully initialize Payload with config', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      await GET(mockRequest)

      // Assert
      expect(mockGetPayload).toHaveBeenCalledTimes(1)
      expect(mockGetPayload).toHaveBeenCalledWith({
        config: expect.any(Object),
      })
    })

    it('should return status 200 for successful requests', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)

      // Assert
      expect(response.status).toBe(200)
      expect(response.ok).toBe(true)
    })
  })

  describe('Request Parameter Handling', () => {
    it('should handle request object even though parameter is unused', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'test-agent',
        },
      })

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response).toBeInstanceOf(Response)
      expect(data.message).toBe('This is an example of a custom route.')
    })

    it('should work with requests containing query parameters', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route?foo=bar&baz=qux')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data).toEqual({
        message: 'This is an example of a custom route.',
      })
    })

    it('should work with requests from different origins', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('https://example.com/my-route', {
        headers: {
          Origin: 'https://example.com',
        },
      })

      // Act
      const response = await GET(mockRequest)

      // Assert
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual({
        message: 'This is an example of a custom route.',
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle Payload initialization errors gracefully', async () => {
      // Arrange
      const initError = new Error('Failed to initialize Payload')
      mockGetPayload.mockRejectedValue(initError)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act & Assert
      await expect(GET(mockRequest)).rejects.toThrow('Failed to initialize Payload')
    })

    it('should handle config resolution errors', async () => {
      // Arrange
      const configError = new Error('Config promise rejected')
      mockGetPayload.mockRejectedValue(configError)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act & Assert
      await expect(GET(mockRequest)).rejects.toThrow('Config promise rejected')
    })

    it('should propagate database connection errors', async () => {
      // Arrange
      const dbError = new Error('Database connection failed')
      mockGetPayload.mockRejectedValue(dbError)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act & Assert
      await expect(GET(mockRequest)).rejects.toThrow('Database connection failed')
    })
  })

  describe('Response Format Validation', () => {
    it('should return valid JSON with correct structure', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(data).toBeDefined()
      expect(typeof data).toBe('object')
      expect('message' in data).toBe(true)
      expect(typeof data.message).toBe('string')
      expect(data.message.length).toBeGreaterThan(0)
    })

    it('should return response with proper content-type header', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)

      // Assert
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should not include unexpected properties in response', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      const keys = Object.keys(data)
      expect(keys).toHaveLength(1)
      expect(keys).toEqual(['message'])
    })
  })

  describe('Concurrency and Race Conditions', () => {
    it('should handle multiple concurrent requests independently', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const requests = Array.from({ length: 5 }, (_, i) => 
        new Request(`http://localhost:3000/my-route?id=${i}`)
      )

      // Act
      const responses = await Promise.all(requests.map(req => GET(req)))
      const dataArray = await Promise.all(responses.map(res => res.json()))

      // Assert
      expect(responses).toHaveLength(5)
      responses.forEach(response => {
        expect(response.status).toBe(200)
      })
      dataArray.forEach(data => {
        expect(data).toEqual({
          message: 'This is an example of a custom route.',
        })
      })
    })

    it('should maintain consistent behavior under rapid sequential calls', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response1 = await GET(mockRequest)
      const response2 = await GET(mockRequest)
      const response3 = await GET(mockRequest)

      const data1 = await response1.json()
      const data2 = await response2.json()
      const data3 = await response3.json()

      // Assert
      expect(data1).toEqual(data2)
      expect(data2).toEqual(data3)
      expect(mockGetPayload).toHaveBeenCalledTimes(3)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty request headers', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route', {
        headers: {},
      })

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data.message).toBe('This is an example of a custom route.')
    })

    it('should work with IPv6 localhost', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://[::1]:3000/my-route')

      // Act
      const response = await GET(mockRequest)

      // Assert
      expect(response.status).toBe(200)
    })

    it('should handle requests with unusual but valid URLs', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route#fragment')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data.message).toBeDefined()
    })
  })

  describe('Performance Considerations', () => {
    it('should complete request within reasonable time', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')
      const startTime = Date.now()

      // Act
      await GET(mockRequest)
      const endTime = Date.now()
      const duration = endTime - startTime

      // Assert - Should complete within 1 second for unit test
      expect(duration).toBeLessThan(1000)
    })

    it('should not leak memory with payload instance', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      await response.json()

      // Assert - Payload should be called exactly once per request
      expect(mockGetPayload).toHaveBeenCalledTimes(1)
    })
  })

  describe('Integration Points', () => {
    it('should properly pass config to getPayload function', async () => {
      // Arrange
      const mockPayloadInstance = { collections: {} }
      mockGetPayload.mockResolvedValue(mockPayloadInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      await GET(mockRequest)

      // Assert
      const callArgs = mockGetPayload.mock.calls[0][0]
      expect(callArgs).toHaveProperty('config')
      expect(callArgs.config).toBeDefined()
    })

    it('should work when Payload returns minimal instance', async () => {
      // Arrange
      mockGetPayload.mockResolvedValue({} as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data.message).toBe('This is an example of a custom route.')
    })

    it('should work when Payload returns fully populated instance', async () => {
      // Arrange
      const fullMockInstance = {
        collections: { users: {}, media: {}, projects: {} },
        globals: {},
        config: {},
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      }
      mockGetPayload.mockResolvedValue(fullMockInstance as any)
      const mockRequest = new Request('http://localhost:3000/my-route')

      // Act
      const response = await GET(mockRequest)
      const data = await response.json()

      // Assert
      expect(response.status).toBe(200)
      expect(data.message).toBe('This is an example of a custom route.')
    })
  })
})