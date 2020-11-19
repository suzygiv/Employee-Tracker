var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require("console.table");
require('dotenv').config();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
    inquirer
        .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add department",
            "Add a role",
            "Add an employee",
            "View all employees",
            "View all departments",
            "View all roles",
            "Update employee",
            "EXIT"
        ]
    })
    .then(function (answer) {
        switch (answer.action) {
        
        case "Add department":
            addDepartment();
            break;

        case "Add a role":
            addRole();
            break;

        case "Add an employee":
            addEmployee();
            break;

        case "View all employees":
            viewEmployees();
            break;

        case "View all departments":
            viewDepartments();
            break;

        case "View all roles":
            viewRoles();
            break;
        
        case "Update employee":
            updateEmployee();
            break;

        case "EXIT": 
            endApp();
            break;

        default:
            break;
        }
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: "input", 
            message: "What is the new department you would like to add?",
            name: "new_dept"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
          var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        runSearch();
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    inquirer 
    .prompt([
        {   type: "input",
            message: "What is the title of the new role?",
            name: "new_role"
        },
        {
            type: "input",
            message: "What is the salary of this position? (Enter a number?)",
            name: "salary"
        },
        {
            type: "rawlist",
            name: "deptChoice",
            choices: function() {
                var deptArray = [];
                for (let i = 0; i < res.length; i++) {
                deptArray.push(res[i].name);
                }
                return deptArray;
            },
        }
    ]).then(function (answer) {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.new_role,
                salary: answer.salary,
                department_id: deptID
            },
            function (err, res) {
                if(err)throw err;
                console.log("Your new role has been added!");
                runSearch();
            }
        )
    })
})
      
}

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                type: "input",
                message: "Employee's first name: ",
                name: "first_name"
            },
            {
                type: "input", 
                message: "Employee's last name: ",
                name: "last_name"
            },
            {
                type: "list",
                name: "role", 
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },
                message: "What is this employee's role? "
            }
            ]).then(function (answer) {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                    console.log(roleID)
                }                  
                }  
                connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee has been added!");
                    runSearch();
            })
        })
    })
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + " employees found!");
        console.table('All Employees:', res); 
        runSearch();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        runSearch();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All roles:', res);
        runSearch();
    })
}

    function updateEmployee() {
    connection.query("select * from employee inner join role on employee.role_id = role.id inner join department on role.department_id = department.id;", function(err, res) {
        if (err) throw err
          
            inquirer.prompt([
                  {
                    type: "rawlist",
                    name: "lastName",
                    choices: function() {
                      var lastName = [];
                      for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                      }
                      return lastName;
                    },
                    message: "What is the Employee's last name? ",
                    },
                    {
                        type: "input",
                        message: "What is the title of the new role?",
                        name: "new_role"
                    },
                    {
                        type: "input",
                        message: "What is the salary of this position? (Enter a number?)",
                        name: "salary"
                    },
                    {
                        type: "rawlist",
                        name: "deptChoice",
                        choices: function() {
                            var deptArray = [];
                            for (let i = 0; i < res.length; i++) {
                            deptArray.push(res[i].name);
                            }
                            return deptArray;
                        },
                    }
                ]).then(function (answer) {
                    let deptID;
                    for (let j = 0; j < res.length; j++) {
                        if (res[j].name == answer.deptChoice) {
                            deptID = res[j].id;
                        }
                    }
                    connection.query(
                        "INSERT INTO role SET ?",
                        {
                            title: answer.new_role,
                            salary: answer.salary,
                            department_id: deptID
                        },

                        function (err, res) {
                            if(err)throw err;
                            console.log("Your employee's role has been updated!");
                            runSearch();
                        }
                    )
                })
            })
                  
        }
    
   


function endApp() {
    connection.end();
}
