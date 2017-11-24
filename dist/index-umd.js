(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.index = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
  }

  ;
  Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(_CustomElement, HTMLElement);

  var DetailsDialogElement = function (_CustomElement2) {
    _inherits(DetailsDialogElement, _CustomElement2);

    function DetailsDialogElement() {
      _classCallCheck(this, DetailsDialogElement);

      var _this = _possibleConstructorReturn(this, (DetailsDialogElement.__proto__ || Object.getPrototypeOf(DetailsDialogElement)).call(this));

      _this.attachShadow({ mode: 'open' });
      _this.shadowRoot.innerHTML = '\n      <style>\n        .close-button {\n          background: none;\n          position: absolute;\n          right: 0;\n          top: 0;\n          padding: 20px;\n          border: 0;\n          line-height: 1;\n        }\n      </style>\n      <slot></slot>\n      <button type="button" class="close-button" aria-label="Close dialog" data-close-dialog>&#9587;</button>\n    ';
      _this.details = _this.parentElement;
      _this.closeButton = _this.shadowRoot.querySelector('.close-button');

      var keyDownHelpers = _this._keyDownHelpers.bind(_this);
      var captureDismissal = _this._captureDismissal.bind(_this);

      _this.details.addEventListener('toggle', function () {
        if (this.details.open) {
          this._autofocus();
          this.details.addEventListener('keydown', keyDownHelpers);
          this.shadowRoot.addEventListener('click', captureDismissal);
        } else {
          var summary = this.details.querySelector('summary');
          summary.focus();

          this.details.removeEventListener('keydown', keyDownHelpers);
          this.shadowRoot.removeEventListener('click', captureDismissal);
        }
      }.bind(_this), { capture: true });
      return _this;
    }

    _createClass(DetailsDialogElement, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        this.setAttribute('role', 'dialog');
      }
    }, {
      key: '_autofocus',
      value: function _autofocus() {
        var autofocus = this.querySelector('[autofocus]');
        if (!autofocus) {
          autofocus = this;
          this.setAttribute('tabindex', '-1');
        }
        autofocus.focus();
      }
    }, {
      key: '_captureDismissal',
      value: function _captureDismissal(event) {
        if (event.target.hasAttribute('data-close-dialog')) {
          this.details.open = false;
        }
      }
    }, {
      key: '_keyDownHelpers',
      value: function _keyDownHelpers(event) {
        if (event.key === 'Escape') {
          event.currentTarget.open = false;
        } else if (event.key === 'Tab') {
          this._restrictTabBehavior(event);
        }
      }
    }, {
      key: '_restrictTabBehavior',
      value: function _restrictTabBehavior(event) {
        event.preventDefault();

        var modal = event.currentTarget;
        var elements = Array.from(modal.querySelectorAll('a, input, button, textarea')).filter(function (element) {
          // Need visible check
          return !element.disabled;
        });

        elements.unshift(this.closeButton);
        var movement = event.shiftKey ? -1 : 1;
        var currentFocus = elements.filter(function (el) {
          return el.matches(':focus');
        })[0];
        var targetIndex = elements.length - 1;

        if (currentFocus) {
          var currentIndex = elements.indexOf(currentFocus);
          if (currentIndex !== -1) {
            var newIndex = currentIndex + movement;
            if (newIndex >= 0) targetIndex = newIndex % elements.length;
          }
        }

        elements[targetIndex].focus();
      }
    }]);

    return DetailsDialogElement;
  }(_CustomElement);

  window.customElements.define('details-dialog', DetailsDialogElement);
});
