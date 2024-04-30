import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'

export interface QueryParams {
  page: number
  status?: PackageStatus
  address?: string
}
