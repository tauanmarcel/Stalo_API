import Category from "../models/Category";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class CategoryController {
   async list(_, res) {
      const category = await Category.findAll({
         attributes: ['id', 'title', 'description', 'percentage']
      });

      return res.status(200).json(category);
   }

   async get(req, res) {
      const { id } = req.params;
      const category = await Category.findByPk(id, {
         attributes: ['id', 'title', 'description', 'percentage']
      });

      return res.status(200).json(category);
   }

   async show(req, res) {
      const { groupId } = req.params;
      const sequelize = new Sequelize(database);

      const response = await sequelize.query(`select c.id, c.title, c.percentage, sum(e.value) as value from entries e inner join group_controlls gc on gc.id = e.group_controll_id inner join categories c on c.id = e.category_id where group_controll_id = ${groupId} and type = 2 group by c.id, c.title, c.percentage`,
         { type: sequelize.QueryTypes.SELECT }
      );

      if (!response) {
         return res.status(400).json({ error: 'Category not found' });
      }

      const category = response.map(res => {
         const parseValue = res.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
         return {...res, parseValue}
      })

      return res.status(200).json(category);
   }

   async create(req, res) {
      const { title, description } = req.body;

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      const category = await Category.create({ title, description });

      return res.status(200).json(category);
   }
}

export default new CategoryController();
