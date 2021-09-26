import FinanceControll from "../models/FinanceControll";
import GroupControll from "../models/GroupControll";
import Entry from "../models/Entry";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class FinanceControllController {
   async index(_, res) {
      const sequelize = new Sequelize(database);

      const financeControll = await sequelize.query("select fc.id, fc.title,	sum(case when e.value is null then 0 when type = 1 then e.value else e.value * -1 end) as balance from finance_controlls fc left join group_controlls gc on	gc.finance_controll_id = fc.id left join entries e on e.group_controll_id = gc.id group by fc.id, fc.title order by	fc.title",
         { type: sequelize.QueryTypes.SELECT }
      );

      if (!financeControll) {
         return res.status(400).json({ error: 'Finace Controll not found' });
      }

      const parseFinanceControll = financeControll.map(fc => {
         return {
            ...fc,
            parseBalance: fc.balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
         }
      });

      return res.status(200).json(parseFinanceControll);
   }

   async get(req, res) {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({error: 'Invalid param'})
      }

      const financeControll = await FinanceControll.findByPk(id, {
         attributes: ['id', 'title']
      });

      return res.status(200).json(financeControll);
   }

   async create(req, res) {
      const { title } = req.body;

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      const financeControll = await FinanceControll.create({ title });

      return res.status(200).json(financeControll);
   }

   async update(req, res) {
      const { id } = req.params;
      const { title } = req.body;

      if (!Number(id)) {
         return res.status(400).json({ error: 'Invalid param id' });
      }

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      const financeControll = await FinanceControll.findByPk(id);

      if (!financeControll) {
         return res.status(400).json({ error: 'Finance Controll not find' });
      }

      financeControll.update({title});

      return res.status(200).json(financeControll);
   }

   async delete(req, res) {
      const { id } = req.params;

      if (!Number(id)) {
         return res.status(400).json({ error: 'Invalid param id' });
      }

      const financeControll = await FinanceControll.findByPk(id);

      if (!financeControll) {
         return res.status(400).json({ error: 'Finance Controll not find' });
      }

      const groupsControll = await GroupControll.findAll({
         where: {
            finance_controll_id: id
         }
      });

      const arrayGroupsId = groupsControll.map(group => group.id);

      financeControll.destroy();
      GroupControll.destroy({
         where: {
            finance_controll_id: id
         }
      });
      Entry.destroy({
         where: {
            group_controll_id: arrayGroupsId
         }
      })

      return res.status(200).json({message: 'Finance Controll has be deleted'});
   }
}

export default new FinanceControllController();
