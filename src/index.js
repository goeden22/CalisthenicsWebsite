

import './styles/style.scss'
import video from './img/video.mp4'


function Gallery(id,arrows,counter) {
    this.container = document.getElementById(id);
    this.arrows = document.getElementById(arrows);
    this.counter = document.getElementById(counter);
    this.currentImg = 0;
    this.mode;
    this.dots = ""
    
    this.dotsActive = function(dot, remove){
        let dots = this.counter.querySelectorAll('.gallery__dot')  
            dots[remove || 0].classList.remove('dot--active') 
        dots[dot].classList.add('dot--active')
    }
    this.tiles = function () {
        return this.container.querySelectorAll('.gallery__tile')
    }
    this.setDots = function(){
        this.dots = ""
     for (let i = 0; i < this.tiles().length - this.mode; i++){
         this.dots += '<div class="gallery__dot"></div>'
     }   
    }
    this.attachDots = function(){
        this.setDots();
        this.counter.innerHTML = this.dots
        this.dotsActive(this.currentImg);
    }
    this.setMode = function() {
        let large = window.matchMedia('(min-width: 1306px)')
        let medium = window.matchMedia('(max-width: 1306px) and (min-width: 885px)')
        let small = window.matchMedia('(max-width: 884px)')

        if(large.matches && this.mode != 2){
            this.mode = 2;
            this.attachDots()
        } else if (medium.matches && this.mode != 1){
            this.mode = 1;
            this.attachDots()
        }
        else if (small.matches && this.mode != 0){
            this.mode = 0;
            this.attachDots()
        }
    }
    this.singleWidth = function(){
        return $(gal.tiles()[0]).outerWidth(true);
    }
    this.slide = function(e){
        if(!e.target.name){
            return undefined
        }
        let multiplier = e.target.name == "left" ? -1 : 1
        this.currentImg += multiplier
        console.log(this.currentImg)
        if(this.currentImg < 0){
            this.currentImg = 0;
            return undefined
        } else if (this.currentImg > (this.tiles().length - this.mode - 1)){
            this.currentImg = this.tiles().length - this.mode - 1
            return undefined
        }
        this.container.style.transform = `translateX(${-(this.currentImg * this.singleWidth())}px)`
        this.dotsActive(this.currentImg, (this.currentImg - multiplier))
    },
    this.arrows.onclick = this.slide.bind(this)
    document.body.onresize = this.setMode.bind(this)
    this.setMode();
    this.dotsActive(this.currentImg);
    //wywołujemy metode przy tworzeniu każdej nowej galerii
}

function MobileMenu(id, mobile){
    this.menu = document.getElementById(id)
    this.button = this.menu.querySelector('.menu__mobileIcon')
    this.list = this.menu.querySelector('.menu__mobileList')
    this.toggle = function(){
        this.list.classList.toggle('menu__mobileList--active')
        this.menu.classList.toggle('menu__mobile--active');
        
    
    }
    this.button.onclick = this.toggle.bind(this)
}

function Navigation(id){
    this.nav = document.getElementById(id)
    this.options = this.nav.querySelectorAll('li')
    this.scroll = function(e){
        let name = e.target.getAttribute('name')
        if(!name){
            return undefined
        }
        let scrollTarget = document.getElementById(name)
 
        $("html, body").animate({ scrollTop: scrollTarget.offsetTop }, 600)
    }
    this.nav.onclick = this.scroll.bind(this)
}

function HeroButton(id){
    this.button = document.getElementById(id)
    this.button.onclick = function(){
        let about = document.getElementById('about')
        $("html, body").animate({ scrollTop: about.offsetTop }, 600)
    }
    this.trigger = () => {
        document.addEventListener('load', () => {
            alert('bla')
            this.transparent();
        })
    this.trigger();
    }
}
function Loader(id){
    this.loader = document.getElementById(id);
    this.transparent = () => { this.loader.classList.add('loader--transparent')}
    this.invisible = () => {this.loader.classList.add('loader--invisible')}
    this.trigger = () => {
        window.addEventListener('load', () => {

            this.transparent();
            setTimeout(() => {
                this.invisible();
            },4000)
        })
    }
    this.trigger();

}

let gal = new Gallery('galleryContainer', 'galleryArrows','galleryCounter');
let mobileMenu = new MobileMenu('mobileMenu');
let mobileNav = new Navigation('mobileNav')
let desktopNav = new Navigation('nav', false)
let heroButton = new HeroButton('button')
let loader = new Loader('loader')