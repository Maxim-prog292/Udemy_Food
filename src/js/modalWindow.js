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


