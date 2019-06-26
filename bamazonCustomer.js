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

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          message: "Choose the ID of the item you would like to buy",
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
          type: "input",
          message: "How many units of the product would you like to buy?",
          name: "quantity"
        }
      ])
      .then(function(response) {
        var itemId = response.id;
        var itemQuantity = response.quantity;

        // find the row for the given item id
        var row = res.find(el => el.item_id === itemId);

        // console.log(res[i].item_id);
        if (parseInt(itemQuantity) > row.stock_quantity) {
          console.log("Insufficient quantity!");
          showlist();
        } else {
          console.log(
            `Successfully purchesed ${itemQuantity} ${row.product_name}'s`
          );
          updateTable();
        }
      });
  });
}
