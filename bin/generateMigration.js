#!/usr/bin/env node
import { exec } from 'child_process';

/*
 * Run with:
 * node bin/generateMigration.js {MigrationName}
 *
 * Replace queryRunner.query() with proper command
 */

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Usage: node generateMigration.js <MigrationName>');
  process.exit(1);
}

const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate "./src/shared/db/migrations/${migrationName}" -d ./src/config/dataSource.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
