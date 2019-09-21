export class Ribbon {
    private _element: HTMLElement;
    private _container: HTMLElement;
    private _touchstartx = undefined;
    private _touchmovex = undefined;
    private _movex = undefined;
    private _translatex = 0;

    constructor(element: HTMLElement) {
        this._element = element;
        this._container = element.querySelector('.ribbon__container');

        const items = Array.from(element.querySelectorAll('.ribbon__item'));

        items.forEach((e: HTMLElement) => e.onclick = this.handleClick.bind(this));

        items[0].classList.add('ribbon--active');

        this._bindTouchEvents();
    }

    static mount() {
        var ribbons = document.querySelectorAll('.ribbon');

        for (var i = 0; i < ribbons.length; i++) {
            new Ribbon(ribbons[i] as HTMLElement);
        }
    }

    _bindTouchEvents() {
        if (navigator.msMaxTouchPoints) {
            this._element.classList.add('ms-touch');
        } else {
            this._container.addEventListener("touchstart", (event) => this.start(event));

            this._container.addEventListener("touchmove", (event) => this.move(event));

            this._container.addEventListener("touchend", (event) => this.end(event));
        }
    }

    handleClick(e: UIEvent) {
        
        Array.from(this._element.querySelectorAll('.ribbon__item'), (e: HTMLElement) => e.classList.remove('ribbon--active'));

        (<HTMLElement>e.target).classList.add('ribbon--active');
    }

    start(event: TouchEvent) {
        this._touchstartx = event.touches[0].pageX;
        this._element.classList.remove('ribbon--animate');
    }

    move(event: TouchEvent) {
        this._touchmovex = event.touches[0].pageX;
        this._movex = this._touchstartx - this._touchmovex;
        this._container.style.transform = `translate3d(${(this._translatex + this._movex) * -1}px,0,0)`;
    }

    end(event: TouchEvent) {
        if(this._movex > 0)
            this._translatex += this._movex + 100;

        if (this._movex < 0)
            this._translatex += this._movex - 100;

        this._container.classList.add('ribbon--animate');

        this._container.style.transform = `translate3d(${(this._translatex) * -1}px,0,0)`;
    }
}