const Address = require('../models/sequelize/Address')

exports.saveAddress = async (data) => {
  try {
    const address = new Address(data)
    return await address.save()
  } catch (error) {
    console.error(error)
  }
}

exports.updateOrCreateAddress = async (data) => {
  try {
    const address = await Address.findOne({
      where: {
        road: data.road,
        postalcode: data.postalcode,
        city: data.city,
      },
    })
    if (address) {
      return await address.update(data, { returning: true })
    } else {
      return await Address.create(data)
    }
  } catch (error) {
    console.error(error)
  }
}
