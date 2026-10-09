import * as THREE from 'three'

export type HubId = 'johannesburg' | 'lubumbashi' | 'kinshasa' | 'europe'

export type Hub = {
  id: HubId
  name: string
  latitude: number
  longitude: number
  current: boolean
}

export const hubs: Hub[] = [
  { id: 'johannesburg', name: 'Johannesburg', latitude: -26.2, longitude: 28.04, current: true },
  { id: 'lubumbashi', name: 'Lubumbashi', latitude: -11.66, longitude: 27.48, current: true },
  { id: 'kinshasa', name: 'Kinshasa', latitude: -4.33, longitude: 15.31, current: true },
  { id: 'europe', name: 'Europe', latitude: 50.11, longitude: 8.68, current: true },
]

export function hubPosition(hub: Hub, radius = 1.58): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - hub.latitude)
  const theta = THREE.MathUtils.degToRad(hub.longitude + 180)
  return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta)
}

export function createRoutePoints(start: Hub, end: Hub, radius = 1.62): THREE.Vector3[] {
  const startPosition = hubPosition(start, radius)
  const endPosition = hubPosition(end, radius)
  const midpoint = startPosition.clone().add(endPosition).normalize().multiplyScalar(radius * 1.22)
  const curve = new THREE.QuadraticBezierCurve3(startPosition, midpoint, endPosition)
  return curve.getPoints(28)
}
