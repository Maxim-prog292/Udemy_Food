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

