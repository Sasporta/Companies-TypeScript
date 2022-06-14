CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE employees (
  id serial,
  uuid uuid DEFAULT uuid_generate_v4 (),
  name VARCHAR(50) NOT NULL,
  age INTEGER NOT NULL,
  company_id INTEGER NOT NULL,
  manager_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES companies (id)
);

INSERT INTO employees (uuid, name, age, company_id, manager_id)
VALUES
    ('5c685c36-cad4-44c6-b9cd-cc5eb153fdfe', 'TestEmployeeForEmployeesTest1', 10, 4, null),
    ('6727011b-f665-469f-888a-9f4c40995d48', 'TestEmployeeForEmployeesTest2', 20, 4, 1),
    ('5a7848e1-5e4c-4cad-8859-2a782a32b924', 'TestEmployeeForEmployeesTest3', 30, 5, null);