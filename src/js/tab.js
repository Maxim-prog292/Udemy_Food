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




