import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateCourierController } from './controllers/create-courier.controller'

@Module({
  imports: [],
  controllers: [CreateCourierController,],
  providers: [PrismaService],
})
export class AppModule { }
