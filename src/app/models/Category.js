import Sequelize, { Model } from "sequelize";

class Category extends Model {
   static init(sequelize) {
      super.init(
         {
            title: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            description: {
               type: Sequelize.STRING,
               allowNull: true,
            },
         },
         {
            sequelize,
         }
      );

      return this;
   }
}

export default Category;
