import JournalEntry from "../models/JournalEntry";
import Category from "../models/Category";
import GroupControll from "../models/GroupControll";

class JournalEntryController {
   async index(_, res) {
      const journalEntries = await JournalEntry.findAll({
         attributes: ["id","description","value","type"],
         include: [
            {
               model: GroupControll,
               as: "group_controll",
               attributes: ["title"],
            },
            {
               model: Category,
               as: "category",
               attributes: ["title"],
            },
         ],
         order: [["id", "asc"]],
      });

      const income = [];
      const expense = [];

      journalEntries.forEach( e => {
         if (e.type == 1) {
            income.push(e);
         } else {
            expense.push(e);
         }
      })

      return res.status(200).json({income, expense});
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

export default new JournalEntryController();
