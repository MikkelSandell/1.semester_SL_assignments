import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToMany
} from 'typeorm';
import { Grocery } from './Grocery.js';

@Entity()
export class Description {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  description: string = '';

  @CreateDateColumn()
  createdAt: Date = new Date();

  @ManyToMany(() => Grocery, (grocery) => grocery.descriptions)
  groceries: Grocery[] = [];
}