import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1685017906234 implements MigrationInterface {
  name = 'CreateUser1685017906234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" text NOT NULL, "fullName" text NOT NULL DEFAULT '', "userName" text NOT NULL DEFAULT '', CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
