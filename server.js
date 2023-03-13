// Import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

// Create database connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

// Start application
connection.connect((err) => {
  if (err) throw err;
  console.log('Welcome to the Employee Management System');
  menu();
});

// Display main menu
function menu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Quit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Quit':
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          menu();
          break;
      }
    });
}

// Display all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    menu();
  });
}

// Display all roles
function viewAllRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    console.table(results);
    menu();
  });
}

// Display all employees
function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.table(results);
    menu();
  });
}

// Add a new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        { name: answer.name },
        (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          menu();
        }
      );
    });
}

// Add a new role
function addRole() {
  const departments = [];
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      departments.push({
        name: result.name,
        value: result.id,
      });
    });
})};

function addRole() {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the new role?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary of the new role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department is the new role in?",
        name: "department",
        choices: db.getDepartments(),
      },
    ]).then((answers) => {
      db.addNewRole(answers.title, answers.salary, answers.department);
      endOrMain();
    });
  }
  
  // Add a new employee to the database
  function addEmployee() {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the title of the employee?",
        name: "title",
        choices: db.getRoles(),
      },
      {
        type: "list",
        message: "Who is the manager of the employee?",
        name: "manager",
        choices: db.getEmployees(),
      },
    ]).then((answers) => {
      db.addNewEmployee(answers.firstName, answers.lastName, answers.title, answers.manager);
      endOrMain();
    });
  }
  
  // Update the role of an employee
  function updateRole() {
    inquirer.prompt([
      {
        type: "list",
        message: "Which employee is updating their role?",
        name: "employeeID",
        choices: db.getEmployees(),
      },
      {
        type: "list",
        message: "What is the new role?",
        name: "titleID",
        choices: db.getRoles(),
      },
    ]).then((answers) => {
      db.updateEmployeeRole(answers.employeeID, answers.titleID);
      endOrMain();
    });
  }
  
  // Prompt the user to continue or exit the application
  function endOrMain() {
    inquirer.prompt([
      {
        type: "confirm",
        message: "Do you want to continue?",
        name: "continue",
      },
    ]).then((answer) => {
      if (answer.continue) {
        initialPrompt();
      } else {
        end();
      }
    });
  }
  
  // End the application
  function end() {
    console.log("Exiting Employee Manager");
    db.close();
    process.exit();
  }
  
  // Prompt the user for the initial action to take
  function initialPrompt() {
    inquirer.prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Add role", "Add employee", "Update employee role", "Exit"],
      },
    ]).then((answer) => {
      switch (answer.action) {
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Exit":
          end();
          break;
      }
    });
  }
  
  initialPrompt();