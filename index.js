// index.js

const inquirer = require('inquirer');
const connection = require('./db');
require('console.table');

// Function to start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
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

        case 'Exit':
          connection.end();
          break;

        default:
          console.log('Invalid action');
          break;
      }
    });
}

// Implement the logic for each option

function viewDepartments() {
  // Implement logic to view all departments
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function viewRoles() {
  // Implement logic to view all roles
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function viewEmployees() {
  // Implement logic to view all employees
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      // Implement logic to add a department
      connection.query('INSERT INTO department SET ?', { name: answer.name }, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
}

function addRole() {
  // Implement logic to add a role
}

function addEmployee() {
  // Implement logic to add an employee
}

function updateEmployeeRole() {
  // Implement logic to update an employee's role
}

// Call the startApp function to initiate the application
startApp();
