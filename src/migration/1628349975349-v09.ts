import {MigrationInterface, QueryRunner} from "typeorm";

export class v091628349975349 implements MigrationInterface {
    name = 'v091628349975349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."savegame" ADD CONSTRAINT "UQ_3f0f77c6f9e2cef414b77cfac2d" UNIQUE ("inviteCode")`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" DROP COLUMN "sellStationId"`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" ADD "sellStationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ALTER COLUMN "currentLevel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ALTER COLUMN "currentLevel" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" ADD CONSTRAINT "FK_28f2949a203e90287eda89090b6" FOREIGN KEY ("sellStationId") REFERENCES "sell_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."price_history" DROP CONSTRAINT "FK_28f2949a203e90287eda89090b6"`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ALTER COLUMN "currentLevel" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."fill_type" ALTER COLUMN "currentLevel" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" DROP COLUMN "sellStationId"`);
        await queryRunner.query(`ALTER TABLE "public"."price_history" ADD "sellStationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."savegame" DROP CONSTRAINT "UQ_3f0f77c6f9e2cef414b77cfac2d"`);
    }

}
