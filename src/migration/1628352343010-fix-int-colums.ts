import {MigrationInterface, QueryRunner} from "typeorm";

export class fixIntColums1628352343010 implements MigrationInterface {
    name = 'fixIntColums1628352343010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."price_history" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" ADD "price" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "basePrice" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "mass"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "mass" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "priceHigh"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "priceHigh" real`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "priceLow"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "priceLow" real`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "priceLow"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "priceLow" integer`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "priceHigh"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "priceHigh" integer`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "mass"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "mass" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" DROP COLUMN "basePrice"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ADD "basePrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" ADD "price" integer NOT NULL`);
    }

}
