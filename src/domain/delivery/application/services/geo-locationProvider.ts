import { GeoLocation } from '../../enterprise/entities/value-object/geolocation'

export abstract class GeoLocationProvider {
  abstract getGeoLocationFromAddress(address: string): Promise<GeoLocation>
  abstract getGeoLocationFromIp(ip: string): Promise<GeoLocation>
}
