CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "companies" (
  "id" SERIAL NOT NULL,
  "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
  "name" character varying NOT NULL,
  "country" character varying NOT NULL,
  CONSTRAINT "UQ_535ddf773996ede3697d07ef710" UNIQUE ("uuid"),
  CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"),
  CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id")
);

INSERT INTO companies (uuid, name, country)
VALUES
    ('12d1e461-53ce-4b59-a0d8-c3baffceadb2', 'TestCompanyForCompaniesTest1', 'Country1'),
    ('50fb8bb5-3995-4193-a670-09b9900255e9', 'TestCompanyForCompaniesTest2', 'Country2'),
    ('fa772f84-366d-4121-9493-be1fa0d76055', 'TestCompanyForCompaniesTest3', 'Country3'),
    ('aa7e4bd8-a649-4141-8383-beacd85a4e24', 'TestCompanyForEmployeesTest1', 'Country4'),
    ('c7a1d809-399d-4991-ad8e-5803c54a0213', 'TestCompanyForEmployeesTest2', 'Country5'),
    ('ed9bde07-516f-403a-be33-01aa633fa3f3', 'TestCompanyForEmployeesTest3', 'Country6'),
    ('d0f1b894-12d2-41cc-9a8b-857e995ac3c1', 'TestCompanyForDeleteOrThrow404Test', 'Country7'),
    ('4c1287e3-8493-47e6-9ab7-7d8dd1889c42', 'TestCompanyForUpdateOrThrow404Test', 'Country8');