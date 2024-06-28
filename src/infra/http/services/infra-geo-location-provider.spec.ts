// This test does not use mocks. By doing this, we can verify if the external services used for geolocation are operational. However, this approach makes the test susceptible to failures caused by issues in these external services. In case of test failure, it is advisable to check the status and responsiveness of these services.

import { HttpModule } from '@nestjs/axios'
import { InfraGeoLocationProvider } from './infra-geo-location-provider'
import { Test } from '@nestjs/testing'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'

describe('infra geoLocation provider test', () => {
  let provider: InfraGeoLocationProvider

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [InfraGeoLocationProvider],
    }).compile()

    provider = moduleRef.get(InfraGeoLocationProvider)
  })

  test('if return geolocation from address', async () => {
    const result = await provider.getGeoLocationFromAddress('New York')
    expect(result).toBeInstanceOf(GeoLocation)
    expect(result.latitude).toBeCloseTo(40.7128, 2)
    expect(result.longitude).toBeCloseTo(-74.006, 2)
  })

  test('if return geolocation from ip', async () => {
    const ip = '212.58.244.23'
    const result = await provider.getGeoLocationFromIp(ip)
    expect(result).toBeInstanceOf(GeoLocation)
    expect(result.latitude).toBeCloseTo(51.5074, 1)
    expect(result.longitude).toBeCloseTo(-0.1278, 1)
  })
})
