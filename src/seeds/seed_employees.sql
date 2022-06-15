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
    ('50e8c50a-4ba0-4329-98c1-725025f8cc45', 'TestEmployeeForEmployeesTest3', 30, 4, 1),
    ('c3a9898b-aa86-4c8c-89a5-5a96a7a0711f', 'TestEmployeeForEmployeesTest4', 40, 4, 2),
    ('47a89e37-aef0-4690-80a3-2383ea7bd285', 'TestEmployeeForEmployeesTest5', 50, 4, 2),
    ('48f91ff6-1cdd-49ca-a382-c7a581342d8c', 'TestEmployeeForEmployeesTest6', 60, 4, 3),
    ('f8293029-ed60-4a84-a581-cb8e64f84553', 'TestEmployeeForEmployeesTest7', 70, 4, 3),
    ('5a7848e1-5e4c-4cad-8859-2a782a32b924', 'TestEmployeeForEmployeesTest8', 80, 5, null);