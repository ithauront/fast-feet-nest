import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'
import { EnvService } from './infra/env/env.service'
import { AdminFactory } from 'test/factories/make-admin'
import { hash } from 'bcryptjs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false })

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  const adminFactory = app.get(AdminFactory)

  // creation of initial admin this admin MUST be deactivated after the creation of first real admin. for more info please check the README

  const alreadyHasAdmin = await adminFactory.checkForExistingAdmin()

  if (!alreadyHasAdmin) {
    try {
      const initialAdminPassword = envService.get('INITIAL_ADMIN_PASSWORD')
      const hashedPassword = await hash(initialAdminPassword, 8)

      await adminFactory.makePrismaAdmin({
        name: 'Initial Admin',
        cpf: '00000000000', // 11 zeros
        password: hashedPassword,
      })
    } catch (error) {
      console.error('Failed to create initial admin:', error)
    }
  } else {
    console.log('Admin already exists.')
  }

  await app.listen(port)
}

bootstrap()
