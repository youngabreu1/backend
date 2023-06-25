import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity()
export class Aluno {
  @PrimaryColumn()
  cpf: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @Column()
  endereco: string;
}
