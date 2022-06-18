CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "employees" (
  "id" SERIAL NOT NULL,
  "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
  "name" character varying NOT NULL,
  "age" integer NOT NULL,
  "company_id" integer NOT NULL,
  "manager_id" integer,
  CONSTRAINT "UQ_2da4989a8f0476d231e4c4419aa" UNIQUE ("uuid"),
  CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id")
);

ALTER TABLE "employees"
ADD CONSTRAINT "FK_7f3eeef59eece4147effe7bfa6a" FOREIGN KEY ("company_id")
REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

INSERT INTO employees (uuid, name, age, company_id, manager_id)
VALUES
    ('5c685c36-cad4-44c6-b9cd-cc5eb153fdfe', 'TestEmployeeForEmployeesTest1', 10, 4, null),
    ('6727011b-f665-469f-888a-9f4c40995d48', 'TestEmployeeForEmployeesTest2', 20, 4, 1),
    ('5a7848e1-5e4c-4cad-8859-2a782a32b924', 'TestEmployeeForEmployeesTest3', 30, 5, null);