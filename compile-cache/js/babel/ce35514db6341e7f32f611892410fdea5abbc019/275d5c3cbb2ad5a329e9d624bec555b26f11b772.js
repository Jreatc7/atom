Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/** @babel */

var _atom = require('atom');

var _reporterProxy = require('./reporter-proxy');

var _reporterProxy2 = _interopRequireDefault(_reporterProxy);

var WelcomeView = undefined,
    GuideView = undefined,
    ConsentView = undefined,
    SunsettingView = undefined;

var SUNSETTING_URI = 'atom://welcome/sunsetting';
var WELCOME_URI = 'atom://welcome/welcome';
var GUIDE_URI = 'atom://welcome/guide';
var CONSENT_URI = 'atom://welcome/consent';

var WelcomePackage = (function () {
  function WelcomePackage() {
    _classCallCheck(this, WelcomePackage);

    this.reporterProxy = new _reporterProxy2['default']();
  }

  _createClass(WelcomePackage, [{
    key: 'activate',
    value: _asyncToGenerator(function* () {
      var _this = this;

      this.subscriptions = new _atom.CompositeDisposable();

      this.subscriptions.add(atom.workspace.addOpener(function (filePath) {
        if (filePath === SUNSETTING_URI) {
          return _this.createSunsettingView({ uri: SUNSETTING_URI });
        }
      }));

      this.subscriptions.add(atom.workspace.addOpener(function (filePath) {
        if (filePath === WELCOME_URI) {
          return _this.createWelcomeView({ uri: WELCOME_URI });
        }
      }));

      this.subscriptions.add(atom.workspace.addOpener(function (filePath) {
        if (filePath === GUIDE_URI) {
          return _this.createGuideView({ uri: GUIDE_URI });
        }
      }));

      this.subscriptions.add(atom.workspace.addOpener(function (filePath) {
        if (filePath === CONSENT_URI) {
          return _this.createConsentView({ uri: CONSENT_URI });
        }
      }));

      this.subscriptions.add(atom.commands.add('atom-workspace', 'welcome:show', function () {
        return _this.showWelcome();
      }));

      if (atom.config.get('core.telemetryConsent') === 'undecided') {
        yield atom.workspace.open(CONSENT_URI);
      }

      if (atom.config.get('welcome.showOnStartup')) {
        yield this.showWelcome();
        this.reporterProxy.sendEvent('show-on-initial-load');
      }

      if (atom.config.get('welcome.showSunsettingOnStartup')) {
        yield this.showSunsetting();
        this.reporterProxy.sendEvent('show-sunsetting-on-initial-load');
      }
    })
  }, {
    key: 'showWelcome',
    value: function showWelcome() {
      return Promise.all([atom.workspace.open(WELCOME_URI, { split: 'left' }), atom.workspace.open(GUIDE_URI, { split: 'right' })]);
    }
  }, {
    key: 'showSunsetting',
    value: function showSunsetting() {
      return atom.workspace.open(SUNSETTING_URI, { split: 'left' });
    }
  }, {
    key: 'consumeReporter',
    value: function consumeReporter(reporter) {
      return this.reporterProxy.setReporter(reporter);
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.subscriptions.dispose();
    }
  }, {
    key: 'createSunsettingView',
    value: function createSunsettingView(state) {
      if (SunsettingView == null) SunsettingView = require('./sunsetting-view');
      return new SunsettingView(_extends({ reporterProxy: this.reporterProxy }, state));
    }
  }, {
    key: 'createWelcomeView',
    value: function createWelcomeView(state) {
      if (WelcomeView == null) WelcomeView = require('./welcome-view');
      return new WelcomeView(_extends({ reporterProxy: this.reporterProxy }, state));
    }
  }, {
    key: 'createGuideView',
    value: function createGuideView(state) {
      if (GuideView == null) GuideView = require('./guide-view');
      return new GuideView(_extends({ reporterProxy: this.reporterProxy }, state));
    }
  }, {
    key: 'createConsentView',
    value: function createConsentView(state) {
      if (ConsentView == null) ConsentView = require('./consent-view');
      return new ConsentView(_extends({ reporterProxy: this.reporterProxy }, state));
    }
  }]);

  return WelcomePackage;
})();

exports['default'] = WelcomePackage;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvd2VsY29tZS9saWIvd2VsY29tZS1wYWNrYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBRW9DLE1BQU07OzZCQUNoQixrQkFBa0I7Ozs7QUFFNUMsSUFBSSxXQUFXLFlBQUE7SUFBRSxTQUFTLFlBQUE7SUFBRSxXQUFXLFlBQUE7SUFBRSxjQUFjLFlBQUEsQ0FBQzs7QUFFeEQsSUFBTSxjQUFjLEdBQUcsMkJBQTJCLENBQUM7QUFDbkQsSUFBTSxXQUFXLEdBQUcsd0JBQXdCLENBQUM7QUFDN0MsSUFBTSxTQUFTLEdBQUcsc0JBQXNCLENBQUM7QUFDekMsSUFBTSxXQUFXLEdBQUcsd0JBQXdCLENBQUM7O0lBRXhCLGNBQWM7QUFDdEIsV0FEUSxjQUFjLEdBQ25COzBCQURLLGNBQWM7O0FBRS9CLFFBQUksQ0FBQyxhQUFhLEdBQUcsZ0NBQW1CLENBQUM7R0FDMUM7O2VBSGtCLGNBQWM7OzZCQUtuQixhQUFHOzs7QUFDZixVQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDOztBQUUvQyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDbkMsWUFBSSxRQUFRLEtBQUssY0FBYyxFQUFFO0FBQy9CLGlCQUFPLE1BQUssb0JBQW9CLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUMzRDtPQUNGLENBQUMsQ0FDSCxDQUFDOztBQUVGLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUNuQyxZQUFJLFFBQVEsS0FBSyxXQUFXLEVBQUU7QUFDNUIsaUJBQU8sTUFBSyxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQyxD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QztLQUN6RTs7O1dBRWMseUJBQUMsS0FBSyxFQUFFO0FBQ3JCLFVBQUksU0FBUyxJQUFJLElBQUksRUFBRSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzNELGFBQU8sSUFBSSxTQUFTLFlBQUcsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLElBQUssS0FBSyxFQUFHLENBQUM7S0FDdkU7OztXQUVnQiwyQkFBQyxLQUFLLEVBQUU7QUFDdkIsVUFBSSxXQUFXLElBQUksSUFBSSxFQUFFLFdBQVcsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxhQUFPLElBQUksV0FBVyxZQUFHLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUFLLEtBQUssRUFBRyxDQUFDO0tBQ3pFOzs7U0FsR2tCLGNBQWM7OztxQkFBZCxjQUFjIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvd2VsY29tZS9saWIvd2VsY29tZS1wYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBiYWJlbCAqL1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xyXG5pbXBvcnQgUmVwb3J0ZXJQcm94eSBmcm9tICcuL3JlcG9ydGVyLXByb3h5JztcclxuXHJcbmxldCBXZWxjb21lVmlldywgR3VpZGVWaWV3LCBDb25zZW50VmlldywgU3Vuc2V0dGluZ1ZpZXc7XHJcblxyXG5jb25zdCBTVU5TRVRUSU5HX1VSSSA9ICdhdG9tOi8vd2VsY29tZS9zdW5zZXR0aW5nJztcclxuY29uc3QgV0VMQ09NRV9VUkkgPSAnYXRvbTovL3dlbGNvbWUvd2VsY29tZSc7XHJcbmNvbnN0IEdVSURFX1VSSSA9ICdhdG9tOi8vd2VsY29tZS9ndWlkZSc7XHJcbmNvbnN0IENPTlNFTlRfVVJJID0gJ2F0b206Ly93ZWxjb21lL2NvbnNlbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VsY29tZVBhY2thZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXBvcnRlclByb3h5ID0gbmV3IFJlcG9ydGVyUHJveHkoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxyXG4gICAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoZmlsZVBhdGggPT4ge1xyXG4gICAgICAgIGlmIChmaWxlUGF0aCA9PT0gU1VOU0VUVElOR19VUkkpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVN1bnNldHRpbmdWaWV3KHsgdXJpOiBTVU5TRVRUSU5HX1VSSSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXHJcbiAgICAgIGF0b20ud29ya3NwYWNlLmFkZE9wZW5lcihmaWxlUGF0aCA9PiB7XHJcbiAgICAgICAgaWYgKGZpbGVQYXRoID09PSBXRUxDT01FX1VSSSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2VsY29tZVZpZXcoeyB1cmk6IFdFTENPTUVfVVJJIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcclxuICAgICAgYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKGZpbGVQYXRoID0+IHtcclxuICAgICAgICBpZiAoZmlsZVBhdGggPT09IEdVSURFX1VSSSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlR3VpZGVWaWV3KHsgdXJpOiBHVUlERV9VUkkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxyXG4gICAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIoZmlsZVBhdGggPT4ge1xyXG4gICAgICAgIGlmIChmaWxlUGF0aCA9PT0gQ09OU0VOVF9VUkkpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvbnNlbnRWaWV3KHsgdXJpOiBDT05TRU5UX1VSSSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXHJcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsICd3ZWxjb21lOnNob3cnLCAoKSA9PlxyXG4gICAgICAgIHRoaXMuc2hvd1dlbGNvbWUoKVxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChhdG9tLmNvbmZpZy5nZXQoJ2NvcmUudGVsZW1ldHJ5Q29uc2VudCcpID09PSAndW5kZWNpZGVkJykge1xyXG4gICAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKENPTlNFTlRfVVJJKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXRvbS5jb25maWcuZ2V0KCd3ZWxjb21lLnNob3dPblN0YXJ0dXAnKSkge1xyXG4gICAgICBhd2FpdCB0aGlzLnNob3dXZWxjb21lKCk7XHJcbiAgICAgIHRoaXMucmVwb3J0ZXJQcm94eS5zZW5kRXZlbnQoJ3Nob3ctb24taW5pdGlhbC1sb2FkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnd2VsY29tZS5zaG93U3Vuc2V0dGluZ09uU3RhcnR1cCcpKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuc2hvd1N1bnNldHRpbmcoKTtcclxuICAgICAgdGhpcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudCgnc2hvdy1zdW5zZXR0aW5nLW9uLWluaXRpYWwtbG9hZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvd1dlbGNvbWUoKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKFdFTENPTUVfVVJJLCB7IHNwbGl0OiAnbGVmdCcgfSksXHJcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4oR1VJREVfVVJJLCB7IHNwbGl0OiAncmlnaHQnIH0pXHJcbiAgICBdKTtcclxuICB9XHJcblxyXG4gIHNob3dTdW5zZXR0aW5nKCkge1xyXG4gICAgcmV0dXJuIGF0b20ud29ya3NwYWNlLm9wZW4oU1VOU0VUVElOR19VUkksIHsgc3BsaXQ6ICdsZWZ0JyB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN1bWVSZXBvcnRlcihyZXBvcnRlcikge1xyXG4gICAgcmV0dXJuIHRoaXMucmVwb3J0ZXJQcm94eS5zZXRSZXBvcnRlcihyZXBvcnRlcik7XHJcbiAgfVxyXG5cclxuICBkZWFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN1bnNldHRpbmdWaWV3KHN0YXRlKSB7XHJcbiAgICBpZiAoU3Vuc2V0dGluZ1ZpZXcgPT0gbnVsbCkgU3Vuc2V0dGluZ1ZpZXcgPSByZXF1aXJlKCcuL3N1bnNldHRpbmctdmlldycpO1xyXG4gICAgcmV0dXJuIG5ldyBTdW5zZXR0aW5nVmlldyh7IHJlcG9ydGVyUHJveHk6IHRoaXMucmVwb3J0ZXJQcm94eSwgLi4uc3RhdGUgfSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVXZWxjb21lVmlldyhzdGF0ZSkge1xyXG4gICAgaWYgKFdlbGNvbWVWaWV3ID09IG51bGwpIFdlbGNvbWVWaWV3ID0gcmVxdWlyZSgnLi93ZWxjb21lLXZpZXcnKTtcclxuICAgIHJldHVybiBuZXcgV2VsY29tZVZpZXcoeyByZXBvcnRlclByb3h5OiB0aGlzLnJlcG9ydGVyUHJveHksIC4uLnN0YXRlIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3VpZGVWaWV3KHN0YXRlKSB7XHJcbiAgICBpZiAoR3VpZGVWaWV3ID09IG51bGwpIEd1aWRlVmlldyA9IHJlcXVpcmUoJy4vZ3VpZGUtdmlldycpO1xyXG4gICAgcmV0dXJuIG5ldyBHdWlkZVZpZXcoeyByZXBvcnRlclByb3h5OiB0aGlzLnJlcG9ydGVyUHJveHksIC4uLnN0YXRlIH0pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQ29uc2VudFZpZXcoc3RhdGUpIHtcclxuICAgIGlmIChDb25zZW50VmlldyA9PSBudWxsKSBDb25zZW50VmlldyA9IHJlcXVpcmUoJy4vY29uc2VudC12aWV3Jyk7XHJcbiAgICByZXR1cm4gbmV3IENvbnNlbnRWaWV3KHsgcmVwb3J0ZXJQcm94eTogdGhpcy5yZXBvcnRlclByb3h5LCAuLi5zdGF0ZSB9KTtcclxuICB9XHJcbn1cclxuIl19