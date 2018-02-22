const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { formatBlog, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedContents = response.body.map(b => b.content)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.content)
        })
    })

    test('there is a right amount of blogs', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('the first blog´s title is "moi"', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body[0].title).toBe('moi')
    })
})

describe('addition of a new blog', async () => {
    test('a valid blog can be added', async () => {
        const blogsAtStart = await blogsInDb()

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

        const blogsAfterOperation = await blogsInDb()

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

        const titles = blogsAfterOperation.map(r => r.title)
        expect(titles).toContain('helou')
    })

    test('blog without likes is also added ', async () => {
        const newBlog = {
            title: "testi",
            author: "testi",
            url: "testi"
        }

        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogsAfterOperation = await blogsInDb()
        const contents = blogsAfterOperation.map(r => r.content)

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
    })

    test('note without title or url is not added', async () => {
        const newBlog = {
            author: "testi",
            likes: 56
        }

        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAfterOperation = await blogsInDb()
        const titles = blogsAfterOperation.map(r => r.title)

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

afterAll(() => {
    server.close()
})