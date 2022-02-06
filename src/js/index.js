'use strict';

import tab from './tab';
import modalWindow from './modalWindow';
import data from './data'
import calc from './calc';
import sliders from './sliders'
import blocks from './blocks'
import timer from './timer'

window.addEventListener('DOMContentLoaded', () => {
    sliders();
    blocks();
    timer(); 
    tab();
    modalWindow();
    data();
    calc();
    
});
