const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "moi",
        author: "Viivi",
        url: "www.testi.fi",
        likes: 900
    },
    {
        title: "helou",
        author: "Bloggaaja",
        url: "www.moikkeliskoikkelis.fi",
        likes: 0
    }
  ]

  beforeAll(async () => {
    await Blog.remove({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

//describe.skip('apitest', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
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
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body.length).toBe(initialBlogs.length+1)
        expect(titles).toContain('helou')
    })
//})

test('blog without likes is also added ', async () => {
    const newBlog = {
        title: "testi",
        author: "testi",
        url: "testi"
    }

    const intialBlogs = await api
        .get('/api/blogs')

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const response = await api
        .get('/api/blogs')

    const contents = response.body.map(r => r.content)
    expect(response.body.length).toBe(intialBlogs.body.length+1)
})