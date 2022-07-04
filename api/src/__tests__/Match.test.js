const supertest = require('supertest')
const app = require('../app')
const db = require('../config/sequelize')
const request = supertest(app)
const Match = require('../models/sequelize/Match')

let organizerId
let adminId
let levelId
let tokenOrganizer
let tokenAdmin
let matchId

beforeAll(async () => {
  const organizerResponse = await request
    .post('/organizers')
    .set('Content-Type', 'application/json')
    .send({
      firstName: 'organizer',
      lastName: 'organizer',
      email: 'organizer@gmail.com',
      password: 'organizer123',
      levelId: levelId,
      roles: ['organizer'],
    })
  const adminResponse = await request
    .post('/admins')
    .set('Content-Type', 'application/json')
    .send({
      firstName: 'adminA',
      lastName: 'adminA',
      email: 'adminA@gmail.com',
      password: 'admin123',
      levelId: levelId,
      roles: ['admin'],
    })

  organizerId = organizerResponse.body.data.id
  adminId = adminResponse.body.data.id

  tokenOrganizer = await request
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'organizer@gmail.com',
      password: 'organizer123',
    })

  tokenAdmin = await request
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'adminA@gmail.com',
      password: 'admin123',
    })

  const levelResponse = await request
    .post('/levels')
    .set('Authorization', `${tokenAdmin.res.rawHeaders[5]}`)
    .send({
      name: 'testeC',
    })
  levelId = levelResponse.body.data.id
})

afterAll(async () => {
  await request
    .delete(`/matchs/${matchId}`)
    .set('Authorization', `${tokenOrganizer.res.rawHeaders[5]}`)

  await request
    .delete(`/levels/${levelId}`)
    .set('Authorization', `${tokenAdmin.res.rawHeaders[5]}`)
  await request
    .delete(`/users/${organizerId}`)
    .set('Authorization', `${tokenOrganizer.res.rawHeaders[5]}`)

  await request
    .delete(`/users/${adminId}`)
    .set('Authorization', `${tokenAdmin.res.rawHeaders[5]}`)
})

describe('Matches routes', () => {
  it('should create a match', async () => {
    const response = await request
      .post('/matchs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `${tokenOrganizer.res.rawHeaders[5]}`)
      .send({
        salle: 'salle 1',
        address: 'address 1',
        ville: 'ville 1',
        price: 100,
        square: 100,
        slots: 'slots 1',
        levelId: levelId,
        organizerId: organizerId,
        teams: [1, 2],
      })
    const data = response.body.data
    matchId = data.id
    expect(response.status).toBe(201)
  }),
    it('should return a list of matches', async () => {
      const matches = await Match.findAll()
      const response = await request.get('/matchs').send()
      expect(response.status).toBe(200)
      const data = response.body.data
      expect(data).toHaveLength(matches.length)
    }),
    it('should return a match', async () => {
      const match = await Match.findOne()
      const response = await request.get(`/matchs/${match.id}`).send()
      expect(response.status).toBe(200)
      const data = response.body.data
      expect(data.id).toBe(match.id)
    })
  it('should update a match', async () => {
    const response = await request
      .put(`/matchs/${matchId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `${tokenOrganizer.res.rawHeaders[5]}`)
      .send({
        salle: 'salle 2',
        address: 'address 2',
        ville: 'ville 2',
        price: 200,
        square: 200,
        slots: 'slots 2',
        levelId: levelId,
        organizerId: organizerId,
        teams: [3, 4],
      })
    expect(response.status).toBe(200)
  })
})
