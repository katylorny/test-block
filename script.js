// получение пунктов списка
let posts = []
fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then(response => {
        return response.json()
    })
    .then(response => {
        posts = response.slice(0, 5)
        let postsTemplate = ``
        posts.map((it) => {
            postsTemplate += `<li class="list__item">${it.title}</li>`
        })

        list.innerHTML = `
            ${postsTemplate}
        `
        const listItems = document.querySelectorAll(`.list__item`)
        Array.from(listItems).map((listItem, i) => {
            listItem.addEventListener(`click`, () => {
                alert(posts[i].body)
                list.classList.add(`hidden`)
            })
        })

    })

// создание элемента списка
const content = document.querySelector(`.content`)
const list = document.createElement(`ul`)
list.classList.add(`list`, `hidden`)

// скрытие-показ списка по клику на блок
const block = document.querySelector(`.block`)
block.addEventListener(`click`, () => {
    list.classList.contains(`hidden`) ? list.classList.remove(`hidden`) : list.classList.add(`hidden`)
})

// расположение списка
let blockPosition = block.getBoundingClientRect()
let blockWidth = block.clientWidth
content.insertBefore(list, block)
list.style.left = blockPosition.left + blockWidth + `px`
list.style.top = `300px`


// отслеживание изменения местоположения розового блока
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        list.style.top = mutation.target.style.top
        list.style.left = mutation.target.style.left
        list.style.transform = `translateX(${mutation.target.style.width})`
    });
});
mutationObserver.observe(block, {
    attributes: true,
    attributeFilter: [`style`],
    attributeOldValue: false,
    characterDataOldValue: false
});
