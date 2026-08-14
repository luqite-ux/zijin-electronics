import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#617084',
        line: '#DDE8F3',
        brand: {
          blue: '#0867B6',
          green: '#00A389',
          red: '#E14B3B',
          ice: '#EAF6FF',
          silver: '#EEF2F6'
        }
      },
      boxShadow: {
        glow: '0 24px 80px rgba(0, 91, 172, 0.16)'
      }
    }
  },
  plugins: []
}

export default config
