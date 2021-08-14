import { MigrationInterface, QueryRunner } from 'typeorm';

export class currentPricesAdd1628969116821 implements MigrationInterface {
  name = 'currentPricesAdd1628969116821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "current_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentPrice" real NOT NULL, "fillTypeId" uuid NOT NULL, "sellStationId" uuid NOT NULL, CONSTRAINT "PK_2256066193d307db93b1223a15f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "current_price" ADD CONSTRAINT "FK_21ef52919437e6df668febb6e98" FOREIGN KEY ("fillTypeId") REFERENCES "fill_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "current_price" ADD CONSTRAINT "FK_ef45597904d6c9105bef65f28eb" FOREIGN KEY ("sellStationId") REFERENCES "sell_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "current_price" DROP CONSTRAINT "FK_ef45597904d6c9105bef65f28eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "current_price" DROP CONSTRAINT "FK_21ef52919437e6df668febb6e98"`,
    );
    await queryRunner.query(`DROP TABLE "current_price"`);
  }
}
