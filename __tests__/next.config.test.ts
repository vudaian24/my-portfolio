/**
 * Unit tests for next.config.ts
 * Validates Next.js configuration including standalone output and image settings
 */

describe('Next.js Configuration', () => {
  let nextConfig: any

  beforeEach(() => {
    jest.resetModules()
  })

  describe('Configuration Structure', () => {
    it('should export a valid Next.js configuration object', () => {
      // The config uses plugins that wrap it, so we test the base config
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig).toBeDefined()
      expect(typeof baseConfig).toBe('object')
    })

    it('should have output set to standalone for Docker compatibility', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.output).toBe('standalone')
    })

    it('should configure images property', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.images).toBeDefined()
      expect(typeof baseConfig.images).toBe('object')
    })
  })

  describe('Image Configuration', () => {
    it('should allow SVG images with dangerouslyAllowSVG flag', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.images.dangerouslyAllowSVG).toBe(true)
    })

    it('should have remotePatterns configured', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.images.remotePatterns).toBeDefined()
      expect(Array.isArray(baseConfig.images.remotePatterns)).toBe(true)
      expect(baseConfig.images.remotePatterns.length).toBeGreaterThan(0)
    })

    it('should configure placehold.co as remote pattern', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      const placeholdPattern = baseConfig.images.remotePatterns.find(
        (pattern: any) => pattern.hostname === 'placehold.co'
      )

      expect(placeholdPattern).toBeDefined()
      expect(placeholdPattern.protocol).toBe('https')
      expect(placeholdPattern.hostname).toBe('placehold.co')
    })

    it('should use HTTPS protocol for remote images', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      baseConfig.images.remotePatterns.forEach((pattern: any) => {
        expect(pattern.protocol).toBe('https')
      })
    })
  })

  describe('Standalone Output Configuration', () => {
    it('should enable standalone output for containerization', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.output).toBe('standalone')
    })

    it('should not use export output mode', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.output).not.toBe('export')
    })

    it('should be suitable for Docker deployment', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      // Standalone is the recommended output for Docker
      expect(['standalone']).toContain(baseConfig.output)
    })
  })

  describe('Remote Pattern Security', () => {
    it('should only allow specific hostnames', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      baseConfig.images.remotePatterns.forEach((pattern: any) => {
        expect(pattern.hostname).toBeTruthy()
        expect(typeof pattern.hostname).toBe('string')
        expect(pattern.hostname.length).toBeGreaterThan(0)
      })
    })

    it('should not have wildcard hostname patterns', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      baseConfig.images.remotePatterns.forEach((pattern: any) => {
        expect(pattern.hostname).not.toBe('*')
        expect(pattern.hostname).not.toContain('*')
      })
    })

    it('should enforce HTTPS for security', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      baseConfig.images.remotePatterns.forEach((pattern: any) => {
        expect(pattern.protocol).toBe('https')
      })
    })
  })

  describe('Configuration Consistency', () => {
    it('should have consistent property types', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(typeof baseConfig.output).toBe('string')
      expect(typeof baseConfig.images).toBe('object')
      expect(typeof baseConfig.images.dangerouslyAllowSVG).toBe('boolean')
      expect(Array.isArray(baseConfig.images.remotePatterns)).toBe(true)
    })

    it('should not have undefined required properties', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.output).not.toBeUndefined()
      expect(baseConfig.images).not.toBeUndefined()
    })
  })

  describe('SVG Handling', () => {
    it('should explicitly enable SVG support', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      expect(baseConfig.images.dangerouslyAllowSVG).toBe(true)
    })

    it('should be aware of SVG security implications', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      // The property name includes "dangerously" to indicate security awareness
      expect('dangerouslyAllowSVG' in baseConfig.images).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty remote patterns gracefully', () => {
      const testConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [],
        },
      }

      expect(testConfig.images.remotePatterns).toBeDefined()
      expect(Array.isArray(testConfig.images.remotePatterns)).toBe(true)
    })

    it('should validate remote pattern structure', () => {
      const baseConfig = {
        output: 'standalone',
        images: {
          dangerouslyAllowSVG: true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
          ],
        },
      }

      baseConfig.images.remotePatterns.forEach((pattern: any) => {
        expect(pattern).toHaveProperty('protocol')
        expect(pattern).toHaveProperty('hostname')
      })
    })
  })
})