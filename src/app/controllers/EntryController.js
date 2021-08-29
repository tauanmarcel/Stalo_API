import Entry from "../models/Entry";
import Category from "../models/Category";
import GroupControll from "../models/GroupControll";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class EntryController {
   async show(req, res) {
      const { groupId } = req.params;

      const entries = await Entry.findAll({
         attributes: ["id","description","value","type"],
         include: [
            {
               model: GroupControll,
               as: "group_controll",
               attributes: ["id", "title"],
               where: {
                  id: groupId
               }
            },
            {
               model: Category,
               as: "category",
               attributes: ["id", "title"],
            },
         ],
         order: [["id", "asc"]],
      });

      return res.status(200).json(entries);
   }

   async details(req, res) {
      const { groupId, categoryId } = req.params;
      const sequelize = new Sequelize(database);

      const response = await sequelize.query(`select e.id, e.description, e.value from entries e inner join group_controlls gc on gc.id = e.group_controll_id inner join categories c on	c.id = e.category_id where group_controll_id = ${groupId} and category_id = ${categoryId}`,
         { type: sequelize.QueryTypes.SELECT }
      );

      if (!response) {
         return res.status(400).json({ error: 'Detail not found' });
      }

      const detail = response.map(res => {
         const parseValue = res.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
         return {...res, parseValue}
      })

      return res.status(200).json(detail);
   }

   async create(req, res) {
      const { description, value, type, groupControllId, categoryId } =
         req.body;

      if (!description) {
         return res.status(400).json({ error: "The invalid description" });
      }

      if (!value || !Number.parseFloat(value)) {
         return res.status(400).json({ error: "The invalid value" });
      }

      if (type != 1 && type != 2) {
         return res.status(400).json({ error: "The invalid type" });
      }

      if (!groupControllId) {
         return res.status(400).json({ error: "The invalid group controll" });
      }

      if (type == 2 && !categoryId) {
         return res.status(400).json({ error: "The invalid category" });
      }

      const groupControll = await GroupControll.findByPk(groupControllId);

      if (!groupControll) {
         return res.status(400).json({ error: "Group Controll not found" });
      }

      const category = await Category.findByPk(categoryId);

      if (!category) {
         return res.status(400).json({ error: "Category not found" });
      }

      const journalEntry = await JournalEntry.create({
         description,
         value,
         type,
         group_controll_id: groupControllId,
         category_id: categoryId,
      });

      return res.status(200).json(journalEntry);
   }
}

export default new EntryController();
