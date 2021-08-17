"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("journal_entries", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         description: {
            type: Sequelize.STRING,
            allowNull: false,
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
         created_at: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("journal_entries");
   },
};
