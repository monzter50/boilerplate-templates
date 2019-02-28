import {getNumbers,sendEmail} from './modules';
import Swiper from 'swiper/dist/js/swiper.js';
var swiperFadeIn = new Swiper('.swiperFadeIn-container', {
     effect: 'fade',
     autoplay: {
         delay: 3000
     },

 })
 getNumbers();

 document.querySelector('form').addEventListener('submit',sendEmail)