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
    const client = makeClient();
    return request(app.getHttpServer())
      .post('/clients')
      .send(client)
      .expect(HttpStatus.CREATED);
  });

  it(`/POST clients should not be able to create a client with existing CPF`, async () => {
    const client = makeClient();
    await request(app.getHttpServer()).post('/clients').send(client);

    return request(app.getHttpServer())
      .post('/clients')
      .send(client)
      .expect(HttpStatus.CONFLICT);
  });

  it(`/GET clients should be able to return all clients`, () => {
    return request(app.getHttpServer()).get('/clients').expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
