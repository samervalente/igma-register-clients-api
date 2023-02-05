import { exec } from 'node:child_process';
import * as dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import { Client } from 'pg';
import { promisify } from 'util';

dotenv.config({
  path: __dirname + '/../.env.test',
  override: true,
  debug: true,
});

const execSync = promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig, _context: EnvironmentContext) {
    super(config, _context);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.schema = `test_2`;

    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
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
