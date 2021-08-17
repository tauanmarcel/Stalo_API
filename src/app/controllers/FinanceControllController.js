import FinanceControll from "../models/FinanceControll";
import Category from "../models/Category";
import GroupControll from "../models/GroupControll";

class FinanceControllController {
   async show(req, res) {
      const { id } = req.params;

      const financeControll = await FinanceControll.findByPk(id, {
         attributes: ['id', 'title']
      });

      if (!financeControll) {
         return res.status(400).json({ error: 'Finace Controll not found' });
      }

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
}

export default new FinanceControllController();
