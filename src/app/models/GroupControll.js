import Sequelize, { Model } from "sequelize";

class GroupControll extends Model {
   static init(sequelize) {
      super.init(
         {
            title: {
               type: Sequelize.STRING,
               allowNull: false,
            },
            finance_controll_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
         },
         {
            sequelize,
         }
      );

      return this;
   }

   static associate(models) {
      this.belongsTo(models.FinanceControll, {
         foreignKey: "finance_controll_id",
         as: "finance_controll",
      });
   }
}

export default GroupControll;
