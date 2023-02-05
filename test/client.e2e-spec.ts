import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { makeClient } from './factories/client.factory';

const prisma = new PrismaClient();

describe('Tests for clients (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE clients`;
  });

  it(`/POST clients should be able to create a valid client`, () => {
    const mockClient = makeClient();
    return request(app.getHttpServer())
      .post('/clients')
      .send(mockClient)
      .expect(HttpStatus.CREATED)
      .expect((response: request.Response) => {
        expect((response.body.response = 'Client registered sucessfully'));
        expect(response.body.client.props === mockClient);
      });
  });

  it(`/POST clients should not be able to create a client with existing CPF`, async () => {
    const mockClient = makeClient();
    await request(app.getHttpServer()).post('/clients').send(mockClient);

    return request(app.getHttpServer())
      .post('/clients')
      .send(mockClient)
      .expect(HttpStatus.CONFLICT);
  });

  it(`/POST clients should not be able to create a client with invalid CPF`, async () => {
    const mockClient = makeClient({ cpf: '065.035.742-30' });

    return request(app.getHttpServer())
      .post('/clients')
      .send(mockClient)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY);
  });

  it(`/GET clients should be able to return all clients`, async () => {
    const validsCPF = [
      '862.147.780-75',
      '700.851.490-55',
      '990.298.490-88',
      '898.545.140-56',
      '744.390.360-07',
      '530.399.740-50',
      '971.276.840-65',
      '930.152.740-58',
      '589.229.820-55',
      '571.847.180-03',
      '964.202.180-39',
      '064.706.150-31',
    ];

    for (const validCPF of validsCPF) {
      await prisma.client.create({
        data: makeClient({ cpf: validCPF }),
      });
    }

    return request(app.getHttpServer())
      .get('/clients')
      .expect(HttpStatus.OK)
      .expect((response: request.Response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(12);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
