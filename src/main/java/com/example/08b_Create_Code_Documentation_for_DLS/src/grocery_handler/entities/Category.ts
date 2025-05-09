
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToMany
} from 'typeorm';
import { Grocery } from './Grocery.js';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @CreateDateColumn()
  createdAt: Date = new Date();

  @ManyToMany(() => Grocery, (grocery) => grocery.categories)
  groceries: Grocery[] = [];
}
