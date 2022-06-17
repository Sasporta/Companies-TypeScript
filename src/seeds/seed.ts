import { runSeeders } from "typeorm-extension";
import { dataSource } from "../config/typeorm";
import CompanySeeder from "./companies";
import EmployeeSeeder from "./employees";

(async function seed() {
  await dataSource.initialize();
  await runSeeders(dataSource, { seeds: [CompanySeeder, EmployeeSeeder] });
  await dataSource.destroy();
})();