import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAttractions1602962251110 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'attractions',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,
                    },
                    {
                        name: 'about',
                        type: 'text',
                    },
                    {
                        name: 'informations',
                        type: 'text',
                    },
                    {
                        name: 'opening_hours',
                        type: 'varchar',
                        default: true,
                    },
                    {
                        name: 'open_on_weekends',
                        type: 'boolean',
                        default: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attractions');
    }
}
