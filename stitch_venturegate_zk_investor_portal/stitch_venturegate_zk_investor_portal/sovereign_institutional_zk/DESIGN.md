---
name: Sovereign Institutional ZK
colors:
  surface: '#121315'
  surface-dim: '#121315'
  surface-bright: '#38393b'
  surface-container-lowest: '#0d0e10'
  surface-container-low: '#1b1c1e'
  surface-container: '#1f2022'
  surface-container-high: '#292a2c'
  surface-container-highest: '#343537'
  on-surface: '#e3e2e5'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e3e2e5'
  inverse-on-surface: '#303033'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffc37b'
  on-tertiary: '#472a00'
  tertiary-container: '#f7a00f'
  on-tertiary-container: '#633d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#121315'
  on-background: '#e3e2e5'
  surface-variant: '#343537'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-conviction visual language for privacy-preserving institutional finance and zero-knowledge smart contracts. It moves away from the juvenile, hyper-saturated aesthetic of retail Web3—specifically rejecting all blue, violet, neon purple, and cyan signifiers. Instead, it draws from private banking vaults, high-end horology, and cryptographic precision.

The visual tone is discreet, immovable, and authoritative. It combines:
- **Swiss Modernism**: Rigid alignment, deliberate typographic scale, and structural restraint.
- **Architectural Minimalism**: Bento grid structures with disciplined proportions and deep obsidian planes.
- **Subtle Glassmorphism**: Micro-surface separation achieved via frosted canvas layering, ultra-fine 1px hairline borders, and targeted amber-gold light catches.

Users must experience immediate psychological security: transactions feel binding, proofs feel mathematically absolute, and capital allocation commands institutional weight.

## Colors

The palette is strictly restricted to an obsidian base, metallic gold accents, calibrated state indicators, and monochrome text layers. Cool spectrum tones (blue, purple, violet, cyan, teal) are completely absent from all tokens, blurs, and highlights.

### Base Canvas & Surfaces
- **Base Canvas**: `#090A0C` (Absolute deep obsidian charcoal foundation).
- **Elevated Card (Base)**: `#111317` at `92%` opacity with backdrop blur for structural separation.
- **Elevated Card (Overlay/Hover)**: `#171A20` with micro-diffused light catch.
- **Surface Inset / Well**: `#0C0D10` with internal 1px hairline frame.

### Metallics & Sovereign Accents
- **Primary Sovereign Gold**: `#D4AF37` — reserved for high-conviction CTAs, validated cryptographic gates, and key metrics.
- **Champagne Gold (Glow / Hover)**: `#F3E5AB` — illuminates interactive surfaces and micro-focus rings.
- **Antique Bronze (Pressed / Active)**: `#AA820A` — provides grounded tactile feedback on interaction.
- **Metallic Gold Gradient**: `linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #996515 100%)` — restricted to sovereign badges, premium progress indicators, and proof-generation completion marks.

### State & Cryptographic Verification
- **Verified Jade**: `#10B981` (Surface tint: `rgba(16, 185, 129, 0.08)`, border: `rgba(16, 185, 129, 0.25)`).
- **Proving Amber**: `#F59E0B` (Surface tint: `rgba(245, 158, 11, 0.08)`, border: `rgba(245, 158, 11, 0.25)`).
- **Ineligible Crimson**: `#EF4444` (Surface tint: `rgba(239, 68, 68, 0.08)`, border: `rgba(239, 68, 68, 0.25)`).

### Structural Lines & Dividers
- **Border Subtle**: `rgba(255, 255, 255, 0.08)` (1px solid default structural hairline).
- **Border Active/Elevated**: `rgba(255, 255, 255, 0.14)`.
- **Border Gold Highlight**: `rgba(212, 175, 55, 0.35)` (Applied on focused states, validated zero-knowledge cards, and hero elements).

## Typography

Typography balances geometric architectural authority with rigorous tabular data presentation.

- **Primary Display (Outfit)**: Used for high-impact metric values, module headers, and primary statement titles. Its clean geometric construction provides institutional poise without emotional volatility.
- **System Interface & Body (Plus Jakarta Sans)**: Used for data tables, descriptions, form structures, and explanatory text. Chosen for high legibility at dense information scales.
- **Cryptographic & Numeric Monospace (JetBrains Mono)**: Mandatory for all ZK-proof digests, hex addresses, ledger state balances, transaction hashes, and timestamp logs. Numbers must render with tabular figures (`font-variant-numeric: tabular-nums`) to prevent jittering during proof generation and real-time state synchronization.

### Text Color Hierarchy
- **Pure White (`#F8FAFC`)**: Reserved for active metrics, primary headers, and input values.
- **Slate (`#94A3B8`)**: Body copy, form labels, and contextual metadata.
- **Gunmetal (`#64748B`)**: Secondary timestamps, table headers, inactive states, and disabled tokens.
- **Monospace Value (`#E2E8F0`)**: Cryptographic hashes, protocol addresses, and block heights.

## Layout & Spacing

The spatial architecture is grounded in a modular Bento Grid system based on an 8pt base grid. The design prioritizes institutional density: data remains compact and structurally grouped rather than sprawling.

### Grid & Breakpoints
- **Desktop (1280px+)**: 12-column Bento Grid. Column gutters are fixed at `1.5rem` (`24px`), with outer frame margins at `2.5rem` (`40px`). Maximum content boundary is capped at `1440px` centered.
- **Tablet (768px - 1279px)**: 8-column layout. Column gutters reduce to `1.25rem` (`20px`), margins adjust to `1.5rem` (`24px`). Bento tiles reflow to half-width or full-width spans.
- **Mobile (Below 768px)**: 4-column single stack. Gutters and outer margins are locked to `1rem` (`16px`). High-density data matrices transform into stacked cryptographic metric cards.

### Structural Flow
- Modules prioritize structural grouping over whitespace voids.
- Empty space inside containers relies on `space-md` (`16px`) for standard cards and `space-lg` (`24px`) for hero Bento units.
- Information clustering pairs tight labels to values using `space-xs` (`4px`) or `space-sm` (`8px`) to ensure instant visual association.

## Elevation & Depth

Visual hierarchy is achieved through precise tonal contrast, layered obsidian surfaces, and delicate hairline edges rather than prominent, blurry drop shadows.

### The Midnight Layering Model
1. **Base Layer (Canvas)**: Solid `#090A0C`. Ground plane for the entire viewport.
2. **Structural Bento Tiles (Surface Level 1)**: `#111317` with a backdrop blur of `16px` and a 1px uniform perimeter of `rgba(255, 255, 255, 0.08)`.
3. **Interactive / Raised Panels (Surface Level 2)**: `#171A20`. Employs an interior top highlight (`inset 0 1px 0 0 rgba(255, 255, 255, 0.06)`) and a low-opacity ground contact shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.7)`.
4. **Active ZK Verification & Modal Focus (Surface Level 3)**: `#1B1E26` bounded by an ambient gold trace: `box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.35), 0 16px 40px -8px rgba(0, 0, 0, 0.9)`.

### Shadow Rules
- Never use cool-toned or saturated colored drop shadows.
- Glows are limited to micro-auras around validated gold state chips or emerald proof badges (`0 0 12px rgba(212, 175, 55, 0.15)` or `0 0 12px rgba(16, 185, 129, 0.15)`).
- Edge definition is always reinforced with a 1px border. Surfaces never blend into each other through soft blur alone.

## Shapes

The geometric framework favors controlled, architectural corners over organic or circular shapes.

- **Base Radius**: Controlled at `10px` for all standard cards, Bento modules, modal dialogs, and large structural containers.
- **Component Radius**: Interactive controls (buttons, inputs, select fields, and key metric cells) use a strict `6px` radius to maintain a calibrated, mechanical feel.
- **Pills / Radii Constraints**: Full pill radii (`9999px`) are strictly forbidden for buttons and cards. The only exception is micro status badges (e.g., small verified indicators), capped at a `12px` height with a maximum `4px` corner bevel.
- **Geometric Hairlines**: All containers, dividers, and bounding frames are rendered with precisely `1px` stroke weights.

## Components

### Buttons
- **Primary Sovereign CTA**:
  - Background: Metallic gold gradient `linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #996515 100%)`.
  - Text: `#090A0C` (Obsidian), font-weight `600`, Plus Jakarta Sans.
  - Border: `1px solid rgba(243, 229, 171, 0.4)`.
  - Hover: Background `#F3E5AB`, box-shadow `0 0 16px rgba(212, 175, 55, 0.3)`.
  - Active: Background `#AA820A`, transform `scale(0.99)`.
  - Radius: `6px`.
- **Secondary / Ghost Outlined**:
  - Background: `rgba(255, 255, 255, 0.03)`.
  - Text: `#F8FAFC`.
  - Border: `1px solid rgba(255, 255, 255, 0.12)`.
  - Hover: Background `rgba(255, 255, 255, 0.06)`, border `rgba(212, 175, 55, 0.35)`.
  - Radius: `6px`.

### Input Fields & Address Selectors
- **Container**: Background `#0C0D10`, border `1px solid rgba(255, 255, 255, 0.08)`, height `44px`, corner radius `6px`.
- **Text & Placeholder**: Input text rendered in `#F8FAFC` (JetBrains Mono for addresses/amounts, Plus Jakarta Sans for names). Placeholder set in `#64748B`.
- **Focus State**: Border transitions to `rgba(212, 175, 55, 0.5)`, with a crisp internal ring `inset 0 0 0 1px rgba(212, 175, 55, 0.3)`. No blue browser outlines.

### Zero-Knowledge Proof Status Badges (Chips)
- **Verified State**: Background `rgba(16, 185, 129, 0.08)`, border `1px solid rgba(16, 185, 129, 0.25)`, text `#10B981` (JetBrains Mono, uppercase, `10px`). Preceded by a `4px` solid emerald indicator dot.
- **Proving / Generating State**: Background `rgba(245, 158, 11, 0.08)`, border `1px solid rgba(245, 158, 11, 0.25)`, text `#F59E0B`. Preceded by an amber pulsing dot.
- **Shielded / Private Metric**: Background `rgba(212, 175, 55, 0.08)`, border `1px solid rgba(212, 175, 55, 0.25)`, text `#D4AF37`.

### Bento Cards & Data Surfaces
- **Card Anatomy**:
  - Background: `#111317` with `94%` opacity and `16px` backdrop filter.
  - Border: `1px solid rgba(255, 255, 255, 0.08)`.
  - Border Accent: Top-edge micro-highlight using `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)`.
  - Padding: `20px` (or `24px` for hero modules).
  - Corner Radius: `10px`.

### Tables & Cryptographic Lists
- **Structure**: Alternating rows avoided; clean separation via `1px solid rgba(255, 255, 255, 0.04)` borders.
- **Header**: Text `#64748B`, font-size `11px`, JetBrains Mono, uppercase, tracking `0.05em`.
- **Data Cells**: Heights fixed to `48px`. Numbers and hashes formatted with JetBrains Mono, tabular alignment. Truncated ZK hashes format as `0x7F...3B9A` with click-to-copy triggering a temporary Champagne Gold checkmark.

### Checkboxes & Segmented Controls
- **Checkboxes**: Square `18px x 18px` with `4px` radius. Unchecked: Border `1px solid rgba(255, 255, 255, 0.16)`. Checked: Background `#D4AF37`, border `#D4AF37`, icon obsidian check mark.
- **Segmented Control**: Background `#0C0D10` with `4px` internal padding. Selected item: Background `#171A20`, border `1px solid rgba(212, 175, 55, 0.3)`, text `#F8FAFC`, corner radius `4px`.