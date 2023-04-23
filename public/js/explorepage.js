const container = document.querySelector('.container')
const unsplashURL = 'images/postimages'
const rows = 5

for(let i = 0; i < rows * 4; i++) {
    const img = document.createElement('img')
    img.src = `${unsplashURL}${getRandomSize()}`
    console.log(img.src)
    container.appendChild(img)
}

function getRandomSize() {
    return `${getRandomNr()}x${getRandomNr()}`
}

function getRandomNr() {
    return Math.floor(Math.random() * 10) + 300
}