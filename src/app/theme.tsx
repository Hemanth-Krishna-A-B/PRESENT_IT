export const theme = {
  colors: {
    background: '#FEFFFC',
    surface: '#FFFFFF',
    primary: '#8116E0',
    primaryHover: '#6d12bc',
    accent: '#D0FF00',
    accentDark: '#6aff00',
    highlight: '#FF0543',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    border: '#d1d5db',
    phanton:"#fe572a",
  },
  size: {
    spacing: {
      xs: '0.25rem',   // 4px
      sm: '0.5rem',    // 8px
      md: '1rem',      // 16px
      lg: '1.5rem',    // 24px
      xl: '2.5rem',    // 40px
    },
    border: {
      width: {
        thin: '1px',
        medium: '2px',
      },
      radius: {
        sm: '4px',
        md: '6px',
        lg: '12px',
        full: '9999px',
      },
    },
    height: {
      input: '42px',
      button: '42px',
    },
  },
  fonts: {
    family: {
      sans: 'var(--font-geist-sans), sans-serif',
      mono: 'var(--font-geist-mono), monospace',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.75rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};
export type ThemeType = typeof theme;