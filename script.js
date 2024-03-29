const BLOCK_TOP = 300
const LIST_WIDTH = 250
const content = document.querySelector(`.content`)
const list = document.createElement(`ul`)
const block = document.querySelector(`.block`)
const blockPosition = block.getBoundingClientRect()
const blockWidth = block.clientWidth
const distanceToRight = content.offsetWidth - block.getBoundingClientRect().left - block.clientWidth
content.insertBefore(list, block)


list.classList.add(`list`, `hidden`)

// получение пунктов списка
let posts = []
fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then(response => response.json())
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

// скрытие-показ списка по клику на блок
block.addEventListener(`click`, () => {
    list.classList.contains(`hidden`) ? list.classList.remove(`hidden`) : list.classList.add(`hidden`)
})

// чтобы список не вылезал за пределы экрана справа (первоначально)
list.style.width = `${distanceToRight > LIST_WIDTH ? LIST_WIDTH : distanceToRight}px`

// первоначальное местоположение списка
list.style.left = blockPosition.left + blockWidth + `px`
list.style.top = BLOCK_TOP + `px`

// отслеживание изменения местоположения розового блока, вычисление местоположения и ширины списка
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // чтобы список не вылезал за пределы экрана справа
        const distanceToRight = content.offsetWidth - content.offsetWidth * parseInt(mutation.target.style.left) / 100 - parseInt(mutation.target.style.width)
        list.style.width = `${distanceToRight > LIST_WIDTH ? LIST_WIDTH : distanceToRight}px`

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
