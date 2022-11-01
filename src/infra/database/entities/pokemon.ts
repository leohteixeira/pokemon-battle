/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'pokemons' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'tipo'
  })
  tipo: string

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'treinador'
  })
  treinador: string

  @Column({
    type: 'int',
    nullable: false,
    name: 'nivel',
    default: 1
  })
  nivel: number
}
