import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          deep: '#070910',
          DEFAULT: '#0B0E16',
          surface: '#11151E',
          elevated: '#161B26',
          border: '#1E2532',
          divider: '#2A3140',
        },
        amber: {
          iris: '#F4A261',
          bright: '#FFB76B',
          soft: 'rgba(244, 162, 97, 0.08)',
          line: 'rgba(244, 162, 97, 0.20)',
        },
        teal: {
          pupil: '#2EA59F',
          bright: '#3FB8AF',
          soft: 'rgba(46, 165, 159, 0.08)',
          line: 'rgba(46, 165, 159, 0.22)',
        },
        bone: {
          DEFAULT: '#F2EDE0',
          soft: '#D8D2C2',
          muted: '#9A968A',
          faint: '#858B9A',
        },
        sev: {
          crit: '#FF637A',
          'crit-hi': '#FF909E',
          high: '#FFA048',
          med: '#F4C640',
          low: '#60B2FF',
          info: '#8A95A8',
        },
        // Semantic "cleared / benign" green — mirrors the product's --ok. Used for the
        // "likely false positive" verdict so it reads as resolved, distinct from brand teal.
        ok: {
          DEFAULT: '#43D69C',
          soft: 'rgba(67, 214, 156, 0.10)',
          line: 'rgba(67, 214, 156, 0.30)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'wider-sm': '0.08em',
        'widest-sm': '0.14em',
      },
      animation: {
        'pulse-eye': 'pulseEye 4s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
        'tick': 'tick 12s linear infinite',
        'drift': 'drift 18s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        pulseEye: {
          '0%, 100%': { opacity: '0.9', filter: 'drop-shadow(0 0 12px rgba(45,212,191,0.35))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(45,212,191,0.6))' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        tick: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '33%': { transform: 'translate(8px,-6px)' },
          '66%': { transform: 'translate(-6px,4px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(46,165,159,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(46,165,159,0.04) 1px, transparent 1px)",
        'noise': "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
}
export default config
