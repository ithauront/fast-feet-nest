import { GeoLocation } from './geolocation'

describe('Geolocation tests', () => {
  test('if can create a geolocation', () => {
    const latitude = 48.86726696440399
    const longitude = 2.3338573695049196

    const geoLocation = new GeoLocation(latitude, longitude)

    expect(geoLocation).toEqual(
      expect.objectContaining({
        latitude: 48.86726696440399,
        longitude: 2.3338573695049196,
      }),
    )
  })
  test('should throw an error for invalid latitude values', () => {
    const latitude = 91
    const longitude = 2.3338573695049196

    expect(() => new GeoLocation(latitude, longitude)).toThrow(Error)
  })

  test('should throw an error for invalid longitude values', () => {
    const latitude = 48.86726696440399
    const longitude = -181

    expect(() => new GeoLocation(latitude, longitude)).toThrow(Error)
  })

  test('if can find distance between two locations', () => {
    const courierLatitude = 48.86726696440399
    const courierLongitude = 2.3338573695049196

    const courierLocation = new GeoLocation(courierLatitude, courierLongitude)
    const recipientLatitude = 48.865403752667106
    const recipientLongitude = 2.3435133213994477

    const recipientLocation = new GeoLocation(
      recipientLatitude,
      recipientLongitude,
    )

    const distanceBetween = courierLocation.getDistanceTo(recipientLocation)

    expect(distanceBetween).toBeLessThan(1)
  })
})
