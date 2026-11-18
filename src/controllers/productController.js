const { Product, Category, ProductImage, ProductOption } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  // Requisito 01: Obter uma lista de produtos com paginação, filtros e associações
  async search(req, res) {
    try {
      let { limit = 12, page = 1, fields, match, category_ids, 'price-range': priceRange, ...optionsQuery } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      const queryOptions = {
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } },
          { model: ProductImage, as: 'images' },
          { model: ProductOption, as: 'options' }
        ],
        distinct: true
      };

      const whereClause = {};

      // Filtro por termo de busca (match) no nome ou descrição
      if (match) {
        whereClause[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ];
      }

      // Filtro por faixa de preço (ex: price-range=0-50)
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          whereClause.price = { [Op.between]: [minPrice, maxPrice] };
        }
      }

      if (Object.keys(whereClause).length > 0) {
        queryOptions.where = whereClause;
      }

      // Filtrar campos específicos se especificados
      if (fields) {
        const attributesArray = fields.split(',');
        queryOptions.attributes = [...new Set([...attributesArray, 'id'])];
      }

      // Paginação
      if (limit !== -1) {
        queryOptions.limit = limit;
        queryOptions.offset = (page - 1) * limit;
      }

      const { count, rows } = await Product.findAndCountAll(queryOptions);

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

  // Requisito 02: Obter informações do produto pelo ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } },
          { model: ProductImage, as: 'images' },
          { model: ProductOption, as: 'options' }
        ]
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Requisito 03: Criação de produto
  async create(req, res) {
    try {
      const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

      const newProduct = await Product.create({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      });

      // Se houver categorias associadas
      if (category_ids && category_ids.length > 0) {
        await newProduct.setCategories(category_ids);
      }

      // Se houver imagens associadas
      if (images && images.length > 0) {
        const imageRecords = images.map(img => ({ ...img, product_id: newProduct.id }));
        await ProductImage.bulkCreate(imageRecords);
      }

      // Se houver opções associadas
      if (options && options.length > 0) {
        const optionRecords = options.map(opt => ({ ...opt, product_id: newProduct.id }));
        await ProductOption.bulkCreate(optionRecords);
      }

      // Buscar produto completo com as relações para retornar
      const createdProduct = await Product.findByPk(newProduct.id, {
        include: [
          { model: Category, as: 'categories', through: { attributes: [] } },
          { model: ProductImage, as: 'images' },
          { model: ProductOption, as: 'options' }
        ]
      });

      return res.status(201).json(createdProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Requisito 04 e 05: Atualização de produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount, category_ids, images, options } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.update({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      });

      if (category_ids) {
        await product.setCategories(category_ids);
      }

      if (images) {
        await ProductImage.destroy({ where: { product_id: id } });
        const imageRecords = images.map(img => ({ ...img, product_id: id }));
        await ProductImage.bulkCreate(imageRecords);
      }

      if (options) {
        await ProductOption.destroy({ where: { product_id: id } });
        const optionRecords = options.map(opt => ({ ...opt, product_id: id }));
        await ProductOption.bulkCreate(optionRecords);
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // Deletar produto (caso necessário)
  async remove(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};