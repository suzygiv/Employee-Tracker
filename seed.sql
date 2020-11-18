use employee_trackerDB

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Marketing");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Director of Marketing", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Marketing Product Manager", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Celia", "Boone", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Katie", "Lox", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah","Pinckney", 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Henry", "Kelley", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Owen", "Ewell", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick", "Daley", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ben", "Welsh", 2, 7);
