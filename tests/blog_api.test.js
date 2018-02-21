const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(3)
  })
  
  test('the first blog´s title is "moi"', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body[0].title).toBe('moi')
  })

afterAll(() => {
  server.close()
})