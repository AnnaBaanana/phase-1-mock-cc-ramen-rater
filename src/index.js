const ramenURL = 'http://localhost:3000/ramens'

function createRamen(ramen) {
    const img = document.createElement('img')
    img.src = ramen.image
    img.addEventListener('click', () => {
        const deets = document.querySelector('#ramen-detail')
        console.log(deets)
        const imgDeets = document.querySelector("img.detail-image")
        console.log(imgDeets)
        imgDeets.src = ramen.image
        const nameDeets = document.querySelector("h2.name")
        nameDeets.textContent = ramen.name
        const restDeets = document.querySelector("h3.restaurant")
        restDeets.textContent = ramen.restaurant
        const rate = document.querySelector('#rating-display')
        console.log(rate)
        const input = document.createElement('input')
        input.class = "rating"
        rate.append(input)
        input.addEventListener('change', (e) => {
            console.log(e)
            fetch(`${ramenURL}/${ramen.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    rating: e.target.value
                })
            }).then(res => res.json()).then(data => console.log(data))})
    })
    return img
}

function renderData() {
    fetch(ramenURL).then(res=>res.json().then(data => {
        console.log(data)
        const menu = document.querySelector('#ramen-menu')
        console.log(menu)
        data.forEach((ramen) => {
            menu.append(createRamen(ramen))
        })
    }))
}

function addNewRamen() {
    const addNew = document.querySelector('#new-ramen')
    console.log(addNew)
    addNew.addEventListener('submit', (e)=> {
        e.preventDefault()
        console.log(e)
        const newRamen = {
        name: e.target[0].value,
        restaurant: e.target[1].value,
        image: e.target[2].value,
        rating: e.target[3].value,
        comment: e.target[4].value}
        fetch(`${ramenURL}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newRamen)
        }).then(res => res.json()).then(data => console.log(data))
    })
}

function domLoaded() {
    document.addEventListener('DOMContentLoaded', ()=> {
        console.log("DOM Loaded")
        renderData()
        addNewRamen()
    })
}

domLoaded()