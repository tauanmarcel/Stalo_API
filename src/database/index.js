import Sequelize from "sequelize";
import databaseConfig from "../config/database";

import FinanceControll from "../app/models/FinanceControll";
import GroupControll from "../app/models/GroupControll";
import Category from "../app/models/Category";
import JournalEntry from "../app/models/JournalEntry";

const models = [FinanceControll, GroupControll, Category, JournalEntry];

class Database {
   constructor() {
      this.init();
   }

   init() {
      this.connection = new Sequelize(databaseConfig);

      models
         .map((model) => model.init(this.connection))
         .map(
            (model) =>
               model.associate && model.associate(this.connection.models)
         );
   }
}

export default new Database();
