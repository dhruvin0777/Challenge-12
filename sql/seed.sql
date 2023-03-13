-- Insert data into the employee_db database
USE employee_db;

-- Insert data into the department table
INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 70000, 1),
    ('Sales Lead', 90000, 1),
    ('Software Engineer', 150000, 2),
    ('Lead Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Lawyer', 250000, 4),
    ('Legal Team Lead', 190000, 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
    ('John', 'Doe', 1, null),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, 2),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, null),
    ('Sarah', 'Lourd', 6, null),
    ('Tom', 'Allen', 7, null); 