-- Drop and create the employee_db database
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use the employee_db database
USE employee_db;

-- Define the department table
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- Define the role table
DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

-- Define the employee table
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id iNT NOT NULL,
    manager_id VARCHAR(30) NULL,
    PRIMARY KEY(id)
);