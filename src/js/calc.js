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
}
