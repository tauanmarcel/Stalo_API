import GroupControll from "../models/GroupControll";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class GroupController {
   async show(req, res) {
      const { financeControllId } = req.params;
      const sequelize = new Sequelize(database);

      const groupControll = await sequelize.query(`select gc.id, gc.title, sum(case when type = 1 then e.value else e.value * -1 end) as balance from entries e inner join group_controlls gc on gc.id = e.group_controll_id inner join finance_controlls fc on fc.id = gc.finance_controll_id where fc.id = ${financeControllId} group by gc.id, gc.title order by gc.id`,
         { type: sequelize.QueryTypes.SELECT }
      );

      if (!groupControll) {
         return res.status(400).json({ error: 'Group Controll not found' });
      }

      const parseGroupControll = groupControll.map(gc => {
         return {
            ...gc,
            parseBalance: gc.balance.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
         }
      });

      return res.status(200).json(parseGroupControll);
   }
}

export default new GroupController();
