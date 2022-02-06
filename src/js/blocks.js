// блоки меню

class BlockMenu {
    constructor(parent, image, alt, title, description, price, id, ...classes) {
        this.parent = document.querySelector(parent);
        this.image = image;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.transfer = 70;
        this.id = id;
        this.classes = classes;
        this.toUAH();

    }

    toUAH() {
        this.price = +this.price * this.transfer;
    }

    render() {
        const card = document.createElement('div');

        if (this.classes.length == 0) {
            card.classList.add('menu__item');
        } else {
            this.classes.forEach( classElement => card.classList.add(classElement));
        }
        card.innerHTML = `
            <img src="${this.image}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

        this.parent.append(card);
    }
}

// const getBlocks = async (url) => {
//     const result = await fetch(url);

//     if (!result.ok) {
//         throw new Error("Ошибка!")
//     }
    
//     return await result.json();
// }
// getBlocks('http://localhost:3000/menu')
// .then(data => {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         new BlockMenu('.menu__field .container', img, altimg, title, descr, price).render();
//     })
// })

//     axios.get('https://maxim-prog292.github.io/Udemy_food/menu') 
//     .then(response => {
//         response.data.forEach(({img, altimg, title, descr, price}) => {
//             new BlockMenu('.menu__field .container', img, altimg, title, descr, price).render();
//         })
//     })

new BlockMenu('.menu__field .container', "img/tabs/vegy.jpg", "vegy", "Меню 'Фитнес'", "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 9).render();
new BlockMenu('.menu__field .container', "img/tabs/post.jpg", "post", "Меню 'Постное'", "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 12).render();
new BlockMenu('.menu__field .container', "img/tabs/elite.jpg", "elite", "Меню 'Премиум'", "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 16).render();

