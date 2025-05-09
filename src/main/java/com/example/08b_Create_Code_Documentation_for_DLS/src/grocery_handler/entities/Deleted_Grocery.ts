import {
  Entity, PrimaryGeneratedColumn, Column, ManyToMany
} from 'typeorm';
import { Grocery } from './Grocery.js';

@Entity()
export class Deleted_Grocery {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null = null;

  @ManyToMany(() => Grocery, (grocery) => grocery.deletedGroceries)
  groceries: Grocery[] = [];
}