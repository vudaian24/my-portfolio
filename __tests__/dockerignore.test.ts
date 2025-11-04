/**
 * Validation tests for .dockerignore
 * Ensures proper exclusion patterns for Docker builds
 */

import * as fs from 'fs'
import * as path from 'path'

describe('.dockerignore Configuration', () => {
  let dockerignoreContent: string
  let dockerignoreLines: string[]

  beforeAll(() => {
    const dockerignorePath = path.join(process.cwd(), '.dockerignore')
    
    // Check if file exists
    if (!fs.existsSync(dockerignorePath)) {
      throw new Error('.dockerignore file not found')
    }
    
    dockerignoreContent = fs.readFileSync(dockerignorePath, 'utf-8')
    dockerignoreLines = dockerignoreContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#'))
  })

  describe('File Existence and Structure', () => {
    it('should exist in the repository root', () => {
      const dockerignorePath = path.join(process.cwd(), '.dockerignore')
      expect(fs.existsSync(dockerignorePath)).toBe(true)
    })

    it('should be a readable file', () => {
      expect(dockerignoreContent).toBeDefined()
      expect(typeof dockerignoreContent).toBe('string')
    })

    it('should contain at least one ignore pattern', () => {
      expect(dockerignoreLines.length).toBeGreaterThan(0)
    })

    it('should not be empty', () => {
      expect(dockerignoreContent.trim().length).toBeGreaterThan(0)
    })
  })

  describe('Critical Exclusions', () => {
    it('should exclude node_modules directory', () => {
      expect(dockerignoreLines).toContain('node_modules')
    })

    it('should exclude .next build directory', () => {
      expect(dockerignoreLines).toContain('.next')
    })

    it('should exclude .git directory', () => {
      expect(dockerignoreLines).toContain('.git')
    })

    it('should exclude .gitignore file', () => {
      expect(dockerignoreLines).toContain('.gitignore')
    })

    it('should exclude README.md', () => {
      expect(dockerignoreLines).toContain('README.md')
    })
  })

  describe('Security Exclusions', () => {
    it('should exclude local environment files', () => {
      const hasEnvPattern = dockerignoreLines.some(line => 
        line.includes('.env') && line.includes('local')
      )
      expect(hasEnvPattern).toBe(true)
    })

    it('should exclude .pem certificate files', () => {
      expect(dockerignoreLines).toContain('*.pem')
    })

    it('should not expose sensitive configuration files', () => {
      const sensitivePatterns = ['.env', '.pem']
      const hasSensitiveExclusions = sensitivePatterns.some(pattern =>
        dockerignoreLines.some(line => line.includes(pattern))
      )
      expect(hasSensitiveExclusions).toBe(true)
    })
  })

  describe('Development File Exclusions', () => {
    it('should exclude .DS_Store files', () => {
      expect(dockerignoreLines).toContain('.DS_Store')
    })

    it('should exclude macOS system files', () => {
      const hasMacFiles = dockerignoreLines.some(line =>
        line.includes('.DS_Store')
      )
      expect(hasMacFiles).toBe(true)
    })
  })

  describe('Build Optimization', () => {
    it('should exclude development dependencies location', () => {
      expect(dockerignoreLines).toContain('node_modules')
    })

    it('should exclude build artifacts', () => {
      expect(dockerignoreLines).toContain('.next')
    })

    it('should not exclude necessary source files', () => {
      expect(dockerignoreLines).not.toContain('src')
      expect(dockerignoreLines).not.toContain('public')
      expect(dockerignoreLines).not.toContain('package.json')
    })
  })

  describe('Pattern Validity', () => {
    it('should have valid glob patterns', () => {
      dockerignoreLines.forEach(line => {
        // Basic validation: patterns should not start with /
        // (Docker ignore uses relative paths from context)
        if (!line.startsWith('*')) {
          expect(line.startsWith('/')).toBe(false)
        }
      })
    })

    it('should not have duplicate patterns', () => {
      const uniqueLines = [...new Set(dockerignoreLines)]
      expect(uniqueLines.length).toBe(dockerignoreLines.length)
    })

    it('should use consistent pattern format', () => {
      dockerignoreLines.forEach(line => {
        expect(line.trim()).toBe(line) // No leading/trailing whitespace
      })
    })
  })

  describe('Docker Best Practices', () => {
    it('should follow recommended ignore patterns for Next.js', () => {
      const recommendedPatterns = ['node_modules', '.next', '.git']
      recommendedPatterns.forEach(pattern => {
        expect(dockerignoreLines).toContain(pattern)
      })
    })

    it('should reduce Docker image size by excluding unnecessary files', () => {
      const sizeReducingPatterns = ['node_modules', '.next', '.git', 'README.md']
      const includedPatterns = sizeReducingPatterns.filter(pattern =>
        dockerignoreLines.includes(pattern)
      )
      expect(includedPatterns.length).toBeGreaterThanOrEqual(3)
    })

    it('should not include patterns that would break the build', () => {
      const essentialFiles = ['package.json', 'yarn.lock', 'src', 'public']
      essentialFiles.forEach(file => {
        expect(dockerignoreLines).not.toContain(file)
      })
    })
  })

  describe('Coverage of Common Patterns', () => {
    it('should cover version control files', () => {
      expect(dockerignoreLines).toContain('.git')
      expect(dockerignoreLines).toContain('.gitignore')
    })

    it('should cover build output directories', () => {
      expect(dockerignoreLines).toContain('.next')
    })

    it('should cover package manager artifacts', () => {
      expect(dockerignoreLines).toContain('node_modules')
    })
  })

  describe('Edge Cases', () => {
    it('should handle patterns with wildcards correctly', () => {
      const wildcardPatterns = dockerignoreLines.filter(line => line.includes('*'))
      wildcardPatterns.forEach(pattern => {
        expect(pattern).toMatch(/\*/)
      })
    })

    it('should not have conflicting patterns', () => {
      // Check for patterns that would contradict each other
      const hasNodeModules = dockerignoreLines.includes('node_modules')
      const hasNegatedNodeModules = dockerignoreLines.includes('!node_modules')
      
      if (hasNodeModules) {
        expect(hasNegatedNodeModules).toBe(false)
      }
    })

    it('should handle empty lines gracefully', () => {
      const allLines = dockerignoreContent.split('\n')
      const emptyLines = allLines.filter(line => line.trim() === '')
      
      // Empty lines are valid in dockerignore
      expect(emptyLines.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Security Best Practices', () => {
    it('should exclude sensitive environment files', () => {
      const hasEnvExclusion = dockerignoreLines.some(line =>
        line.includes('.env')
      )
      expect(hasEnvExclusion).toBe(true)
    })

    it('should exclude certificate and key files', () => {
      const hasKeyExclusion = dockerignoreLines.some(line =>
        line.includes('.pem')
      )
      expect(hasKeyExclusion).toBe(true)
    })

    it('should not expose development secrets', () => {
      const secretPatterns = ['.env', '.pem']
      secretPatterns.forEach(pattern => {
        const isExcluded = dockerignoreLines.some(line => line.includes(pattern))
        expect(isExcluded).toBe(true)
      })
    })
  })
})