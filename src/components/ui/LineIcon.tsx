type IconName = 'arrow' | 'menu' | 'close' | 'route' | 'shield' | 'visibility' | 'network' | 'check'

type LineIconProps = {
  name: IconName
  size?: number
  strokeWidth?: number
}

export default function LineIcon({ name, size = 20, strokeWidth = 1.7 }: LineIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  }

  if (name === 'menu') {
    return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
  }

  if (name === 'close') {
    return <svg {...common}><path d="M5 5l14 14M19 5L5 19" /></svg>
  }

  if (name === 'route') {
    return <svg {...common}><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="6" r="2.2" /><path d="M7 18c5.5 0 3.7-12 9.8-12" /></svg>
  }

  if (name === 'shield') {
    return <svg {...common}><path d="M12 3l7 3.2v5.2c0 4.4-2.9 7.9-7 9.6-4.1-1.7-7-5.2-7-9.6V6.2L12 3z" /><path d="M8.5 12.1l2.1 2.1 4.8-5" /></svg>
  }

  if (name === 'visibility') {
    return <svg {...common}><path d="M2.5 12s3.4-5.5 9.5-5.5S21.5 12 21.5 12 18.1 17.5 12 17.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.4" /></svg>
  }

  if (name === 'network') {
    return <svg {...common}><circle cx="5" cy="12" r="2.2" /><circle cx="18.5" cy="5.5" r="2.2" /><circle cx="18.5" cy="18.5" r="2.2" /><path d="M7.1 11l9.3-4.4M7.1 13l9.3 4.4" /></svg>
  }

  return <svg {...common}><path d="M5 12.5l4.2 4.2L19 7" /></svg>
}
