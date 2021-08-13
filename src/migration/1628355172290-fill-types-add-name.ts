import {MigrationInterface, QueryRunner} from "typeorm";

export class fillTypesAddName1628355172290 implements MigrationInterface {
    name = 'fillTypesAddName1628355172290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "name"`);
    }

}
