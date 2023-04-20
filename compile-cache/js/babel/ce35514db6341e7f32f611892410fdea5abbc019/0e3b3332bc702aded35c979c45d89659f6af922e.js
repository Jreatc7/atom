Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/** @babel */
/** @jsx etch.dom **/

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var WelcomeView = (function () {
  function WelcomeView(props) {
    var _this = this;

    _classCallCheck(this, WelcomeView);

    this.props = props;
    _etch2['default'].initialize(this);

    this.element.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (link && link.dataset.event) {
        _this.props.reporterProxy.sendEvent('clicked-welcome-' + link.dataset.event + '-link');
      }
    });
  }

  _createClass(WelcomeView, [{
    key: 'didChangeShowOnStartup',
    value: function didChangeShowOnStartup() {
      atom.config.set('welcome.showOnStartup', this.checked);
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'serialize',
    value: function serialize() {
      return {
        deserializer: 'WelcomeView',
        uri: this.props.uri
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _etch2['default'].dom(
        'div',
        { className: 'welcome' },
        _etch2['default'].dom(
          'div',
          { className: 'welcome-container' },
          _etch2['default'].dom(
            'header',
            { className: 'welcome-header' },
            _etch2['default'].dom(
              'a',
              { href: 'https://atom.io/' },
              _etch2['default'].dom(
                'svg',
                {
                  className: 'welcome-logo',
                  width: '330px',
                  height: '68px',
                  viewBox: '0 0 330 68',
                  version: '1.1'
                },
                _etch2['default'].dom(
                  'g',
                  {
                    stroke: 'none',
                    'stroke-width': '1',
                    fill: 'none',
                    'fill-rule': 'evenodd'
                  },
                  _etch2['default'].dom(
                    'g',
                    { transform: 'translate(2.000000, 1.000000)' },
                    _etch2['default'].dom(
                      'g',
                      {
                        transform: 'translate(96.000000, 8.000000)',
                        fill: 'currentColor'
                      },
                      _etch2['default'].dom('path', { d: 'M185.498,3.399 C185.498,2.417 186.34,1.573 187.324,1.573 L187.674,1.573 C188.447,1.573 189.01,1.995 189.5,2.628 L208.676,30.862 L227.852,2.628 C228.272,1.995 228.905,1.573 229.676,1.573 L230.028,1.573 C231.01,1.573 231.854,2.417 231.854,3.399 L231.854,49.403 C231.854,50.387 231.01,51.231 230.028,51.231 C229.044,51.231 228.202,50.387 228.202,49.403 L228.202,8.246 L210.151,34.515 C209.729,35.148 209.237,35.428 208.606,35.428 C207.973,35.428 207.481,35.148 207.061,34.515 L189.01,8.246 L189.01,49.475 C189.01,50.457 188.237,51.231 187.254,51.231 C186.27,51.231 185.498,50.458 185.498,49.475 L185.498,3.399 L185.498,3.399 Z' }),
                      _etch2['default'].dom('path', { d: 'M113.086,26.507 L113.086,26.367 C113.086,12.952 122.99,0.941 137.881,0.941 C152.77,0.941 162.533,12.811 162.533,26.225 L162.533,26.367 C162.533,39.782 152.629,51.792 137.74,51.792 C122.85,51.792 113.086,39.923 113.086,26.507 M158.74,26.507 L158.74,26.367 C158.74,14.216 149.89,4.242 137.74,4.242 C125.588,4.242 116.879,14.075 116.879,26.225 L116.879,26.367 C116.879,38.518 125.729,48.491 137.881,48.491 C150.031,48.491 158.74,38.658 158.74,26.507' }),
                      _etch2['default'].dom('path', { d: 'M76.705,5.155 L60.972,5.155 C60.06,5.155 59.287,4.384 59.287,3.469 C59.287,2.556 60.059,1.783 60.972,1.783 L96.092,1.783 C97.004,1.783 97.778,2.555 97.778,3.469 C97.778,4.383 97.005,5.155 96.092,5.155 L80.358,5.155 L80.358,49.405 C80.358,50.387 79.516,51.231 78.532,51.231 C77.55,51.231 76.706,50.387 76.706,49.405 L76.706,5.155 L76.705,5.155 Z' }),
                      _etch2['default'].dom('path', { d: 'M0.291,48.562 L21.291,3.05 C21.783,1.995 22.485,1.292 23.75,1.292 L23.891,1.292 C25.155,1.292 25.858,1.995 26.348,3.05 L47.279,48.421 C47.49,48.843 47.56,49.194 47.56,49.546 C47.56,50.458 46.788,51.231 45.803,51.231 C44.961,51.231 44.329,50.599 43.978,49.826 L38.219,37.183 L9.21,37.183 L3.45,49.897 C3.099,50.739 2.538,51.231 1.694,51.231 C0.781,51.231 0.008,50.529 0.008,49.685 C0.009,49.404 0.08,48.983 0.291,48.562 L0.291,48.562 Z M36.673,33.882 L23.749,5.437 L10.755,33.882 L36.673,33.882 L36.673,33.882 Z' })
                    ),
                    _etch2['default'].dom(
                      'g',
                      null,
                      _etch2['default'].dom('path', {
                        d: 'M40.363,32.075 C40.874,34.44 39.371,36.77 37.006,37.282 C34.641,37.793 32.311,36.29 31.799,33.925 C31.289,31.56 32.791,29.23 35.156,28.718 C37.521,28.207 39.851,29.71 40.363,32.075',
                        fill: 'currentColor'
                      }),
                      _etch2['default'].dom('path', {
                        d: 'M48.578,28.615 C56.851,45.587 58.558,61.581 52.288,64.778 C45.822,68.076 33.326,56.521 24.375,38.969 C15.424,21.418 13.409,4.518 19.874,1.221 C22.689,-0.216 26.648,1.166 30.959,4.629',
                        stroke: 'currentColor',
                        'stroke-width': '3.08',
                        'stroke-linecap': 'round'
                      }),
                      _etch2['default'].dom('path', {
                        d: 'M7.64,39.45 C2.806,36.94 -0.009,33.915 0.154,30.79 C0.531,23.542 16.787,18.497 36.462,19.52 C56.137,20.544 71.781,27.249 71.404,34.497 C71.241,37.622 68.127,40.338 63.06,42.333',
                        stroke: 'currentColor',
                        'stroke-width': '3.08',
                        'stroke-linecap': 'round'
                      }),
                      _etch2['default'].dom('path', {
                        d: 'M28.828,59.354 C23.545,63.168 18.843,64.561 15.902,62.653 C9.814,58.702 13.572,42.102 24.296,25.575 C35.02,9.048 48.649,-1.149 54.736,2.803 C57.566,4.639 58.269,9.208 57.133,15.232',
                        stroke: 'currentColor',
                        'stroke-width': '3.08',
                        'stroke-linecap': 'round'
                      })
                    )
                  )
                )
              ),
              _etch2['default'].dom(
                'h1',
                { className: 'welcome-title' },
                'A hackable text editor for the 21',
                _etch2['default'].dom(
                  'sup',
                  null,
                  'st'
                ),
                ' Century'
              )
            )
          ),
          _etch2['default'].dom(
            'section',
            { className: 'welcome-panel' },
            _etch2['default'].dom(
              'p',
              null,
              'For help, please visit'
            ),
            _etch2['default'].dom(
              'ul',
              null,
              _etch2['default'].dom(
                'li',
                null,
                'The',
                ' ',
                _etch2['default'].dom(
                  'a',
                  {
                    href: 'https://www.atom.io/docs',
                    dataset: { event: 'atom-docs' }
                  },
                  'Atom docs'
                ),
                ' ',
                'for Guides and the API reference.'
              ),
              _etch2['default'].dom(
                'li',
                null,
                'The Atom forum at',
                ' ',
                _etch2['default'].dom(
                  'a',
                  {
                    href: 'https://github.com/atom/atom/discussions',
                    dataset: { event: 'discussions' }
                  },
                  'Github Discussions'
                )
              ),
              _etch2['default'].dom(
                'li',
                null,
                'The',
                ' ',
                _etch2['default'].dom(
                  'a',
                  {
                    href: 'https://github.com/atom',
                    dataset: { event: 'atom-org' }
                  },
                  'Atom org'
                ),
                '. This is where all GitHub-created Atom packages can be found.'
              )
            )
          ),
          _etch2['default'].dom(
            'section',
            { className: 'welcome-panel' },
            _etch2['default'].dom(
              'label',
              null,
              _etch2['default'].dom('input', {
                className: 'input-checkbox',
                type: 'checkbox',
                checked: atom.config.get('welcome.showOnStartup'),
                onchange: this.didChangeShowOnStartup
              }),
              'Show Welcome Guide when opening Atom'
            )
          ),
          _etch2['default'].dom(
            'footer',
            { className: 'welcome-footer' },
            _etch2['default'].dom(
              'a',
              { href: 'https://atom.io/', dataset: { event: 'footer-atom-io' } },
              'atom.io'
            ),
            ' ',
            _etch2['default'].dom(
              'span',
              { className: 'text-subtle' },
              '×'
            ),
            ' ',
            _etch2['default'].dom('a', {
              className: 'icon icon-octoface',
              href: 'https://github.com/',
              dataset: { event: 'footer-octocat' }
            })
          )
        )
      );
    }
  }, {
    key: 'getURI',
    value: function getURI() {
      return this.props.uri;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      return 'Welcome';
    }
  }, {
    key: 'isEqual',
    value: function isEqual(other) {
      return other instanceof WelcomeView;
    }
  }]);

  return WelcomeView;
})();

exports['default'] = WelcomeView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvd2VsY29tZS9saWIvd2VsY29tZS12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7b0JBR2lCLE1BQU07Ozs7SUFFRixXQUFXO0FBQ25CLFdBRFEsV0FBVyxDQUNsQixLQUFLLEVBQUU7OzswQkFEQSxXQUFXOztBQUU1QixRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixzQkFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXRCLFFBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUEsS0FBSyxFQUFJO0FBQzlDLFVBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLFVBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzlCLGNBQUssS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLHNCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUN0QyxDQUFDO09BQ0g7S0FDRixDQUFDLENBQUM7R0FDSjs7ZUFia0IsV0FBVzs7V0FlUixrQ0FBRztBQUN2QixVQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEQ7OztXQUVLLGtCQUFHLEVBQUU7OztXQUVGLHFCQUFHO0FBQ1YsYUFBTztBQUNMLG9CQUFZLEVBQUUsYUFBYTtBQUMzQixXQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO09BQ3BCLENBQUM7S0FDSDs7O1dBRUssa0JBQUc7QUFDUCxhQUNFOztVQUFLLFNBQVMsRUFBQyxTQUFTO1FBQ3RCOztZQUFLLFNBQVMsRUFBQyxtQkFBbUI7VUFDaEM7O2NBQVEsU0FBUyxFQUFDLGdCQUFnQjtZQUNoQzs7Z0JBQUcsSUFBSSxF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UCxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ3ZCOzs7V0FFTyxvQkFBRztBQUNULGFBQU8sU0FBUyxDQUFDO0tBQ2xCOzs7V0FFTSxpQkFBQyxLQUFLLEVBQUU7QUFDYixhQUFPLEtBQUssWUFBWSxXQUFXLENBQUM7S0FDckM7OztTQW5La0IsV0FBVzs7O3FCQUFYLFdBQVciLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9qZXBzdC8uYXRvbS9wYWNrYWdlcy93ZWxjb21lL2xpYi93ZWxjb21lLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXHJcbi8qKiBAanN4IGV0Y2guZG9tICoqL1xyXG5cclxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWxjb21lVmlldyB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcclxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgIGNvbnN0IGxpbmsgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYScpO1xyXG4gICAgICBpZiAobGluayAmJiBsaW5rLmRhdGFzZXQuZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLnJlcG9ydGVyUHJveHkuc2VuZEV2ZW50KFxyXG4gICAgICAgICAgYGNsaWNrZWQtd2VsY29tZS0ke2xpbmsuZGF0YXNldC5ldmVudH0tbGlua2BcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpZENoYW5nZVNob3dPblN0YXJ0dXAoKSB7XHJcbiAgICBhdG9tLmNvbmZpZy5zZXQoJ3dlbGNvbWUuc2hvd09uU3RhcnR1cCcsIHRoaXMuY2hlY2tlZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7fVxyXG5cclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdXZWxjb21lVmlldycsXHJcbiAgICAgIHVyaTogdGhpcy5wcm9wcy51cmlcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGNvbWVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGNvbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cIndlbGNvbWUtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2F0b20uaW8vXCI+XHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2VsY29tZS1sb2dvXCJcclxuICAgICAgICAgICAgICAgIHdpZHRoPVwiMzMwcHhcIlxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiNjhweFwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDMzMCA2OFwiXHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uPVwiMS4xXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8Z1xyXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMVwiXHJcbiAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyLjAwMDAwMCwgMS4wMDAwMDApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGdcclxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg5Ni4wMDAwMDAsIDguMDAwMDAwKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE4NS40OTgsMy4zOTkgQzE4NS40OTgsMi40MTcgMTg2LjM0LDEuNTczIDE4Ny4zMjQsMS41NzMgTDE4Ny42NzQsMS41NzMgQzE4OC40NDcsMS41NzMgMTg5LjAxLDEuOTk1IDE4OS41LDIuNjI4IEwyMDguNjc2LDMwLjg2MiBMMjI3Ljg1MiwyLjYyOCBDMjI4LjI3MiwxLjk5NSAyMjguOTA1LDEuNTczIDIyOS42NzYsMS41NzMgTDIzMC4wMjgsMS41NzMgQzIzMS4wMSwxLjU3MyAyMzEuODU0LDIuNDE3IDIzMS44NTQsMy4zOTkgTDIzMS44NTQsNDkuNDAzIEMyMzEuODU0LDUwLjM4NyAyMzEuMDEsNTEuMjMxIDIzMC4wMjgsNTEuMjMxIEMyMjkuMDQ0LDUxLjIzMSAyMjguMjAyLDUwLjM4NyAyMjguMjAyLDQ5LjQwMyBMMjI4LjIwMiw4LjI0NiBMMjEwLjE1MSwzNC41MTUgQzIwOS43MjksMzUuMTQ4IDIwOS4yMzcsMzUuNDI4IDIwOC42MDYsMzUuNDI4IEMyMDcuOTczLDM1LjQyOCAyMDcuNDgxLDM1LjE0OCAyMDcuMDYxLDM0LjUxNSBMMTg5LjAxLDguMjQ2IEwxODkuMDEsNDkuNDc1IEMxODkuMDEsNTAuNDU3IDE4OC4yMzcsNTEuMjMxIDE4Ny4yNTQsNTEuMjMxIEMxODYuMjcsNTEuMjMxIDE4NS40OTgsNTAuNDU4IDE4NS40OTgsNDkuNDc1IEwxODUuNDk4LDMuMzk5IEwxODUuNDk4LDMuMzk5IFpcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMTMuMDg2LDI2LjUwNyBMMTEzLjA4NiwyNi4zNjcgQzExMy4wODYsMTIuOTUyIDEyMi45OSwwLjk0MSAxMzcuODgxLDAuOTQxIEMxNTIuNzcsMC45NDEgMTYyLjUzMywxMi44MTEgMTYyLjUzMywyNi4yMjUgTDE2Mi41MzMsMjYuMzY3IEMxNjIuNTMzLDM5Ljc4MiAxNTIuNjI5LDUxLjc5MiAxMzcuNzQsNTEuNzkyIEMxMjIuODUsNTEuNzkyIDExMy4wODYsMzkuOTIzIDExMy4wODYsMjYuNTA3IE0xNTguNzQsMjYuNTA3IEwxNTguNzQsMjYuMzY3IEMxNTguNzQsMTQuMjE2IDE0OS44OSw0LjI0MiAxMzcuNzQsNC4yNDIgQzEyNS41ODgsNC4yNDIgMTE2Ljg3OSwxNC4wNzUgMTE2Ljg3OSwyNi4yMjUgTDExNi44NzksMjYuMzY3IEMxMTYuODc5LDM4LjUxOCAxMjUuNzI5LDQ4LjQ5MSAxMzcuODgxLDQ4LjQ5MSBDMTUwLjAzMSw0OC40OTEgMTU4Ljc0LDM4LjY1OCAxNTguNzQsMjYuNTA3XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNzYuNzA1LDUuMTU1IEw2MC45NzIsNS4xNTUgQzYwLjA2LDUuMTU1IDU5LjI4Nyw0LjM4NCA1OS4yODcsMy40NjkgQzU5LjI4NywyLjU1NiA2MC4wNTksMS43ODMgNjAuOTcyLDEuNzgzIEw5Ni4wOTIsMS43ODMgQzk3LjAwNCwxLjc4MyA5Ny43NzgsMi41NTUgOTcuNzc4LDMuNDY5IEM5Ny43NzgsNC4zODMgOTcuMDA1LDUuMTU1IDk2LjA5Miw1LjE1NSBMODAuMzU4LDUuMTU1IEw4MC4zNTgsNDkuNDA1IEM4MC4zNTgsNTAuMzg3IDc5LjUxNiw1MS4yMzEgNzguNTMyLDUxLjIzMSBDNzcuNTUsNTEuMjMxIDc2LjcwNiw1MC4zODcgNzYuNzA2LDQ5LjQwNSBMNzYuNzA2LDUuMTU1IEw3Ni43MDUsNS4xNTUgWlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAuMjkxLDQ4LjU2MiBMMjEuMjkxLDMuMDUgQzIxLjc4MywxLjk5NSAyMi40ODUsMS4yOTIgMjMuNzUsMS4yOTIgTDIzLjg5MSwxLjI5MiBDMjUuMTU1LDEuMjkyIDI1Ljg1OCwxLjk5NSAyNi4zNDgsMy4wNSBMNDcuMjc5LDQ4LjQyMSBDNDcuNDksNDguODQzIDQ3LjU2LDQ5LjE5NCA0Ny41Niw0OS41NDYgQzQ3LjU2LDUwLjQ1OCA0Ni43ODgsNTEuMjMxIDQ1LjgwMyw1MS4yMzEgQzQ0Ljk2MSw1MS4yMzEgNDQuMzI5LDUwLjU5OSA0My45NzgsNDkuODI2IEwzOC4yMTksMzcuMTgzIEw5LjIxLDM3LjE4MyBMMy40NSw0OS44OTcgQzMuMDk5LDUwLjczOSAyLjUzOCw1MS4yMzEgMS42OTQsNTEuMjMxIEMwLjc4MSw1MS4yMzEgMC4wMDgsNTAuNTI5IDAuMDA4LDQ5LjY4NSBDMC4wMDksNDkuNDA0IDAuMDgsNDguOTgzIDAuMjkxLDQ4LjU2MiBMMC4yOTEsNDguNTYyIFogTTM2LjY3MywzMy44ODIgTDIzLjc0OSw1LjQzNyBMMTAuNzU1LDMzLjg4MiBMMzYuNjczLDMzLjg4MiBMMzYuNjczLDMzLjg4MiBaXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICAgICAgPGc+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTQwLjM2MywzMi4wNzUgQzQwLjg3NCwzNC40NCAzOS4zNzEsMzYuNzcgMzcuMDA2LDM3LjI4MiBDMzQuNjQxLDM3Ljc5MyAzMi4zMTEsMzYuMjkgMzEuNzk5LDMzLjkyNSBDMzEuMjg5LDMxLjU2IDMyLjc5MSwyOS4yMyAzNS4xNTYsMjguNzE4IEMzNy41MjEsMjguMjA3IDM5Ljg1MSwyOS43MSA0MC4zNjMsMzIuMDc1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk00OC41NzgsMjguNjE1IEM1Ni44NTEsNDUuNTg3IDU4LjU1OCw2MS41ODEgNTIuMjg4LDY0Ljc3OCBDNDUuODIyLDY4LjA3NiAzMy4zMjYsNTYuNTIxIDI0LjM3NSwzOC45NjkgQzE1LjQyNCwyMS40MTggMTMuNDA5LDQuNTE4IDE5Ljg3NCwxLjIyMSBDMjIuNjg5LC0wLjIxNiAyNi42NDgsMS4xNjYgMzAuOTU5LDQuNjI5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMy4wOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNy42NCwzOS40NSBDMi44MDYsMzYuOTQgLTAuMDA5LDMzLjkxNSAwLjE1NCwzMC43OSBDMC41MzEsMjMuNTQyIDE2Ljc4NywxOC40OTcgMzYuNDYyLDE5LjUyIEM1Ni4xMzcsMjAuNTQ0IDcxLjc4MSwyNy4yNDkgNzEuNDA0LDM0LjQ5NyBDNzEuMjQxLDM3LjYyMiA2OC4xMjcsNDAuMzM4IDYzLjA2LDQyLjMzM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjMuMDhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTI4LjgyOCw1OS4zNTQgQzIzLjU0NSw2My4xNjggMTguODQzLDY0LjU2MSAxNS45MDIsNjIuNjUzIEM5LjgxNCw1OC43MDIgMTMuNTcyLDQyLjEwMiAyNC4yOTYsMjUuNTc1IEMzNS4wMiw5LjA0OCA0OC42NDksLTEuMTQ5IDU0LjczNiwyLjgwMyBDNTcuNTY2LDQuNjM5IDU4LjI2OSw5LjIwOCA1Ny4xMzMsMTUuMjMyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMy4wOFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwid2VsY29tZS10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgQSBoYWNrYWJsZSB0ZXh0IGVkaXRvciBmb3IgdGhlIDIxPHN1cD5zdDwvc3VwPiBDZW50dXJ5XHJcbiAgICAgICAgICAgICAgPC9oMT5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9oZWFkZXI+XHJcblxyXG4gICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid2VsY29tZS1wYW5lbFwiPlxyXG4gICAgICAgICAgICA8cD5Gb3IgaGVscCwgcGxlYXNlIHZpc2l0PC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgVGhleycgJ31cclxuICAgICAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5hdG9tLmlvL2RvY3NcIlxyXG4gICAgICAgICAgICAgICAgICBkYXRhc2V0PXt7IGV2ZW50OiAnYXRvbS1kb2NzJyB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBBdG9tIGRvY3NcclxuICAgICAgICAgICAgICAgIDwvYT57JyAnfVxyXG4gICAgICAgICAgICAgICAgZm9yIEd1aWRlcyBhbmQgdGhlIEFQSSByZWZlcmVuY2UuXHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICBUaGUgQXRvbSBmb3J1bSBhdHsnICd9XHJcbiAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL2F0b20vYXRvbS9kaXNjdXNzaW9uc1wiXHJcbiAgICAgICAgICAgICAgICAgIGRhdGFzZXQ9e3sgZXZlbnQ6ICdkaXNjdXNzaW9ucycgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgR2l0aHViIERpc2N1c3Npb25zXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICBUaGV7JyAnfVxyXG4gICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tXCJcclxuICAgICAgICAgICAgICAgICAgZGF0YXNldD17eyBldmVudDogJ2F0b20tb3JnJyB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBBdG9tIG9yZ1xyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgLiBUaGlzIGlzIHdoZXJlIGFsbCBHaXRIdWItY3JlYXRlZCBBdG9tIHBhY2thZ2VzIGNhbiBiZSBmb3VuZC5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgPC9zZWN0aW9uPlxyXG5cclxuICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cIndlbGNvbWUtcGFuZWxcIj5cclxuICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2F0b20uY29uZmlnLmdldCgnd2VsY29tZS5zaG93T25TdGFydHVwJyl9XHJcbiAgICAgICAgICAgICAgICBvbmNoYW5nZT17dGhpcy5kaWRDaGFuZ2VTaG93T25TdGFydHVwfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgU2hvdyBXZWxjb21lIEd1aWRlIHdoZW4gb3BlbmluZyBBdG9tXHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJ3ZWxjb21lLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9hdG9tLmlvL1wiIGRhdGFzZXQ9e3sgZXZlbnQ6ICdmb290ZXItYXRvbS1pbycgfX0+XHJcbiAgICAgICAgICAgICAgYXRvbS5pb1xyXG4gICAgICAgICAgICA8L2E+eycgJ31cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zdWJ0bGVcIj7Dlzwvc3Bhbj57JyAnfVxyXG4gICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImljb24gaWNvbi1vY3RvZmFjZVwiXHJcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9cIlxyXG4gICAgICAgICAgICAgIGRhdGFzZXQ9e3sgZXZlbnQ6ICdmb290ZXItb2N0b2NhdCcgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZm9vdGVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRVUkkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy51cmk7XHJcbiAgfVxyXG5cclxuICBnZXRUaXRsZSgpIHtcclxuICAgIHJldHVybiAnV2VsY29tZSc7XHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBXZWxjb21lVmlldztcclxuICB9XHJcbn1cclxuIl19