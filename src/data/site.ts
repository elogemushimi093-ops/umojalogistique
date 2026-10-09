export const navigation = [
  { id: 'home', href: '#home' },
  { id: 'about', href: '#about' },
  { id: 'services', href: '#services' },
  { id: 'network', href: '#network' },
  { id: 'roadFreight', href: '#road-freight' },
  { id: 'contact', href: '#contact' },
] as const

export const services = [
  { id: 'roadFreight', available: true, number: '01' },
  { id: 'crossBorder', available: true, number: '02' },
  { id: 'groupage', available: true, number: '03' },
  { id: 'fullTruck', available: true, number: '04' },
  { id: 'dedicated', available: true, number: '05' },
  { id: 'warehousing', available: false, number: '06' },
  { id: 'customs', available: false, number: '07' },
  { id: 'forwarding', available: false, number: '08' },
  { id: 'lastMile', available: false, number: '09' },
  { id: 'tracking', available: false, number: '10' },
] as const

export const locations = [
  'Johannesburg — South Africa',
  'Lubumbashi — DRC',
  'Kinshasa — DRC',
] as const

export const pillarNumbers = ['01', '02', '03', '04', '05'] as const
