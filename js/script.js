'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Табы

    const parentTabs = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent');
        
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => item.classList.remove('tabheader__item_active'));
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    parentTabs.addEventListener('click', e => {
        const t = e.target;

        if (t && t.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (t == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Таймер

    const deadline = '2022-02-31';

    function getDate(dline){
        const t = Date.parse(dline) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getTimer(selector, dline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              interval = setInterval(setTimer, 1000);

        setTimer();
        function setTimer(){
            const t = getDate(dline);

            days.textContent = setZero(t.days);
            hours.textContent = setZero(t.hours);
            minutes.textContent = setZero(t.minutes);
            seconds.textContent = setZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(interval);
            }
        }
    }
    getTimer('.timer', deadline);

    // модалка
    const openModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          body = document.querySelector('body');

    const openModalTimer = setTimeout(openModalFunc, 60000);

    openModal.forEach( item => {
        item.addEventListener('click', openModalFunc);
    });
    
    modal.addEventListener('click', (e) => {
        const t = e.target;

        if (t && t.matches('[data-close]') || t.matches('.modal') || t.code === 'Escape') {
            closeModalFunc();
        }
    });

    document.addEventListener('scroll', srollOpenModal);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });

    function openModalFunc() {
        modal.classList.toggle('show');
        document.body.classList.add('modal-open');
        clearInterval(openModalTimer);
    }

    function closeModalFunc() {
        modal.classList.toggle('show');
        document.body.classList.remove('modal-open');
    }

    function srollOpenModal() {
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop == 
            document.documentElement.clientHeight) {
            openModalFunc();
            document.removeEventListener('scroll', srollOpenModal);
            clearInterval(openModalTimer);
        }
    }
      
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

    axios.get('https://maxim-prog292.github.io/Udemy_food/menu') 
    .then(response => {
        response.data.forEach(({img, altimg, title, descr, price}) => {
            new BlockMenu('.menu__field .container', img, altimg, title, descr, price).render();
        })
    })


    // отправка данных на сервер
    
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        initPostData(item);
    });

    const objectStatus = {
        'success': 'Форма отправлена, мыскоро с вами свяжемся!',
        'failure': 'Ошибка отправки',
        'spinner': 'icons/spinner.svg'
    };  

    // const postData = async (url, data) => {
    //     const result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json',
    //             },
    //         body: data
    //         })
        
    //     return await result.json();
    // }



    function initPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spinner = document.createElement('img'); 
            spinner.setAttribute('src', objectStatus.spinner);
            spinner.classList.add('spinner');
            
            form.append(spinner);

            const formData = new FormData(form);

            const json = Object.fromEntries(formData.entries());

            // postData('http://localhost:3000/requests', json)

            axios.post('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanks(objectStatus.success);
                // spinner.remove();
            })
            .catch(() => {
                showThanks(objectStatus.failure);
            })
            .finally(() => {
                form.reset();
                spinner.remove();
            })
        });
    }

    function showThanks(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');


        const modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');

        modalThanks.innerHTML = `
            <div class='modal__content'>
                <div data-close="" class="modal__close">×</div>
                <div class='modal__title' >${message}</div>

            <div/>
        `;

        document.querySelector('.modal').append(modalThanks);

        setTimeout(() => {
            modalDialog.classList.remove('hide');
            modalThanks.remove();
            closeModalFunc();
        }, 5000);

    }
    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    totalSlide(slideIndex, current);
    totalSlide(slides.length, total);

    function totalSlide(value, output) {
        if (value < 10) {
            output.textContent = `0${value}`;
        } else {
            output.textContent = value;
        }
    }

    function toNumber(string) {
        return +string.match(/\d/g).join('');
    }

    function modElements() {
        slidesInner.style.width = 100 * slides.length + '%';
        slidesInner.style.display = 'flex';
        slidesInner.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => slide.style.width = width);

        
        slider.style.position = 'relative';
    }
    modElements();

    // slider dots
    const dots = document.createElement('ol');
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    const dotsArray = [];

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        
        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.append(dot);
        dotsArray.push(dot);
    }


    next.addEventListener('click', () => {
        if (offset == toNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += toNumber(width)
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        totalSlide(slideIndex, current);

        slideTransform(offset);

        currentDot();
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = toNumber(width) * (slides.length - 1);
        } else {
            offset -= toNumber(width)
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        totalSlide(slideIndex, current);

        slideTransform(offset);

        currentDot();
    });
    
    function currentDot() {
        dotsArray.forEach(dot => {
            dot.style.opacity = '.5';
        })
        dotsArray[slideIndex - 1].style.opacity = 1;
    }

    function slideTransform(offset) {
        slidesInner.style.transform = `translateX(-${offset}px)`;
    }

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            
            slideIndex = slideTo;

            offset = toNumber(width) * (slideTo - 1);
            slideTransform(offset);

            totalSlide(slideIndex, current);
            currentDot();
        })
    }) 

    // Calculator
    const totalCAL = document.querySelector('.calculating__result');

    let gender, height, weight, age, active, result;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
    }

    if (localStorage.getItem('active')) {
        active = localStorage.getItem('active');
    } else {
        active = 1.2;
    }

    function initLocalStorageData(selector) {
        const elements = document.querySelectorAll(selector); 
        elements.forEach( elem => {
            elem.classList.remove('calculating__choose-item_active');

            if (elem.id == localStorage.getItem('gender')) {
                elem.classList.add('calculating__choose-item_active');
            }

            if (elem.getAttribute('data-active') == localStorage.getItem('active')) {
                elem.classList.add('calculating__choose-item_active');
            }

        });
    }
    initLocalStorageData('#gender div');
    initLocalStorageData('.calculating__choose_big div');

    function checkFemaleOrMale(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {

            elem.addEventListener('click', (e) => {

                if (e.target.parentElement.classList.contains('gender')) {

                    if (e.target.getAttribute('id') == 'female') {
                        gender = 'female';
                    } else {
                        gender = 'male';
                    }
                    localStorage.setItem('gender', gender);
                } 

                if (e.target.parentElement.classList.contains('calculating__choose_big')) {

                    switch (e.target.getAttribute('id')) {
                        case 'low':
                            active = 1.2;
                            break;
                        case 'small':
                            active = 1.375;
                            break;
                        case 'medium':
                            active = 1.55;
                            break;
                        case 'high':
                            active = 1.725;
                            break;
                    }
                    localStorage.setItem('active', active);
                } 

                elements.forEach(elem => {
                    elem.classList.remove('calculating__choose-item_active')
                });

                e.target.classList.add('calculating__choose-item_active');
                totalResult();
            })
            
        });
    }
    checkFemaleOrMale('#gender div');
    checkFemaleOrMale('.calculating__choose_big div');

    function checkParametrs() {
        const inputParametrs = document.querySelectorAll('.calculating__choose_medium input');

        inputParametrs.forEach( input => {
            input.addEventListener('input', (e) => {

                if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }

                switch (e.target.getAttribute('id')) {
                    case 'height':
                        height = +e.target.value;
                        break;
                    case 'weight':
                        weight = +e.target.value;
                        break;
                    case 'age':
                        age = +e.target.value;
                        break;
                }
                totalResult();
            });
        });
    }
    checkParametrs();

    function totalResult() {

        if (gender == 'female') {
            result = Math.round(((9.247 * weight) + (3.098 * height) - (4.33 * age) + 447.593) * active);
        } else {
            result = Math.round(((13.397 * weight) + (4.799 * height) - (5.667 * age) + 88.362) * active);
        }
        if (!gender || !height || !weight || !age || !active) {
            totalCAL.innerHTML = `<span> ---- </span> ккал`;
        } else {
            totalCAL.innerHTML = `<span> ${result} </span> ккал`;
        }
        console.log(gender, height, weight, age, active)
    }
});
