import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1628281266482 implements MigrationInterface {
    name = 'Init1628281266482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fillTypeId" uuid NOT NULL, "price" integer NOT NULL, "sellStationId" character varying NOT NULL, "day" integer NOT NULL, "time" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e41e25472373d4b574b153229e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sell_station" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "savegameId" uuid NOT NULL, CONSTRAINT "PK_e70be79b3ac796d09f0abe6720c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "savegame" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "description" character varying NOT NULL, "inviteCode" character varying NOT NULL, CONSTRAINT "PK_158b40f84179aa010b4cfc07b34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fill_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "savegameId" uuid NOT NULL, "fillTypeIndex" integer NOT NULL, "basePrice" integer NOT NULL, "mass" integer NOT NULL, "displayName" character varying NOT NULL, "priceHigh" integer, "priceLow" integer, "currentLevel" integer, CONSTRAINT "PK_b9eb23bb849606917967693525c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "price_history" ADD CONSTRAINT "FK_fbb2f4b02002e368c7338a442ee" FOREIGN KEY ("fillTypeId") REFERENCES "fill_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sell_station" ADD CONSTRAINT "FK_f3f8fc7757a8381e0236f52710a" FOREIGN KEY ("savegameId") REFERENCES "savegame"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fill_type" ADD CONSTRAINT "FK_c5ea8139f7bb04a7664a8b47250" FOREIGN KEY ("savegameId") REFERENCES "savegame"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fill_type" DROP CONSTRAINT "FK_c5ea8139f7bb04a7664a8b47250"`);
        await queryRunner.query(`ALTER TABLE "sell_station" DROP CONSTRAINT "FK_f3f8fc7757a8381e0236f52710a"`);
        await queryRunner.query(`ALTER TABLE "price_history" DROP CONSTRAINT "FK_fbb2f4b02002e368c7338a442ee"`);
        await queryRunner.query(`DROP TABLE "fill_type"`);
        await queryRunner.query(`DROP TABLE "savegame"`);
        await queryRunner.query(`DROP TABLE "sell_station"`);
        await queryRunner.query(`DROP TABLE "price_history"`);
    }

}
