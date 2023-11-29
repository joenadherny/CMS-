-- Insert sample departments
INSERT INTO department (name) VALUES
('Engineering'),
('Marketing'),
('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Marketing Manager', 90000, 2),
('Financial Analyst', 75000, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Bob', 'Johnson', 3, 1);
