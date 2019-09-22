export enum RibbonScrollState {
    enabled,
    disabled
}

export class Ribbon {
    private _element: HTMLElement;
    private _container: HTMLElement;
    private _nextButton: HTMLElement;
    private _previousButton: HTMLElement;

    private _touchstartx = undefined;
    private _touchmovex = undefined;
    private _movex = undefined;
    private _translatex = 0;
    private _width: number = 1178;

    private get _scrollState(): RibbonScrollState {
        if (window.innerWidth < this._width)
            return RibbonScrollState.enabled;

        return RibbonScrollState.disabled;
    }

    constructor(element: HTMLElement) {
        this._element = element;
        this._container = element.querySelector('.ribbon__container');
        this._nextButton = this._element.querySelector('.ribbon--next');
        this._previousButton = this._element.querySelector('.ribbon--previous');
        
        const items = element.querySelectorAll('.ribbon__item');

        for (var i = 0; i < items.length; i++) {
            (<HTMLElement>items[i]).onclick = this.handleClick.bind(this)
        }
        
        items[0].classList.add('ribbon--active');

        this.handleResize();

        this._bindTouchEvents();

        window.addEventListener('resize', this.handleResize.bind(this));

        this._nextButton.onclick = this.handleNextClick.bind(this);
        this._previousButton.onclick = this.handlePreviousClick.bind(this);

        this._container.style.transform = `translate3d(${(this._translatex) * -1}px,0,0)`;
    }

    static mount() {
        var ribbons = document.querySelectorAll('.ribbon');

        for (var i = 0; i < ribbons.length; i++) {
            new Ribbon(ribbons[i] as HTMLElement);
        }
    }

    get maxTranslatex():number {
        return this._width - this._element.offsetWidth;
    }

    _bindTouchEvents() {
        this._container.addEventListener("touchstart", this.start.bind(this));

        this._container.addEventListener("touchmove", this.move.bind(this));

        this._container.addEventListener("touchend", this.end.bind(this));
    }

    handleClick(e) {
        const elements = this._element.querySelectorAll('.ribbon__item');

        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('ribbon--active')
        }
        
        (<HTMLElement>e.target).classList.add('ribbon--active');

        this._element.dispatchEvent(new CustomEvent('ribbon-item-click', {
            detail: e.target
        }));
    }

    handleResize(e: HTMLElement = null) {
        if (this._scrollState === RibbonScrollState.disabled && !this._nextButton.classList.contains('ribbon--button-disabled')) {
            this._nextButton.classList.add('ribbon--button-disabled');
        }

        if (this._scrollState === RibbonScrollState.enabled && this._translatex === 0) {
            this._nextButton.classList.remove('ribbon--button-disabled');
        }
    }

    handleNextClick() {
        
        if(!this._container.classList.contains('ribbon--animate'))
            this._container.classList.add('ribbon--animate');

        this._translatex += 100;

        if (this._translatex >= this._width - this._element.offsetWidth) {
            this._translatex = this._width - this._element.offsetWidth;

            if (!this._nextButton.classList.contains('ribbon--button-disabled'))
                this._nextButton.classList.add('ribbon--button-disabled');
        }

        this._container.style.transform = `translate3d(${(this._translatex) * -1}px,0,0)`;
        this._previousButton.classList.remove('ribbon--button-disabled');
    }

    handlePreviousClick() {
        if (!this._container.classList.contains('ribbon--animate'))
            this._container.classList.add('ribbon--animate');

        this._translatex -= 100;

        if (this._translatex <= 0) {
            this._translatex = 0;

            if (!this._previousButton.classList.contains('ribbon--button-disabled'))
                this._previousButton.classList.add('ribbon--button-disabled');
        }

        this._container.style.transform = `translate3d(${(this._translatex) * -1}px,0,0)`;
        this._nextButton.classList.remove('ribbon--button-disabled');
    }

    start(e: TouchEvent) {
        this._touchstartx = e.touches[0].pageX;
        this._element.classList.remove('ribbon--animate');
    }

    move(e: TouchEvent) {
        this._touchmovex = e.touches[0].pageX;
        this._movex = this._touchstartx - this._touchmovex;
        this._container.style.transform = `translate3d(${(this._translatex + this._movex) * -1}px,0,0)`;
    }

    end() {
        if (this._movex > 0) {
            this._translatex += this._movex + 100;

            if (this._translatex >= this._width - this._element.offsetWidth) {
                this._translatex = this._width - this._element.offsetWidth;

                if (!this._nextButton.classList.contains('ribbon--button-disabled'))
                    this._nextButton.classList.add('ribbon--button-disabled');
            }

            this._previousButton.classList.remove('ribbon--button-disabled');
        }

        if (this._movex < 0) {
            this._translatex += this._movex - 100;

            if (this._translatex <= 0) {
                this._translatex = 0;

                if (!this._previousButton.classList.contains('ribbon--button-disabled'))
                    this._previousButton.classList.add('ribbon--button-disabled');
            }

            this._nextButton.classList.remove('ribbon--button-disabled');
        }

        this._container.classList.add('ribbon--animate');

        this._container.style.transform = `translate3d(${(this._translatex) * -1}px,0,0)`;
    }
}