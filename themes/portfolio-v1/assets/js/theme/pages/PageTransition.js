import barba from '@barba/core';
import gsap from 'gsap'
import pointer from '../../components/Pointer';
import isMobile from '../../helpers/isMobile';

class PageTransition {
    constructor() {
    const animation = {
        name: 'post-to-home-transition',
        from: {
            custom: ({ trigger }) => {
                return trigger.classList && (trigger.classList.contains('btn-home') ||  trigger.classList.contains('link-back'));
            }
        },
        enter(data) {
            const x = isMobile ? window.innerWidth / 2 : pointer.position.x,
                y = isMobile ? window.innerHeight / 2 : pointer.position.y;
            data.current.container.style.zIndex = 6;
            data.next.container.style.zIndex = 7;

            return gsap.fromTo(data.next.container,{
                clipPath: `circle(0% at ${x}px ${y}px)`
            },{
                clipPath: `circle(150% at ${x}px ${y}px)`,
                duration: 1.2,
                ease: 'quad.inOut',
                clearProps: 'clipPath'
            })
        }
    }
    this.init();
    }
    init() {
        barba.init({
            preventRunning: true,
            transitions: [
                animation
            ]
        });
        this.listen();
    }
    listen() {
        barba.hooks.beforeEnter(this.onBeforeEnter.bind(this));
    }
    onBeforeEnter(data) {
        if (data.next.html) {
            this.setBodyClass(data.next.html);
        }
    }
    setBodyClass(nextHtml) {
        let parser = new DOMParser(),
        htmlDoc = parser.parseFromString(nextHtml.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', nextHtml), 'text/html'),
        bodyClasses = htmlDoc.querySelector('notbody').getAttribute('class');
        document.getElementsByTagName("body")[0].setAttribute('class', bodyClasses);
    }
}

export default new PageTransition()