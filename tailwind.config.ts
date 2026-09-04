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
        ink: '#161616',
        muted: '#66645F',
        line: '#DEDCD6',
        brand: {
          blue: '#D71920',
          green: '#99151A',
          red: '#D71920',
          ice: '#F3F1EC',
          silver: '#E8E6E1'
        }
      },
      boxShadow: {
        glow: '0 24px 70px rgba(30, 20, 18, 0.16)'
      }
    }
  },
  plugins: []
}

export default config
