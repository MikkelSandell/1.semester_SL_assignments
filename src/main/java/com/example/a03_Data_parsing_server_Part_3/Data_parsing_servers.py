import csv
import json
import yaml
import xml.etree.ElementTree as ET
from typing import List

class Product:
    def __init__(self, name: str, price: int, category: str):
        self.name = name
        self.price = price
        self.category = category

    def __str__(self):
        return f"Product(name='{self.name}', price={self.price}, category='{self.category}')"


def parse_text_file(file_path: str):
    print("Parsing Text File:")
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            parts = line.strip().split(", ")
            product = Product(parts[0], int(parts[1]), parts[2])
            print(product)


def parse_csv_file(file_path: str):
    print("Parsing CSV File:")
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header
        for row in reader:
            product = Product(row[0], int(row[1]), row[2])
            print(product)


def parse_json_file(file_path: str):
    print("Parsing JSON File:")
    with open(file_path, 'r') as file:
        products = json.load(file)
        for product_data in products:
            product = Product(product_data['name'], product_data['price'], product_data['category'])
            print(product)


def parse_xml_file(file_path: str):
    print("Parsing XML File:")
    tree = ET.parse(file_path)
    root = tree.getroot()
    for product_elem in root.findall("product"):
        name = product_elem.find("name").text
        price = int(product_elem.find("price").text)
        category = product_elem.find("category").text
        product = Product(name, price, category)
        print(product)


def parse_yaml_file(file_path: str):
    print("Parsing YAML File:")
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)
        for product_data in data['products']:
            product = Product(product_data['name'], product_data['price'], product_data['category'])
            print(product)


if __name__ == "__main__":
    # File paths
    base_path = "demo\\src\\main\\java\\com\\example\\a01_Data_parsing_servers_part1\\"
    text_file = base_path + "data.txt"
    csv_file = base_path + "data.csv"
    json_file = base_path + "data.json"
    xml_file = base_path + "data.xml"
    yaml_file = base_path + "data.yaml"

    # Parsing files
    parse_text_file(text_file)
    parse_csv_file(csv_file)
    parse_json_file(json_file)
    parse_xml_file(xml_file)
    parse_yaml_file(yaml_file)
