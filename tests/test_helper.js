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

const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}

module.exports = {
  initialBlogs, formatBlog, nonExistingId, blogsInDb
}