type BrandLogoProps = {
  compact?: boolean
  priority?: boolean
}

export default function BrandLogo({ compact = false, priority = false }: BrandLogoProps) {
  return (
    <img
      className={compact ? 'brand-logo brand-logo--compact' : 'brand-logo'}
      src="/assets/brand/umoja-logistique-logo.jpg"
      alt="Umoja Logistique"
      width={compact ? 68 : 160}
      height={compact ? 68 : 160}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
