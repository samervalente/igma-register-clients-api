import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './http/controllers/client.controller';

describe('AppController', () => {
  let appController: ClientController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
    }).compile();

    appController = app.get<ClientController>(ClientController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAll()).toBe(Array);
    });
  });
});
