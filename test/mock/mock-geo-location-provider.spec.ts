import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'
import { MockGeoLocationProvider } from 'test/mock/mock-geo-location-provider'

describe('MockGeoLocationProvider Tests', () => {
  let mockGeoLocationProvider: MockGeoLocationProvider

  beforeEach(() => {
    mockGeoLocationProvider = new MockGeoLocationProvider()
  })

  test('should return the correct geolocation for a mocked address', async () => {
    const testAddress = 'testAddress'
    const expectedLatitude = 10
    const expectedLongitude = 20
    mockGeoLocationProvider.setMockResponse(
      testAddress,
      expectedLatitude,
      expectedLongitude,
    )

    const location =
      await mockGeoLocationProvider.getGeoLocationFromAddress(testAddress)

    expect(location.latitude).toBe(expectedLatitude)
    expect(location.longitude).toBe(expectedLongitude)
  })

  test('should return default geolocation for unknown address', async () => {
    const unknownAddress = 'unknownAddress'
    const defaultGeoLocation = new GeoLocation(0, 0)

    const location =
      await mockGeoLocationProvider.getGeoLocationFromAddress(unknownAddress)

    expect(location.latitude).toBe(defaultGeoLocation.latitude)
    expect(location.longitude).toBe(defaultGeoLocation.longitude)
  })
})
