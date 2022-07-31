const apiLink = 'https://gist.githubusercontent.com/miserlou/c5cd8364bf9b2420bb29/raw'
const input = document.querySelector('.search')
const container = document.querySelector('.sug')

const arr = []


fetch(apiLink)
    .then(data => data.json())
    .then(data => arr.push(...data))


function match(word, city) {
    const regex = new RegExp(word, 'gi')
    return arr.filter(place => {
        return place.city.match(regex) || place.state.match(regex)
    })
}

function display() {
    const newArr = match(this.value, arr)
    const html = newArr.map(place => {
        const cityName = `<span class="hl">${place.city}</span>`
        const stateName = `<span class="hl">${place.state}</span>`
        const regex = /\B(?=(\d{3})+(?!\d))/g
        const no = place.population.toString().replace(regex, ',')
        return `
            <li>
                <span class="city">${cityName}, ${stateName}</span>
                <span class="people">${no}</span>
            </li>
        `
    }).join('')
    container.innerHTML = html
}

input.addEventListener('keyup', display)
input.addEventListener('change', display)
input.addEventListener('keyup', () => {
    if(input.value === '') {
        container.innerHTML = ''
    }
})