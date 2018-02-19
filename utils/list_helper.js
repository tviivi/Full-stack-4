const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    var summa = 0;
    blogs.forEach(blogi => {
        summa = summa + blogi.likes
    })
    return summa;
}

const favoriteBlog = (blogs) => {
    var mostLikes = {
        author: '',
        title: '',
        likes: ''
    }
    blogs.forEach(blogi => {
        if (mostLikes.likes < blogi.likes) {
            mostLikes.author = blogi.author
            mostLikes.title = blogi.title
            mostLikes.likes = blogi.likes
        }
    })
    return mostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}