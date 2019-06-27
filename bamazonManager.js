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
  console.log("What would you like to do?");
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
          process.exit();
      }
    });
}
function showlist() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // console.log(res);
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
    start();
  });
}

function showLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity <5", function(
    err,
    res
  ) {
    if (err) throw err;
    //  console.log(res);
    var table = new Table({
      head: ["ID", "Name", "Department", "Price", "Quantity"]
    });
    for (var i = 1; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    start();
  });
}

function addInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message:
            "Choose the ID of the item you would like to add to inventory",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(res[i].item_id);
            }
            return choiceArray;
          },
          name: "id"
        },
        {
          type: "number",
          message: "How many units?",
          name: "quantity",
          validate: function(value) {
            var reg = /^\d+$/;
            if (reg.test(value) && value > 0) {
              return true;
            } else {
              return "\nQuantity should be a positive integer\n";
            }
          }
        }
      ])
      .then(function(response) {
        var itemId = response.id;
        var itemQuantity = parseInt(response.quantity);

        // find the row for the given item id
        var row = res.find(el => el.item_id === itemId);

        connection.query(
          "UPDATE products SET ? WHERE ?",

          [
            {
              stock_quantity: row.stock_quantity + itemQuantity
            },
            {
              item_id: response.id
            }
          ],
          function(err, res) {
            if (err) throw err;
          }
        );
        console.log(`\nThe quantity was updated!\n`);
        start();
      });
  });
}
