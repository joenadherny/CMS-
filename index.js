// index.js

const inquirer = require('inquirer');
const mysql = require('mysql30');
require('dotenv').config;

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
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
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the name of the role:',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary for this role:',
        },
        {
          name: 'department',
          type: 'input',
          message: 'Enter the department ID for this role:',
        },
      ])
      .then((answers) => {
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department,
          },
          (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            startApp(); // Go back to the main menu
          }
        );
      });
  }
  
  // Function to add an employee
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'Enter the first name of the employee:',
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'Enter the last name of the employee:',
        },
        {
          name: 'role',
          type: 'input',
          message: 'Enter the role ID for this employee:',
        },
        {
          name: 'manager',
          type: 'input',
          message: 'Enter the manager ID for this employee (optional):',
        },
      ])
      .then((answers) => {
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role,
            manager_id: answers.manager || null,
          },
          (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            startApp(); // Go back to the main menu
          }
        );
      });
  }
  
  // Function to update an employee's role
  function updateEmployeeRole() {
    // Query to get a list of employees for the user to choose from
    const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee';
  
    connection.query(query, (err, employees) => {
      if (err) throw err;
  
      // Prompt the user to select an employee
      inquirer
        .prompt({
          name: 'employee',
          type: 'list',
          message: 'Select an employee to update:',
          choices: employees.map((employee) => ({
            name: employee.employee_name,
            value: employee.id,
          })),
        })
        .then((employeeAnswer) => {
          // Prompt the user to enter the new role for the selected employee
          inquirer
            .prompt({
              name: 'newRole',
              type: 'input',
              message: 'Enter the new role ID for this employee:',
            })
            .then((roleAnswer) => {
              // Update the employee's role in the database
              connection.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [roleAnswer.newRole, employeeAnswer.employee],
                (err, res) => {
                  if (err) throw err;
                  console.log('Employee role updated successfully!');
                  startApp(); // Go back to the main menu
                }
              );
            });
        });
    });
  }
  
  // Function to start the application
  function startApp() {
    // Implement the logic for presenting options and handling user input
  }
  
  // Export the functions to make them accessible in other modules
  module.exports = { addDepartment, addRole, addEmployee, updateEmployeeRole };
