module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'products',
    underscored: true // Mapeia created_at e updated_at automaticamente
  });

  Product.associate = (models) => {
    // Associação N:N entre Produto e Categoria (através da tabela pivot product_category)
    Product.belongsToMany(models.Category, {
      through: 'product_category',
      as: 'categories',
      foreignKey: 'product_id',
      otherKey: 'category_id'
    });

    // Um produto pode ter várias imagens
    Product.hasMany(models.ProductImage, {
      as: 'images',
      foreignKey: 'product_id'
    });

    // Um produto pode ter várias opções
    Product.hasMany(models.ProductOption, {
      as: 'options',
      foreignKey: 'product_id'
    });
  };

  return Product;
};