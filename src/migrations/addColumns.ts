import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToAluno1634923465845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('aluno', [
      new TableColumn({
        name: 'dataNascimento',
        type: 'date',
        isNullable: true,
      }),
      new TableColumn({
        name: 'endereco',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('aluno', 'dataNascimento');
    await queryRunner.dropColumn('aluno', 'endereco');
  }
}