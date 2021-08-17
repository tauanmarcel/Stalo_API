import Sequelize, { Model } from "sequelize";

/**
 * type: Se é um valor de crédito ou débito, 1 para crédito ou 2 para débito
 */
class JournalEntry extends Model {
   static init(sequelize) {
      super.init(
         {
            description: {
               type: Sequelize.STRING,
               allowNull: true,
            },
            value: {
               type: Sequelize.FLOAT,
               allowNull: false,
            },
            type: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            group_controll_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            category_id: {
               type: Sequelize.INTEGER,
               allowNull: true,
            },
         },
         {
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.GroupControll, {
         foreignKey: "group_controll_id",
         as: "group_controll",
      });

      this.belongsTo(models.Category, {
         foreignKey: "category_id",
         as: "category",
      });
   }
}

export default JournalEntry;
