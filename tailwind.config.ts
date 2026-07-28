import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', lg: '2.5rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        /* Via França brand tokens */
        brand: {
          red: 'hsl(var(--brand-red))',
          wine: 'hsl(var(--brand-wine))',
          navy: 'hsl(var(--brand-navy))',
        },
        /* Único vermelho legível sobre a faixa vinho. */
        'red-on-dark': 'hsl(var(--red-on-dark))',
        ink: 'hsl(var(--ink))',
        paper: 'hsl(var(--paper))',
        surface: 'hsl(var(--surface))',
        neutral: 'hsl(var(--neutral))',
        line: {
          warm: 'hsl(var(--line-warm))',
          cool: 'hsl(var(--line-cool))',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Work Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.22em' }],
        label: ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.16em' }],
      },
      /* Toda a escala deriva de --radius (18px). Trocar o token move o sistema
         inteiro; nenhum componente crava pixel de raio. */
      borderRadius: {
        sm: 'calc(var(--radius) - 10px)' /*  8px */,
        md: 'calc(var(--radius) - 6px)' /* 12px */,
        lg: 'var(--radius)' /* 18px */,
        xl: 'calc(var(--radius) + 6px)' /* 24px */,
        '2xl': 'calc(var(--radius) + 14px)' /* 32px */,
        panel: 'clamp(24px, 3vw, 44px)' /* faixas sangradas */,
      },
      transitionTimingFunction: {
        /* expo-out — padrão de toda entrada de conteúdo */
        fluid: 'cubic-bezier(0.16, 1, 0.3, 1)',
        /* mais contida — hover e microinteração */
        lux: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      /* Spread negativo alto: sombra larga, suavíssima e tingida. Nunca cinza —
         numa direção clara, sombra neutra suja o papel. */
      boxShadow: {
        lift: '0 28px 56px -40px rgba(0, 12, 29, 0.34)',
        warm: '0 24px 60px -40px rgba(179, 29, 34, 0.26)',
        glass: '0 18px 50px -30px rgba(0, 12, 29, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        glow: '0 14px 38px -18px rgba(179, 29, 34, 0.55)',
        'glow-lg': '0 26px 54px -20px rgba(179, 29, 34, 0.62)',
      },
      maxWidth: {
        measure: '62ch',
        prose: '48ch',
      },
    },
  },
  plugins: [animate],
} satisfies Config
