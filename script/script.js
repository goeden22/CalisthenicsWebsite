const gallery = document.getElementById('galleryContainer');
const gallerytiles = document.querySelectorAll('.gallery__tile')

function Gallery(id,arrows,counter) {
    this.container = document.getElementById(id);
    this.arrows = document.getElementById(arrows);
    this.counter = document.getElementById(counter);
    this.currentImg = 0
    this.dots = function(){
        return this.counter.querySelectorAll('.gallery__dot')
    }
    this.tiles = function () {
        return this.container.querySelectorAll('.gallery__tile')
    }
    this.singleWidth = function(){
        return $(gal.tiles()[0]).outerWidth(true);
    }
    this.slide = function(e){
        if(!e.target.name){
            return undefined
        }
        multiplier = e.target.name == "left" ? -1 : 1
        this.currentImg += multiplier
        console.log(this.currentImg)
        if(this.currentImg < 0){
            this.currentImg = 0;
            return undefined
        } else if (this.currentImg > (this.tiles().length - 3)){
            this.currentImg = this.tiles().length - 3
            return undefined
        }
        this.container.style.transform = `translateX(${-(this.currentImg * this.singleWidth())}px)`
        this.dots()[this.currentImg - multiplier].classList.remove('dot--active')
        this.dots()[this.currentImg].classList.add('dot--active')
    },
    this.arrows.onclick = this.slide.bind(this)
}

let gal = new Gallery('galleryContainer', 'galleryArrows','galleryCounter')



