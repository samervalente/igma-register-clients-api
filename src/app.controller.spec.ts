import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './http/controllers/client.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: ClientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [AppService],
    }).compile();

    appController = app.get<ClientController>(ClientController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
