/**
 * I chose to make GeoLocation a Value Object instead of just an interface in the Courier entity
 * because it encapsulates latitude and longitude with built-in validation, ensuring all locations are valid
 * upon creation. This immutability reflects real-world geographic locations' nature and promotes
 * reusability and functionality extension across the domain, aligning well with DDD principles.
 */
export class GeoLocation {
  readonly latitude: number
  readonly longitude: number

  constructor(latitude: number, longitude: number) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be between -90 and 90.')
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be between -180 and 180.')
    }
    this.latitude = latitude
    this.longitude = longitude
  }

  getDistanceTo(to: GeoLocation): number {
    const earthRadiusKm = 6371
    const dLat = this.degreesToRadians(to.latitude - this.latitude)
    const dLon = this.degreesToRadians(to.longitude - this.longitude)
    const lat1 = this.degreesToRadians(this.latitude)
    const lat2 = this.degreesToRadians(to.latitude)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiusKm * c // Distance in kilometers
  }

  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }
}
