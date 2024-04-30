import { GeoLocationProvider } from '@/domain/delivery/application/services/geo-locationProvider'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'

export class MockGeoLocationProvider extends GeoLocationProvider {
  private mockResponses = new Map<string, GeoLocation>()

  setMockResponse(key: string, latitude: number, longitude: number): void {
    const location = new GeoLocation(latitude, longitude)
    this.mockResponses.set(key, location)
  }

  clear(): void {
    this.mockResponses.clear()
  }

  async getGeoLocationFromAddress(address: string): Promise<GeoLocation> {
    return this.getMockLocation(address)
  }

  async getGeoLocationFromIp(ip: string): Promise<GeoLocation> {
    return this.getMockLocation(ip)
  }

  private getMockLocation(key: string): GeoLocation {
    return this.mockResponses.get(key) ?? new GeoLocation(0, 0)
  }
}
