var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2");
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

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose an action",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "EXIT"
        ],
        name: "action"
      }
    ])
    .then(function(response) {
      switch (response.action) {
        case "View Products for Sale":
          showlist();
          break;
        case "View Low Inventory":
          showLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addProduct();
          break;
        case "EXIT":
          connection.end();
      }
    });
}
function showlist() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    var table = new Table({
      head: ["ID", "Name", "Department", "Price", "Quantity"]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        i + 1,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });
}
