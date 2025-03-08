/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          // Linear/Raycast风格色彩系统
          canvas: {
            DEFAULT: '#ffffff',
            dark: '#101112', // 暗色模式背景
          },
          panel: {
            DEFAULT: '#f9fafb',
            dark: '#17181a',
          },
          element: {
            DEFAULT: '#f3f4f6',
            dark: '#27282b',
          },
          divider: {
            DEFAULT: '#e5e7eb',
            dark: '#2e2f33',
          },
          content: {
            DEFAULT: '#111827',
            subtle: '#4b5563',
            dark: '#f9fafb',
            'dark-subtle': '#9ca3af',
          },
          primary: {
            DEFAULT: '#3b82f6',
            hover: '#2563eb',
            subtle: '#eff6ff',
            'subtle-hover': '#dbeafe',
            dark: '#60a5fa',
            'dark-hover': '#93c5fd',
          },
          success: {
            DEFAULT: '#10b981',
            hover: '#059669',
            subtle: '#ecfdf5',
            dark: '#34d399',
          },
          danger: {
            DEFAULT: '#ef4444',
            hover: '#dc2626',
            subtle: '#fef2f2',
            dark: '#f87171',
          },
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-out forwards',
          'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'slide-left': 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'slide-right': 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'bounce-in': 'bounceIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'pulse-once': 'pulse 2s ease-in-out 1',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideLeft: {
            '0%': { transform: 'translateX(10px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          slideRight: {
            '0%': { transform: 'translateX(-10px)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
          bounceIn: {
            '0%': { transform: 'scale(0.97)', opacity: '0' },
            '70%': { transform: 'scale(1.02)' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          pulse: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' },
          },
        },
        scale: {
          '98': '0.98',
          '102': '1.02',
        },
        fontFamily: {
          sans: [
            'Inter var',
            'Inter',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'sans-serif',
          ],
          mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
        },
        borderRadius: {
          sm: '0.25rem',
          DEFAULT: '0.375rem',
          md: '0.5rem',
          lg: '0.75rem',
          xl: '1rem',
        },
        boxShadow: {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
          'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
          'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
          'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
          'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
        },
        transitionTimingFunction: {
          'in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
          'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        },
      },
    },
    plugins: [],
  }
  