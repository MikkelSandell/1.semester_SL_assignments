import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  Column
} from 'typeorm';
import { GroceryName } from './GroceryName.js';
import { GroceryImage } from './GroceryImage.js';
import { Category } from './Category.js';
import { Price } from './Price.js';
import { Description } from './Description.js';
import { Deleted_Grocery } from './Deleted_Grocery.js';
import { Amount } from './Amount.js';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @Column({ type: 'int', default: 1 })
  version: number = 1;

  @ManyToMany(() => GroceryName, (name: GroceryName) => name.groceries, { cascade: true })
  @JoinTable()
  names: GroceryName[] = [];

  @ManyToMany(() => GroceryImage, (image: GroceryImage) => image.groceries, { cascade: true })
  @JoinTable()
  images: GroceryImage[] = [];

  @ManyToMany(() => Category, (category: Category) => category.groceries, { cascade: true })
  @JoinTable()
  categories: Category[] = [];

  @ManyToMany(() => Price, (price: Price) => price.groceries, { cascade: true })
  @JoinTable()
  prices: Price[] = [];

  @ManyToMany(() => Description, (description: Description) => description.groceries, { cascade: true })
  @JoinTable()
  descriptions: Description[] = [];

  @ManyToMany(() => Deleted_Grocery, (deleted: Deleted_Grocery) => deleted.groceries, { cascade: true })
  @JoinTable()
  deletedGroceries: Deleted_Grocery[] = [];

  @ManyToMany(() => Amount, (amount: Amount) => amount.groceries, { cascade: true })
  @JoinTable()
  amounts: Amount[] = [];

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.names = [{ name } as GroceryName];
    this.prices = [{ price } as Price];
  }
}