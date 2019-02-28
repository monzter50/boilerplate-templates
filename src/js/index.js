import {saludo} from './modules';
import Swiper from 'swiper/dist/js/swiper.js';
var swiper =new Swiper('.swiper-container', {
    //  direction: 'vertical',
     autoplay: {
         delay: 3000
     },
    //  pagination: {
    //      el: '.swiper-pagination'
    //  }
 })
 saludo();