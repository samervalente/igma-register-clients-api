import { Module } from '@nestjs/common';
import { ClientController } from './http/controllers/client.controller';
import { PrismaService } from './config/database/prisma.config';
import { ClientRepository } from './repositories/client.repository';
import { PrismaClientRepository } from './repositories/prisma/client.repository';
import { ClientService } from './services/client.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
    ClientService,
  ],
})
export class AppModule {}
