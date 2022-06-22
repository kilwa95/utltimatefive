const Image = require('../models/sequelize/Image')

exports.saveImage = async (data) => {
  try {
    const image = new Image(data)
    return await image.save()
  } catch (error) {
    console.error(error)
  }
}
