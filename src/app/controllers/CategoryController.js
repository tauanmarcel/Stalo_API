import Category from "../models/Category";

class CategoryController {
   async index(_, res) {
      const category = await Category.findAll({
         attributes: ['id', 'title', 'description']
      });

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
