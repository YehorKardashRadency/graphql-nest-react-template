import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePost1685085651728 implements MigrationInterface {
  name = 'CreatePost1685085651728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" text NOT NULL DEFAULT '', "title" text NOT NULL DEFAULT '', "authorId" text NOT NULL, CONSTRAINT "PK_58a149c4e88bf49036bc4c8c79f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post_entity"`);
  }
}
