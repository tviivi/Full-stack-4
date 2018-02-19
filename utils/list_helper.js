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

module.exports = {
    dummy,
    totalLikes
}