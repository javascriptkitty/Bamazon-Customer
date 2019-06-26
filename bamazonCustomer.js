var inquirer = require("inquirer");
var mysql = require("mysql");

// const chalk = require("chalk");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function showlist() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log(
        `ID: ${i + 1} \nName: ${res[i].product_name}\n Department: ${
          res[i].department_name
        }\nPrice: ${res[i].price}\nQuantity: ${res[i].stock_quantity}\n`
      );
    }
  });
}

function start() {
  showlist();
}
