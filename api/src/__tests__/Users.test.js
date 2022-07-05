const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')

let connection
beforeAll(() => {
  connection = new Sequelize(process.env.DATABASE_URL, {})
  connection.authenticate().then((_) => console.log('pg connected'))
})

afterAll(async () => {
  await connection.close()
})

describe('GET /user', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
