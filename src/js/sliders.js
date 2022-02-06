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

