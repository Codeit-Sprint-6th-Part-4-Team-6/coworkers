import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  presets: [require("tailwindcss-preset-px-to-rem")],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: { min: '744px' },
      lg: { min: '1200px' },
    },
    fontSize: {
      '4xl': ['40px', '48px'],
      '3xl': ['32px', '38px'],
      '2xl': ['24px', '28px'],
      'xl': ['20px', '24px'],
      '2lg': ['18px', '21px'],
      'lg': ['16px', '19px'],
      'md': ['14px', '17px'],
      'sm': ['13px', '16px'],
      'xs': ['12px', '14px'],
    },
    colors: {
      brand: {
        primary: '#10B981',
        secondary: '#34D399',
        tertiary: '#A3E635',
        'gradient-start': '#108981',
        'gradient-end': '#A3E635',
      },
      point: {
        green: '#10B981',
        purple: '#A855F7',
        blue: '#3B82F6',
        cyan: '#06B6D4',
        pink: '#EC4899',
        rose: '#F43F5E',
        red: '#DC2626',
        orange: '#F97316',
        yellow: '#EAB308',
      },
      background: {
        primary: '#0F172A',
        secondary: '#1E293B',
        tertiary: '#334155',
        inverse: '#FFFFFF',
      },
      interaction: {
        inactive: '#94A3B8',
        hover: '#059669',
        pressed: '#047857',
        focus: '#10B981',
      },
      border: {
        primary: 'rgba(248, 250, 252, 0.1)',
        white: '#ffffff'
      },
      text: {
        primary: '#F8FAFC',
        secondary: '#CBD5E1',
        tertiary: '#E2E8F0',
        default: '#64748B',
        inverse: '#FFFFFF',
        disabled: '#94A3B8',
        gray400: '#9ca3af',
      },
      status: {
        danger: '#DC2626',
      },
      icon: {
        primary: '#64748B',
        inverse: '#F8FAFC',
        brand: '#10B981',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.modal': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '48px',
          paddingRight: '48px',
          paddingTop: '40px',
          paddingBottom: '40px',
        },
        '.modal-close-icon': {
          position: 'absolute',
          right: '16px',
          top: '16px',
          marginLeft: 'auto',
          cursor: 'pointer',
        },
        '.modal-title': {
          margin: 'auto',
          marginBottom: '10px',
          color: '#F8FAFC',
          fontWeight: '500',
          fontSize: '16px',
        },
        '.modal-content': {
          margin: 'auto',
          marginBottom: '30px',
          color: '#CBD5E1',
          fontWeight: '500',
          fontSize: '14px',
          textAlign: 'center',
        }
      });
    },
    function ({ addVariant }: PluginAPI) {
      addVariant('light', ['.light &', 'html:not(.dark) &', '@media (prefers-color-scheme: light)']);
    }
  ],
  darkMode: 'selector',
};

export default config;
