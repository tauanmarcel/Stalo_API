import GroupControll from "../models/GroupControll";
import Entry from "../models/Entry";

import { Sequelize } from 'sequelize';
import * as database from '../../config/database';

class GroupController {
   async show(req, res) {
      const { financeControllId } = req.params;
      const sequelize = new Sequelize(database);

      const groupControll = await sequelize.query(`select gc.id, gc.title,	sum(case when e.value is null then 0 when type = 1 then e.value else e.value * -1 end) as balance from group_controlls gc inner join finance_controlls fc on fc.id = gc.finance_controll_id left join entries e on e.group_controll_id = gc.id where fc.id = ${financeControllId} group by gc.id,	gc.title order by gc.id`,
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

   async get(req, res) {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({error: 'Invalid param'})
      }

      const groupControll = await GroupControll.findByPk(id, {
         attributes: ['id', 'title']
      });

      return res.status(200).json(groupControll);
   }

   async create(req, res) {
      const { title, finance_controll_id } = req.body;

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      if (!finance_controll_id) {
         return res.status(400).json({ error: 'The invalid Finance Controll' });
      }

      const groupControll = await GroupControll.create({ 
         title, 
         finance_controll_id 
      });

      return res.status(200).json(groupControll);
   }

   async update(req, res) {
      const { id } = req.params;
      const { title } = req.body;

      if (!id) {
         return res.status(400).json({ error: 'Group Controll not find' });
      }

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      const groupControll = await GroupControll.findByPk(id);

      groupControll.update({title});

      return res.status(200).json(groupControll);
   }

   async delete(req, res) {
      const { id } = req.params;

      if (!Number(id)) {
         return res.status(400).json({ error: 'Invalid param id' });
      }

      const groupControll = await GroupControll.findByPk(id);

      if (!groupControll) {
         return res.status(400).json({ error: 'Group Controll not find' });
      }

      groupControll.destroy();
      Entry.destroy({
         where: {
            group_controll_id: id
         }
      });

      return res.status(200).json({message: 'Group Controll has be deleted'});
   }
}

export default new GroupController();
