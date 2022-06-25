const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { saveImage } = require('../queries/upload.queries')

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.env.PWD}/api/resources/static/assets/uploads`)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`)
  },
})

exports.upload = multer({ storage: storage, fileFilter: imageFilter })

function saveFile(image) {
  fs.writeFileSync(
    `${process.env.PWD}/api/resources/static/assets/uploads` + image.name,
    image.data,
  )
}

exports.uploadFile = async (req, res, next) => {
  try {
    if (req.file == undefined || req.body.file == undefined) {
      return res.json(`You must select a file.`)
    }
    const data = {
      type: req.file.mimetype || req.body.file.mimetype,
      name: req.file.originalname || req.body.file.originalname,
      data: fs.readFileSync(
        `${process.env.PWD}/api/resources/static/assets/uploads` +
          req.file.filename || req.body.file.filename,
      ),
      teamId: req.body.teamId,
    }
    const image = await saveImage(data)
    const file = saveFile(image)
    if (file) {
      next()
    }
  } catch (err) {
    res.json('interval error')
  }
}
