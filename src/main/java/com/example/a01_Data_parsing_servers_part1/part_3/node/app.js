import express from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import yaml from 'js-yaml';
import xml2js from 'xml2js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFolder = path.resolve(__dirname, '../..'); // Move up from "part_2/node"

const app = express();

class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

const FileParser = {
    parseTextFile() {
        const filePath = path.join(dataFolder, "data.txt");
        const data = fs.readFileSync(filePath, 'utf8');
        return data.split('\n').map(line => {
            const [name, price, category] = line.split(', ');
            return new Product(name, parseInt(price), category);
        });
    },

    parseCSVFile() {
        return new Promise((resolve, reject) => {
            const filePath = path.join(dataFolder, "data.csv");
            const results = [];
    
            fs.createReadStream(filePath)
                .pipe(csv())  // No need for { headers: true }, it auto-detects them
                .on('data', (row) => {
                    results.push(new Product(row.Name, parseInt(row.Price), row.Category));
                })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    },

    parseJSONFile() {
        const filePath = path.join(dataFolder, "data.json");
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data).map(p => new Product(p.name, p.price, p.category));
    },

    parseXMLFile() {
        return new Promise((resolve, reject) => {
            const filePath = path.join(dataFolder, "data.xml");
            const data = fs.readFileSync(filePath, 'utf8');
            xml2js.parseString(data, (err, result) => {
                if (err) reject(err);
                const products = result.products.product.map(p => new Product(p.name[0], parseInt(p.price[0]), p.category[0]));
                resolve(products);
            });
        });
    },

    parseYAMLFile() {
        const filePath = path.join(dataFolder, "data.yaml");
        const data = yaml.load(fs.readFileSync(filePath, 'utf8'));
        return data.products.map(p => new Product(p.name, p.price, p.category));
    }
};

app.get("/text", (req, res) => {
    res.json(FileParser.parseTextFile());
});

app.get("/csv", async (req, res) => {
    res.json(await FileParser.parseCSVFile());
});

app.get("/json", (req, res) => {
    res.json(FileParser.parseJSONFile());
});

app.get("/xml", async (req, res) => {
    res.json(await FileParser.parseXMLFile());
});

app.get("/yaml", (req, res) => {
    res.json(FileParser.parseYAMLFile());
});





app.get("/GetTextFromPy", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/text");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // or response.json() if the API returns JSON
        res.send(text);
    } catch (error) {
        console.error("Error fetching text:", error);
        res.status(500).send("Failed to retrieve text from API");
    }
});

app.get("/GetCsvFromPy", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/csv");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // or response.json() if the API returns JSON
        res.send(text);
    } catch (error) {
        console.error("Error fetching text:", error);
        res.status(500).send("Failed to retrieve text from API");
    }
});

app.get("/GetJsonFromPy", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // or response.json() if the API returns JSON
        res.send(text);
    } catch (error) {
        console.error("Error fetching text:", error);
        res.status(500).send("Failed to retrieve text from API");
    }
});

app.get("/GetXmlFromPy", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/xml");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // or response.json() if the API returns JSON
        res.send(text);
    } catch (error) {
        console.error("Error fetching text:", error);
        res.status(500).send("Failed to retrieve text from API");
    }
});

app.get("/GetYamlFromPy", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/yaml");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text(); // or response.json() if the API returns JSON
        res.send(text);
    } catch (error) {
        console.error("Error fetching text:", error);
        res.status(500).send("Failed to retrieve text from API");
    }
});





app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
