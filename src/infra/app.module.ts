import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { authModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    authModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
