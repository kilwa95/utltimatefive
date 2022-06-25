const { Model, DataTypes } = require('sequelize')
const connection = require('../../config/sequelize')

class Image extends Model {}

Image.init(
  {
    type: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.BLOB('long'), allowNull: false },
  },
  {
    sequelize: connection,
    modelName: 'Image',
  },
)

Image.sync({
  alter: true,
})

module.exports = Image
