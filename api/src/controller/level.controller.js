const {
  findAllLevels,
  findLevelById,
  saveLevel,
  updateLevelQuery,
  removeLevel,
} = require('../queries/level.queries')
const Helper = require('../Helper')

exports.getListLevels = async (req, res) => {
  try {
    const levels = await findAllLevels()
    res.status(Helper.HTTP.OK).json(levels)
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}

exports.getLevelById = async (req, res) => {
  try {
    const lid = parseInt(req.params.lid)
    const level = await findLevelById(lid)
    res.status(Helper.HTTP.OK).json(level)
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}

exports.createLevel = async (req, res) => {
  if (Helper.isEmpty([req.body.name])) {
    res.status(Helper.HTTP.BAD_REQUEST).send('name is required')
  }
  try {
    const level = await saveLevel({
      name: Helper.sqlescstr(req.body.name),
    })
    if (level) {
      const data = await findLevelById(level.id)
      const dataJSON = data.toJSON()
      res.status(Helper.HTTP.CREATED).json({
        message: 'Level created',
        data: data,
        levelId: level.id,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}

exports.updateLevel = async (req, res) => {
  try {
    const lid = parseInt(req.params.lid)
    const level = await updateLevelQuery(lid, req.body)
    res.status(Helper.HTTP.OK).json({ message: 'Level updated', data: level })
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}

exports.deleteLevel = async (req, res) => {
  try {
    const lid = parseInt(req.params.lid)
    const level = await removeLevel(lid)
    res.status(Helper.HTTP.OK).json({ message: 'Level deleted', data: level })
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}

exports.isLevelExist = async (req, res, next) => {
  try {
    const lid = req.params.lid || req.body.lid || req.query.lid
    if (Helper.isEmpty([lid])) {
      res.status(Helper.HTTP.BAD_REQUEST).send('lid is required')
    }
    const level = await findLevelById(lid)
    if (level) {
      return next()
    } else {
      res.status(Helper.HTTP.NOT_FOUND).json({ message: 'Level not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(Helper.HTTP.BAD_REQUEST).json({ message: error.message })
  }
}
