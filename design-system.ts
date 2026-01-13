/**
 * Saylor Portal - Design System
 * =============================
 *
 * Este arquivo documenta o sistema de design do projeto,
 * incluindo cores, tipografia, espaçamentos e efeitos.
 *
 * Estética: Cyberpunk / Sci-Fi / Holográfico
 * Tema: Dark com acentos Emerald
 */

// ============================================
// CORES
// ============================================

export const colors = {
  // Background
  background: {
    primary: '#080810',      // Fundo principal (quase preto com tom azulado)
    secondary: '#0c0c18',    // Fundo secundário
    card: 'rgba(255, 255, 255, 0.02)',  // Fundo de cards
    cardHover: 'rgba(255, 255, 255, 0.04)', // Card hover
  },

  // Texto
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',    // Texto principal
    secondary: 'rgba(255, 255, 255, 0.6)',  // Texto secundário
    muted: 'rgba(255, 255, 255, 0.4)',      // Texto suave
    subtle: 'rgba(255, 255, 255, 0.25)',    // Texto muito suave
    ghost: 'rgba(255, 255, 255, 0.2)',      // Texto quase invisível
  },

  // Accent (Emerald - cor principal de destaque)
  accent: {
    primary: '#10b981',      // Emerald 500 - cor principal
    light: '#6ee7b7',        // Emerald 300 - versão clara
    lighter: '#a7f3d0',      // Emerald 200 - versão mais clara
    dark: '#065f46',         // Emerald 800 - versão escura
    darker: '#064e3b',       // Emerald 900 - versão mais escura

    // Com opacidade
    primary70: 'rgba(16, 185, 129, 0.7)',
    primary60: 'rgba(16, 185, 129, 0.6)',
    primary50: 'rgba(16, 185, 129, 0.5)',
    primary30: 'rgba(16, 185, 129, 0.3)',
    primary20: 'rgba(16, 185, 129, 0.2)',
  },

  // Bordas
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(16, 185, 129, 0.3)',   // Emerald border on hover
    subtle: 'rgba(255, 255, 255, 0.05)',
  },

  // Sombras
  shadow: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cardHover: '0 10px 15px -3px rgba(16, 185, 129, 0.05)',
    glow: '0 0 20px rgba(16, 185, 129, 0.3)',
  },

  // Status
  status: {
    online: '#10b981',       // Verde emerald
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
  },
} as const;

// ============================================
// TIPOGRAFIA
// ============================================

export const typography = {
  // Famílias
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: '"Orbitron", monospace',  // Para títulos sci-fi
    mono: 'ui-monospace, "SF Mono", monospace',
  },

  // Tamanhos (em px)
  fontSize: {
    xs: '9px',
    sm: '10px',
    base: '11px',
    md: '12px',
    lg: '13px',
    xl: '15px',
    '2xl': '18px',
    '3xl': '24px',
    '4xl': '32px',
    display: '48px',    // Texto de partículas
  },

  // Pesos
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
  },

  // Letter spacing
  letterSpacing: {
    tight: '0.1em',
    normal: '0.15em',
    wide: '0.2em',
    wider: '0.3em',
    widest: '0.4em',
  },

  // Line height
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// ============================================
// ESPAÇAMENTOS
// ============================================

export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
} as const;

// ============================================
// BORDAS & RAIOS
// ============================================

export const borders = {
  radius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',   // Pills/badges
  },
  width: {
    thin: '1px',
    medium: '2px',
  },
} as const;

// ============================================
// ANIMAÇÕES
// ============================================

export const animations = {
  // Durações
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.6s',
    slower: '1s',
  },

  // Easings
  easing: {
    default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'ease-in-out',
  },

  // Transições pré-definidas
  transition: {
    default: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fast: 'all 0.15s ease-out',
    color: 'color 0.3s ease, opacity 0.3s ease',
  },

  // Floating (para cards)
  floating: {
    distance: '6px',
    duration: '3s',
  },

  // Hover effects
  hover: {
    scale: 1.02,
    lift: '-8px',
  },
} as const;

// ============================================
// EFEITOS VISUAIS
// ============================================

export const effects = {
  // Backdrop blur
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
  },

  // Gradientes
  gradient: {
    background: `
      radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20, 25, 50, 0.4) 0%, transparent 70%),
      radial-gradient(ellipse 60% 40% at 70% 60%, rgba(30, 20, 45, 0.3) 0%, transparent 60%),
      radial-gradient(ellipse 50% 30% at 30% 40%, rgba(15, 25, 40, 0.3) 0%, transparent 50%)
    `,
    vignette: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
  },

  // Glow
  glow: {
    emerald: '0 0 20px rgba(16, 185, 129, 0.3)',
    white: '0 0 10px rgba(255, 255, 255, 0.2)',
  },
} as const;

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  base: 0,
  content: 10,
  overlay: 40,
  hud: 50,
  noise: 100,
  cursor: 9999,
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// COMPONENTES - Estilos padrão
// ============================================

export const components = {
  // Card padrão
  card: {
    background: colors.background.card,
    border: `1px solid ${colors.border.default}`,
    borderRadius: borders.radius.lg,
    padding: spacing[6],
    backdropFilter: effects.blur.sm,
  },

  // Badge/Tag
  badge: {
    fontSize: typography.fontSize.xs,
    padding: `${spacing[1]} ${spacing[2]}`,
    borderRadius: borders.radius.full,
    background: 'rgba(255, 255, 255, 0.05)',
    color: colors.text.muted,
  },

  // Link
  link: {
    color: colors.text.muted,
    hoverColor: colors.accent.primary70,
    transition: animations.transition.color,
  },

  // Divider
  divider: {
    height: '1px',
    background: colors.border.default,
    width: '48px',
  },
} as const;

// ============================================
// TAILWIND CLASSES - Mapeamento útil
// ============================================

export const tailwindClasses = {
  // Texto
  textPrimary: 'text-white/90',
  textSecondary: 'text-white/60',
  textMuted: 'text-white/40',
  textSubtle: 'text-white/25',
  textAccent: 'text-emerald-400/70',

  // Background
  bgCard: 'bg-white/[0.02]',
  bgCardHover: 'bg-white/[0.04]',

  // Border
  borderDefault: 'border-white/10',
  borderHover: 'border-emerald-500/30',

  // Tracking (letter-spacing)
  trackingTight: 'tracking-[0.1em]',
  trackingNormal: 'tracking-[0.15em]',
  trackingWide: 'tracking-[0.2em]',
  trackingWider: 'tracking-[0.3em]',
  trackingWidest: 'tracking-[0.4em]',
} as const;

// ============================================
// EXPORT DEFAULT
// ============================================

const designSystem = {
  colors,
  typography,
  spacing,
  borders,
  animations,
  effects,
  zIndex,
  breakpoints,
  components,
  tailwindClasses,
};

export default designSystem;
