import { GeoLocationProvider } from '@/domain/delivery/application/services/geo-locationProvider'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'
import { HttpService } from '@nestjs/axios'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class InfraGeoLocationProvider extends GeoLocationProvider {
  constructor(private httpService: HttpService) {
    super()
  }

  async getGeoLocationFromAddress(address: string): Promise<GeoLocation> {
    const addressFormatted = encodeURIComponent(address)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${addressFormatted}`
    try {
      const httpCall = this.httpService.get(url)
      const response = await lastValueFrom(httpCall)
      const data = response.data[0]
      if (!data) {
        throw new Error('No location data returned')
      }
      return new GeoLocation(parseFloat(data.lat), parseFloat(data.lon))
    } catch (error) {
      console.error(
        `Failed to retrieve location from address: ${address}`,
        error,
      )
      throw new InternalServerErrorException(
        'Failed to retrieve geolocation data',
      )
    }
  }

  async getGeoLocationFromIp(ip: string): Promise<GeoLocation> {
    const url = `https://ipapi.co/${ip}/json/`
    try {
      const httpCall = this.httpService.get(url)
      const response = await lastValueFrom(httpCall)
      const { latitude, longitude } = response.data
      if (latitude == null || longitude == null) {
        throw new Error('Invalid IP location data')
      }
      return new GeoLocation(latitude, longitude)
    } catch (error) {
      console.error(`Failed to retrieve location from IP: ${ip}`, error)
      throw new InternalServerErrorException(
        'Failed to retrieve IP geolocation data',
      )
    }
  }
}
