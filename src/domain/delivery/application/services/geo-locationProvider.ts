import { Injectable } from '@nestjs/common'
import { GeoLocation } from '../../enterprise/entities/value-object/geolocation'

@Injectable()
export abstract class GeoLocationProvider {
  abstract getGeoLocationFromAddress(address: string): Promise<GeoLocation>
  abstract getGeoLocationFromIp(ip: string): Promise<GeoLocation>
}
