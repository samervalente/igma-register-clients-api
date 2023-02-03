import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientController } from './http/controllers/client.controller';
import { PrismaService } from './config/database/prisma.config';
import { ClientRepository } from './repositories/client.repository';
import { PrismaClientRepository } from './repositories/prisma/client.repository';
import { ClientService } from './services/client.service';
import { ClientMiddlware } from './middlewares/client.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientMiddlware).forRoutes('clients');
  }
}
