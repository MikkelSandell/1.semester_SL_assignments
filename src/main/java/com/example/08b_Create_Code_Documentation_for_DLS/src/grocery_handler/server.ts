import express, { Router, Request, Response } from "express";
import { addGrocery, getGroceries } from "./data-source.js";
import { Grocery } from "./entities/Grocery.js";
import { GroceryName } from "./entities/GroceryName.js";
import { Price } from "./entities/Price.js";

const app = express();
const router = Router();
app.use(express.json());

/**
 * Endpoint to add a new grocery item.
 */
router.post("/groceries", (req: any, res: any) => {
    const { id, name, price } = req.body;
    const grocery = new Grocery(id, name, price);
    addGrocery(grocery);
    res.status(201).send(grocery);
});

/**
 * Endpoint to retrieve all grocery items.
 */
router.get("/groceries", (req: any, res: any) => {
    res.send(getGroceries());
});

/**
 * Endpoint to update a grocery item by ID.
 */
router.put("/groceries/:id", (req: any, res: any) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const groceries = getGroceries();
    const grocery = groceries.find((g) => g.id === parseInt(id));
    if (!grocery) {
        return res.status(404).send({ message: "Grocery not found" });
    }
    if (name) {
        grocery.names = [new GroceryName(name)];
    }
    if (price) {
        grocery.prices = [new Price(price)];
    }
    res.send(grocery);
});

/**
 * Endpoint to delete a grocery item by ID.
 */
router.delete("/groceries/:id", (req: any, res: any, next: any) => {
    try {
        const { id } = req.params;
        const groceries = getGroceries();
        const index = groceries.findIndex((g) => g.id === parseInt(id));
        if (index === -1) {
            return res.status(404).send({ message: "Grocery not found" });
        }
        groceries.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use(router);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});