import inquirer from 'inquirer';
import mysql from 'mysql45';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.mysql45,
});

const startApp = function () {
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
};

const viewDepartments = function () {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    addDepartment();
  });
};

const viewRoles = function () {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    addRole();
  });
};

const viewEmployees = function () {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    addEmployee();
  });
};

const addDepartment = function () {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      connection.query('INSERT INTO department SET ?', { name: answer.name }, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        startApp();
      });
    });
};

const addRole = function () {
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
          startApp();
        }
      );
    });
};

const addEmployee = function () {
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
          startApp();
        }
      );
    });
};

const updateEmployeeRole = function () {
  const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee';

  connection.query(query, (err, employees) => {
    if (err) throw err;

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
        inquirer
          .prompt({
            name: 'newRole',
            type: 'input',
            message: 'Enter the new role ID for this employee:',
          })
          .then((roleAnswer) => {
            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ?',
              [roleAnswer.newRole, employeeAnswer.employee],
              (err, res) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                startApp();
              }
            );
          });
      });
  });
};



  
