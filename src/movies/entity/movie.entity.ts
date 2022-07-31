/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryColumn({ type: 'uuid' })
  @Generated("uuid") id?: string;

  @Column()
  title: string;

  @Column()
  banner: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  producer: string;
}
