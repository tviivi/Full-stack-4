const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body.length).toBe(2)
})

test('the first blog´s title is "moi"', async () => {
    const response = await api
        .get('/api/blogs')

    expect(response.body[0].title).toBe('moi')
})

afterAll(() => {
    server.close()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'helou',
        author: 'Bloggaaja',
        url: 'www.moikkeliskoikkelis.fi',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(3)
    expect(titles).toContain('helou')
})