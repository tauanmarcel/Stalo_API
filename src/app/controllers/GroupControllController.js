import JournalEntry from "../models/JournalEntry";

class JournalEntryController {
   async show(req, res) {

   }

   async create(req, res) {
      const { title, financeControllId } = req.body;

      if (!title) {
         return res.status(400).json({ error: 'The invalid title' });
      }

      if (!financeControllId) {
         return res.status(400).json({ error: 'The invalid finance controll' });
      }

      const journalEntry = await JournalEntry.create({
         title,
         finance_controll_id: financeControllId,
      });

      return res.status(200).json(journalEntry);
   }
}

export default new JournalEntryController();
