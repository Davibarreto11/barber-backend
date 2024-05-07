import { type MigrationInterface, type QueryRunner, Table, TableForeignKey, TableColumn } from 'typeorm'

export class CreateAppointments1695957180602 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'date',
            type: 'timestamp with time zone'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
    const foreignKeyUser = new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
    await queryRunner.createForeignKey('appointments', foreignKeyUser)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider')
    await queryRunner.dropTable('appointments')

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar'
    }))
  }
}
