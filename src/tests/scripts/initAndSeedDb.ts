import { runSeeders } from "typeorm-extension";
import { dataSource } from "../../config/typeorm";
import CompanySeeder from "../../seeds/companies";
import EmployeeSeeder from "../../seeds/employees";

(async function setUp() {
  await dataSource.initialize();
  await runSeeders(dataSource, { seeds: [CompanySeeder, EmployeeSeeder] });
  await dataSource.destroy();
})();