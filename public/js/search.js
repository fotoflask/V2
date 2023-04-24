const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

search.addEventListener('mouseover', () => {
    search.classList.toggle('active')
    input.focus()
})

search.addEventListener('mouseout', () => {
    search.classList.toggle('active')
    input.focus()
})