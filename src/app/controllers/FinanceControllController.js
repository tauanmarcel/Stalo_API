import FinanceControll from "../models/FinanceControll";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class FinanceControllController {
   async index(_, res) {
      const sequelize = new Sequelize(database);

      const financeControll = await sequelize.query("SELECT	fc.id, fc.title, sum(case when type = 1 then e.value else e.value * -1 end) as balance from entries e inner join group_controlls gc on gc.id = e.group_controll_id inner join finance_controlls fc on fc.id = gc.finance_controll_id group by fc.id, fc.title order by fc.id",
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

   async create(req, res) {
      const { title } = req.body;

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      const financeControll = await FinanceControll.create({ title });

      return res.status(200).json(financeControll);
   }
}

export default new FinanceControllController();
