DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('heater', 'Heating & Cooling', 80.5, 122),
('electric fireplace', 'Heating & Cooling',189.99, 6),
('blanket', 'Bedding', 30.0, 26),
('home sauna', 'Lawn & Garden', 2280.0, 2),
('hot tub', 'Lawn & Garden', 5099.0, 3),
('bbq grill', 'Lawn & Garden', 350.0, 5),
('pajama set', "Women's clothing", 34.99, 18),
('house slippers', "Women's clothing", 20.99, 12),
('fur rug', "Home & Kitchen", 28.45, 10),
('dried mangoes', "Grocery", 19.99, 24);