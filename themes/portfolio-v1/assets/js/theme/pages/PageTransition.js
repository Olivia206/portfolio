import barba from '@barba/core';
import gsap from 'gsap'

class PageTransition {
    constructor() {
        
    this.init();
        console.log("lalala");
    }
    init() {
        barba.init({
            preventRunning: true
        });
        this.listen();
    }
    listen() {

    }
}

export default new PageTransition()