from fastapi import FastAPI
import csv
import json
import yaml
import xml.etree.ElementTree as ET
from typing import List

app = FastAPI()

class Product:
    def __init__(self, name: str, price: int, category: str):
        self.name = name
        self.price = price
        self.category = category

    def to_dict(self):
        return {"name": self.name, "price": self.price, "category": self.category}


def parse_text_file(file_path: str) -> List[dict]:
    products = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            parts = line.strip().split(", ")
            products.append(Product(parts[0], int(parts[1]), parts[2]).to_dict())
    return products


def parse_csv_file(file_path: str) -> List[dict]:
    products = []
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header
        for row in reader:
            products.append(Product(row[0], int(row[1]), row[2]).to_dict())
    return products


def parse_json_file(file_path: str) -> List[dict]:
    with open(file_path, 'r') as file:
        products = json.load(file)
        return [Product(p['name'], p['price'], p['category']).to_dict() for p in products]


def parse_xml_file(file_path: str) -> List[dict]:
    products = []
    tree = ET.parse(file_path)
    root = tree.getroot()
    for product_elem in root.findall("product"):
        name = product_elem.find("name").text
        price = int(product_elem.find("price").text)
        category = product_elem.find("category").text
        products.append(Product(name, price, category).to_dict())
    return products


def parse_yaml_file(file_path: str) -> List[dict]:
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        return [Product(p['name'], p['price'], p['category']).to_dict() for p in data['products']]


# File paths (Update these to your actual file paths)
base_path = "C:\\Users\\mikke\\Desktop\\code\\1.semester_SL_assagments\\1.semester_SL_assignments\\src\\main\\java\\com\\example\\a01_Data_parsing_servers_part1\\"
text_file = base_path + "data.txt"
csv_file = base_path + "data.csv"
json_file = base_path + "data.json"
xml_file = base_path + "data.xml"
yaml_file = base_path + "data.yaml"

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/greetings")
def greetings():
    return {"message": "Welcome to my server"}

@app.get("/text")
def get_text_data():
    return {"products": parse_text_file(text_file)}

@app.get("/csv")
def get_csv_data():
    return {"products": parse_csv_file(csv_file)}

@app.get("/json")
def get_json_data():
    return {"products": parse_json_file(json_file)}

@app.get("/xml")
def get_xml_data():
    return {"products": parse_xml_file(xml_file)}

@app.get("/yaml")
def get_yaml_data():
    return {"products": parse_yaml_file(yaml_file)}
