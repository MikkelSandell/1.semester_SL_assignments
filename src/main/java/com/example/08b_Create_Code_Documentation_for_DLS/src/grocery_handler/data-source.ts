// Represents the data source for grocery items.
import { Grocery } from "./entities/Grocery.js";

/**
 * Simulates a database for grocery items.
 */
export const groceryDatabase: Grocery[] = [];

/**
 * Adds a grocery item to the database.
 * @param grocery The grocery item to add.
 */
export function addGrocery(grocery: Grocery): void {
    groceryDatabase.push(grocery);
}

/**
 * Retrieves all grocery items from the database.
 * @returns An array of grocery items.
 */
export function getGroceries(): Grocery[] {
    return groceryDatabase;
}