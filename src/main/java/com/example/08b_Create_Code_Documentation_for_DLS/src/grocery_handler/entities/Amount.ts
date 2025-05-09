import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from 'typeorm';
import { Grocery } from './Grocery.js';

@Entity()
export class Amount {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column('float')
  amount: number = 0;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @ManyToMany(() => Grocery, (grocery) => grocery.amounts)
  groceries: Grocery[] = [];
}