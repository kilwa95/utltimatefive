const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    })

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject()
        }
        resolve(token)
      })
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    return transporter
  } catch (error) {
    console.log(error)
  }
}

const sendMail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransporter()
    await emailTransporter.sendMail(emailOptions)
  } catch (error) {
    console.log(error)
  }
}

// const sendMail = async (emailOptions) => {
//   try {
//     let emailTransporter = nodemailer.createTransport({
//       host: 'smtp.mailtrap.io',
//       port: 2525,
//       auth: {
//         user: 'f24cf9d8d925ce',
//         pass: '0f57cca7523d61',
//       },
//     })

//     await emailTransporter.sendMail(emailOptions)
//   } catch (error) {
//     console.log(error)
//   }
// }
module.exports = {
  sendMail,
}
