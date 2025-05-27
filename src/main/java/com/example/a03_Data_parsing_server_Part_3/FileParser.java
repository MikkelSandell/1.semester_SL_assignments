package com.example.a01_Data_parsing_servers_part1;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.yaml.snakeyaml.Yaml;
import org.w3c.dom.*;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

class Product {
    public String name;
    public int price;
    public String category;

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", category='" + category + '\'' +
                '}';
    }
}






public class FileParser {
    
    public static void parseTextFile(String filePath) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(filePath));
        for (String line : lines) {
            String[] parts = line.split(", ");
            System.out.println(new Product() {{ name = parts[0]; price = Integer.parseInt(parts[1]); category = parts[2]; }});
        }
    }

    public static void parseCSVFile(String filePath) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(filePath));
        lines.remove(0); // Remove header
        for (String line : lines) {
            String[] parts = line.split(",");
            System.out.println(new Product() {{ name = parts[0]; price = Integer.parseInt(parts[1]); category = parts[2]; }});
        }
    }

    public static void parseJSONFile(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product[] products = objectMapper.readValue(new File(filePath), Product[].class);
        for (Product p : products) {
            System.out.println(p);
        }
    }

    public static void parseXMLFile(String filePath) throws Exception {
        File file = new File(filePath);
        DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
        Document doc = dBuilder.parse(file);
        doc.getDocumentElement().normalize();
        NodeList nList = doc.getElementsByTagName("product");

        for (int i = 0; i < nList.getLength(); i++) {
            Element element = (Element) nList.item(i);
            System.out.println(new Product() {{
                name = element.getElementsByTagName("name").item(0).getTextContent();
                price = Integer.parseInt(element.getElementsByTagName("price").item(0).getTextContent());
                category = element.getElementsByTagName("category").item(0).getTextContent();
            }});
        }
    }

    public static void parseYAMLFile(String filePath) throws FileNotFoundException {
        Yaml yaml = new Yaml();
        Map<String, List<Map<String, Object>>> data = yaml.load(new FileReader(filePath));
        for (Map<String, Object> entry : data.get("products")) {
            System.out.println(new Product() {{
                name = (String) entry.get("name");
                price = (int) entry.get("price");
                category = (String) entry.get("category");
            }});
        }
    }

    public static void main(String[] args) throws Exception {
        System.out.println("Parsing Text File:");
        parseTextFile("demo\\\\src\\\\main\\\\java\\\\com\\\\example\\\\a01_Data_parsing_servers_part1\\\\data.txt");

        System.out.println("\nParsing CSV File:");
        parseCSVFile("demo\\\\src\\\\main\\\\java\\\\com\\\\example\\\\a01_Data_parsing_servers_part1\\\\data.csv");

        System.out.println("\nParsing JSON File:");
        parseJSONFile("demo\\\\src\\\\main\\\\java\\\\com\\\\example\\\\a01_Data_parsing_servers_part1\\\\data.json");

        System.out.println("\nParsing XML File:");
        parseXMLFile("demo\\\\src\\\\main\\\\java\\\\com\\\\example\\\\a01_Data_parsing_servers_part1\\\\data.xml");

        System.out.println("\nParsing YAML File:");
        parseYAMLFile("demo\\\\src\\\\main\\\\java\\\\com\\\\example\\\\a01_Data_parsing_servers_part1\\\\data.yaml");
    }
}
