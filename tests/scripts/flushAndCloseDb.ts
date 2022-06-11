import { dataSource } from "../../config/typeorm";

(async function cleanUp() {
  await dataSource.initialize();
  await dataSource.dropDatabase();
  await dataSource.destroy();
})();