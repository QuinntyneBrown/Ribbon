"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RibbonScrollState;
(function (RibbonScrollState) {
    RibbonScrollState[RibbonScrollState["enabled"] = 0] = "enabled";
    RibbonScrollState[RibbonScrollState["disabled"] = 1] = "disabled";
})(RibbonScrollState = exports.RibbonScrollState || (exports.RibbonScrollState = {}));
var Ribbon = /** @class */ (function () {
    function Ribbon(element) {
        this._touchstartx = undefined;
        this._touchmovex = undefined;
        this._movex = undefined;
        this._translatex = undefined;
        this._width = 1178;
        this._element = element;
        this._container = element.querySelector('.ribbon__container');
        this._nextButton = this._element.querySelector('.ribbon--next');
        this._previousButton = this._element.querySelector('.ribbon--previous');
        var items = element.querySelectorAll('.ribbon__item');
        for (var i = 0; i < items.length; i++) {
            items[i].onclick = this.handleClick.bind(this);
        }
        items[0].classList.add('ribbon--active');
        this.handleResize();
        this._bindTouchEvents();
        this._element.querySelector('.ribbon--next').onclick = this.handleNextClick.bind(this);
        this._element.querySelector('.ribbon--previous').onclick = this.handlePreviousClick.bind(this);
        this._container.style.transform = "translate3d(" + (this._translatex) * -1 + "px,0,0)";
    }
    Object.defineProperty(Ribbon.prototype, "_scrollState", {
        get: function () {
            if (window.innerWidth < this._width)
                return RibbonScrollState.enabled;
            return RibbonScrollState.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Ribbon.mount = function () {
        var ribbons = document.querySelectorAll('.ribbon');
        for (var i = 0; i < ribbons.length; i++) {
            new Ribbon(ribbons[i]);
        }
    };
    Object.defineProperty(Ribbon.prototype, "maxTranslatex", {
        get: function () {
            return this._width - this._element.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    Ribbon.prototype._bindTouchEvents = function () {
        var _this = this;
        this._container.addEventListener("touchstart", function (event) { return _this.start(event); });
        this._container.addEventListener("touchmove", function (event) { return _this.move(event); });
        this._container.addEventListener("touchend", function (event) { return _this.end(event); });
    };
    Ribbon.prototype.handleClick = function (e) {
        Array.from(this._element.querySelectorAll('.ribbon__item'), function (e) { return e.classList.remove('ribbon--active'); });
        e.target.classList.add('ribbon--active');
    };
    Ribbon.prototype.handleResize = function (e) {
        if (e === void 0) { e = null; }
        if (this._scrollState === RibbonScrollState.enabled && this._translatex === undefined) {
            this._translatex = 0;
        }
    };
    Ribbon.prototype.handleNextClick = function (e) {
        if (!this._container.classList.contains('ribbon--animate'))
            this._container.classList.add('ribbon--animate');
        this._translatex += 100;
        if (this._translatex >= this._width - this._element.offsetWidth) {
            this._translatex = this._width - this._element.offsetWidth;
            if (!this._element.querySelector('.ribbon--next').classList.contains('ribbon--button-disabled'))
                this._element.querySelector('.ribbon--next').classList.add('ribbon--button-disabled');
        }
        this._container.style.transform = "translate3d(" + (this._translatex) * -1 + "px,0,0)";
        this._element.querySelector('.ribbon--previous').classList.remove('ribbon--button-disabled');
    };
    Ribbon.prototype.handlePreviousClick = function (e) {
        if (!this._container.classList.contains('ribbon--animate'))
            this._container.classList.add('ribbon--animate');
        this._translatex -= 100;
        this._container.style.transform = "translate3d(" + (this._translatex) * -1 + "px,0,0)";
    };
    Ribbon.prototype.start = function (e) {
        this._touchstartx = e.touches[0].pageX;
        this._element.classList.remove('ribbon--animate');
    };
    Ribbon.prototype.move = function (e) {
        this._touchmovex = e.touches[0].pageX;
        this._movex = this._touchstartx - this._touchmovex;
        this._container.style.transform = "translate3d(" + (this._translatex + this._movex) * -1 + "px,0,0)";
    };
    Ribbon.prototype.end = function (e) {
        if (this._movex > 0)
            this._translatex += this._movex + 100;
        if (this._movex < 0)
            this._translatex += this._movex - 100;
        this._container.classList.add('ribbon--animate');
        this._container.style.transform = "translate3d(" + (this._translatex) * -1 + "px,0,0)";
    };
    return Ribbon;
}());
exports.Ribbon = Ribbon;
