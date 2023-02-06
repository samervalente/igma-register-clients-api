import { exec } from 'node:child_process';
import * as dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import { Client } from 'pg';
import { randomUUID } from 'node:crypto';
import { promisify } from 'util';

dotenv.config({
  path: __dirname + '/../.env',
  override: true,
});

const execSync = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context);

    this.schema = `${randomUUID()}`;

    this.connectionString = `${process.env.DATABASE_URL}?schema=${this.schema}`;
    console.log(this.connectionString);
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
