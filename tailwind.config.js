import createTheme from '@eduzz/ui-tailwind-theme';

export default createTheme({
  prefix: 'uizz-layout-',
  content: ['./index.html', './**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeOut: 'fadeOut ease-in-out 0.5s forwards',
        fadeIn: 'fadeIn ease-in-out 0.5s forwards',
        loader: 'loader 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
        loaderShort: 'loaderShort 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite 1.5s'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        loader: {
          '0%': { left: '-35%', right: '100%' },
          '60%': { left: '100%', right: '-90%' },
          '100%': { left: '100%', right: '-90%' }
        },
        loaderShort: {
          '0%': { left: '-200%', right: '100%' },
          '60%': { left: '107%', right: '-8%' },
          '100%': { left: '107%', right: '-8%' }
        }
      }
    }
  },
  corePlugins: {
    preflight: false
  }
});
