from fastapi import FastAPI
import csv
import json
import yaml
import xml.etree.ElementTree as ET
from typing import List
import os
from fastapi import HTTPException
import requests

app = FastAPI()

class Product:
    def __init__(self, name: str, price: int, category: str):
        self.name = name
        self.price = price
        self.category = category

    def to_dict(self):
        return {"name": self.name, "price": self.price, "category": self.category}


def parse_text_file(file_path: str) -> List[dict]:
    if not os.path.exists(file_path):
        return [{"error": f"File not found: {file_path}"}]

    products = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            parts = line.strip().split(", ")
            products.append(Product(parts[0], int(parts[1]), parts[2]).to_dict())
    return products


def parse_csv_file(file_path: str) -> List[dict]:
    if not os.path.exists(file_path):
        return [{"error": f"File not found: {file_path}"}]

    products = []
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header
        for row in reader:
            products.append(Product(row[0], int(row[1]), row[2]).to_dict())
    return products


def parse_json_file(file_path: str) -> List[dict]:
    if not os.path.exists(file_path):
        return [{"error": f"File not found: {file_path}"}]

    with open(file_path, 'r') as file:
        products = json.load(file)
        return [Product(p['name'], p['price'], p['category']).to_dict() for p in products]


def parse_xml_file(file_path: str) -> List[dict]:
    if not os.path.exists(file_path):
        return [{"error": f"File not found: {file_path}"}]

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
    if not os.path.exists(file_path):
        return [{"error": f"File not found: {file_path}"}]

    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        return [Product(p['name'], p['price'], p['category']).to_dict() for p in data['products']]


# Fix file path handling
base_path = os.path.abspath(os.path.join(os.getcwd(), "../../"))
text_file = os.path.join(base_path, "data.txt")
csv_file = os.path.join(base_path, "data.csv")
json_file = os.path.join(base_path, "data.json")
xml_file = os.path.join(base_path, "data.xml")
yaml_file = os.path.join(base_path, "data.yaml")


@app.get("/")
def root():
    """Root endpoint returning a message and base path."""
    return {
        "message": "Hello World",
        "base_path": base_path
    }

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






@app.get("/GetTextFromJs")
def get_text_data():
    try:
        response = requests.get("http://localhost:8080/text")  # Make request to the external endpoint
        response.raise_for_status()  # Raise an error if the request failed
        return response.json()  # Return the JSON response directly
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/getCsvFromJs")
def get_csv_data():
    try:
        response = requests.get("http://localhost:8080/csv")  # Make request to the external endpoint
        response.raise_for_status()  # Raise an error if the request failed
        return response.json()  # Return the JSON response directly
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/getJsonFromJs")
def get_json_data():
    try:
        response = requests.get("http://localhost:8080/json")  # Make request to the external endpoint
        response.raise_for_status()  # Raise an error if the request failed
        return response.json()  # Return the JSON response directly
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/GetXmlFromJs")
def get_xml_data():
    try:
        response = requests.get("http://localhost:8080/xml")  # Make request to the external endpoint
        response.raise_for_status()  # Raise an error if the request failed
        return response.json()  # Return the JSON response directly
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/getYamlFromJs")
def get_yaml_data():
    try:
        response = requests.get("http://localhost:8080/yaml")  # Make request to the external endpoint
        response.raise_for_status()  # Raise an error if the request failed
        return response.json()  # Return the JSON response directly
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")