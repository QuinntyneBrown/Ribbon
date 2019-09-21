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
        this._bindUIEvents();
    }

    static mount() {
        var ribbons = document.querySelectorAll('.ribbon');

        if (navigator.msMaxTouchPoints) {
            for (var i = 0; i < ribbons.length; i++) {
                (ribbons[i] as HTMLElement).classList.add('ms-touch');
            }
        }
        else {
            for (var i = 0; i < ribbons.length; i++) {
                new Ribbon(ribbons[i] as HTMLElement);
            }
        }
    }

    _bindUIEvents() {
        this._container.addEventListener("touchstart", (event) => this.start(event));

        this._container.addEventListener("touchmove", (event) => this.move(event));

        this._container.addEventListener("touchend", (event) => this.end(event));
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