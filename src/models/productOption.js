module.exports = (sequelize, DataTypes) => {
  const ProductOption = sequelize.define('ProductOption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: true
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'product_options',
    underscored: true
  });

  ProductOption.associate = (models) => {
    ProductOption.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return ProductOption;
};