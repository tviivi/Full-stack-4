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
    var mostLikes = 0;
    blogs.forEach(blogi => {
        if (mostLikes < blogi.likes) {
            mostLikes = blogi.likes
        }
    })
    return mostLikes;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}