import { breakpoints, colors } from './lib/theme'
import tailwindPresetMantine from 'tailwind-preset-mantine'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [
    tailwindPresetMantine({
      mantineBreakpoints: breakpoints,
      mantineColors: colors,
    }),
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#3f53ff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
