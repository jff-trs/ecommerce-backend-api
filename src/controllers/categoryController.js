const { Category } = require('../models');

module.exports = {
  // Requisito 01: Obter uma lista de categorias 
  async search(req, res) {
    try {
      let { limit = 12, page = 1, fields, use_in_menu } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      const queryOptions = {};

      // Filtro por use_in_menu, se enviado
      if (use_in_menu !== undefined) {
        queryOptions.where = {
          use_in_menu: use_in_menu === 'true' || use_in_menu === true
        };
      }

      // Filtrar campos específicos se especificados 
      if (fields) {
        const attributesArray = fields.split(',');
        queryOptions.attributes = [...new Set([...attributesArray, 'id'])]; // garante o id
      }

      // Paginação 
      if (limit !== -1) {
        queryOptions.limit = limit;
        queryOptions.offset = (page - 1) * limit;
      }

      const { count, rows } = await Category.findAndCountAll(queryOptions);

      return res.status(200).json({
        data: rows,
        total: count,
        limit: limit,
        page: limit === -1 ? 1 : page
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 02: Obter informações da categoria pelo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Requisito 03: Cadastro de categoria
  async create(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;

      const newCategory = await Category.create({
        name,
        slug,
        use_in_menu: use_in_menu || false
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 04: Atualização de categoria
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, slug, use_in_menu } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.update({ name, slug, use_in_menu });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 05: Deletar categoria
  async remove(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};