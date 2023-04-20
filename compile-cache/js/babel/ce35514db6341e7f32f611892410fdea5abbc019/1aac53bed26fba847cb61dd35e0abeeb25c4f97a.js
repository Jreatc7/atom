Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @babel */
/** @jsx etch.dom **/

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var GuideView = (function () {
  function GuideView(props) {
    _classCallCheck(this, GuideView);

    this.props = props;
    this.didClickProjectButton = this.didClickProjectButton.bind(this);
    this.didClickGitButton = this.didClickGitButton.bind(this);
    this.didClickGitHubButton = this.didClickGitHubButton.bind(this);
    this.didClickTeletypeButton = this.didClickTeletypeButton.bind(this);
    this.didClickPackagesButton = this.didClickPackagesButton.bind(this);
    this.didClickThemesButton = this.didClickThemesButton.bind(this);
    this.didClickStylingButton = this.didClickStylingButton.bind(this);
    this.didClickInitScriptButton = this.didClickInitScriptButton.bind(this);
    this.didClickSnippetsButton = this.didClickSnippetsButton.bind(this);
    this.didExpandOrCollapseSection = this.didExpandOrCollapseSection.bind(this);
    _etch2["default"].initialize(this);
  }

  _createClass(GuideView, [{
    key: "update",
    value: function update() {}
  }, {
    key: "render",
    value: function render() {
      return _etch2["default"].dom(
        "div",
        { className: "welcome is-guide" },
        _etch2["default"].dom(
          "div",
          { className: "welcome-container" },
          _etch2["default"].dom(
            "section",
            { className: "welcome-panel" },
            _etch2["default"].dom(
              "h1",
              { className: "welcome-title" },
              "Get to know Atom!"
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('project')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-repo" },
                "Open a ",
                _etch2["default"].dom(
                  "span",
                  { className: "welcome-highlight" },
                  "Project"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/project.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "In Atom you can open individual files or a whole folder as a project. Opening a folder will add a tree view to the editor where you can browse all the files."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "projectButton",
                      onclick: this.didClickProjectButton,
                      className: "btn btn-primary"
                    },
                    "Open a Project"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can also open projects from the menu, keyboard shortcut or by dragging a folder onto the Atom dock icon."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({ className: "welcome-card" }, this.getSectionProps('git')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-mark-github" },
                "Version control with",
                ' ',
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Git and GitHub"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/package.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Track changes to your code as you work. Branch, commit, push, and pull without leaving the comfort of your editor. Collaborate with other developers on GitHub."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      onclick: this.didClickGitButton,
                      className: "btn btn-primary inline-block"
                    },
                    "Open the Git panel"
                  ),
                  _etch2["default"].dom(
                    "button",
                    {
                      onclick: this.didClickGitHubButton,
                      className: "btn btn-primary inline-block"
                    },
                    "Open the GitHub panel"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can toggle the Git tab by clicking on the",
                  _etch2["default"].dom("span", { className: "icon icon-diff" }),
                  " button in your status bar."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('teletype')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-radio-tower" },
                "Collaborate in real time with",
                ' ',
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Teletype"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/code.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Share your workspace with team members and collaborate on code in real time."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      onclick: this.didClickTeletypeButton,
                      className: "btn btn-primary inline-block"
                    },
                    "Install Teletype for Atom"
                  )
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('packages')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-package" },
                "Install a ",
                _etch2["default"].dom(
                  "span",
                  { className: "welcome-highlight" },
                  "Package"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/package.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "One of the best things about Atom is the package ecosystem. Installing packages adds new features and functionality you can use to make the editor suit your needs. Let's install one."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "packagesButton",
                      onclick: this.didClickPackagesButton,
                      className: "btn btn-primary"
                    },
                    "Open Installer"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can install new packages from the settings."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('themes')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-paintcan" },
                "Choose a ",
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Theme"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/theme.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Atom comes with preinstalled themes. Let's try a few."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "themesButton",
                      onclick: this.didClickThemesButton,
                      className: "btn btn-primary"
                    },
                    "Open the theme picker"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "You can also install themes created by the Atom community. To install new themes, click on \"+ Install\" and switch the toggle to \"themes\"."
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can switch themes from the settings."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('styling')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-paintcan" },
                "Customize the ",
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Styling"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/code.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "You can customize almost anything by adding your own CSS/LESS."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "stylingButton",
                      onclick: this.didClickStylingButton,
                      className: "btn btn-primary"
                    },
                    "Open your Stylesheet"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Now uncomment some of the examples or try your own"
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can open your stylesheet from Menu ",
                  this.getApplicationMenuName(),
                  "."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('init-script')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-code" },
                "Hack on the ",
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Init Script"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/code.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "The init script is a bit of JavaScript or CoffeeScript run at startup. You can use it to quickly change the behaviour of Atom."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "initScriptButton",
                      onclick: this.didClickInitScriptButton,
                      className: "btn btn-primary"
                    },
                    "Open your Init Script"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Uncomment some of the examples or try out your own."
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can open your init script from Menu > ",
                  this.getApplicationMenuName(),
                  "."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('snippets')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-code" },
                "Add a ",
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Snippet"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/code.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "Atom snippets allow you to enter a simple prefix in the editor and hit tab to expand the prefix into a larger code block with templated values."
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom(
                    "button",
                    {
                      ref: "snippetsButton",
                      onclick: this.didClickSnippetsButton,
                      className: "btn btn-primary"
                    },
                    "Open your Snippets"
                  )
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "In your snippets file, type ",
                  _etch2["default"].dom(
                    "code",
                    null,
                    "snip"
                  ),
                  " then hit",
                  ' ',
                  _etch2["default"].dom(
                    "code",
                    null,
                    "tab"
                  ),
                  ". The ",
                  _etch2["default"].dom(
                    "code",
                    null,
                    "snip"
                  ),
                  " snippet will expand to create a snippet!"
                ),
                _etch2["default"].dom(
                  "p",
                  { className: "welcome-note" },
                  _etch2["default"].dom(
                    "strong",
                    null,
                    "Next time:"
                  ),
                  " You can open your snippets in Menu > ",
                  this.getApplicationMenuName(),
                  "."
                )
              )
            ),
            _etch2["default"].dom(
              "details",
              _extends({
                className: "welcome-card"
              }, this.getSectionProps('shortcuts')),
              _etch2["default"].dom(
                "summary",
                { className: "welcome-summary icon icon-keyboard" },
                "Learn ",
                _etch2["default"].dom(
                  "span",
                  { "class": "welcome-highlight" },
                  "Keyboard Shortcuts"
                )
              ),
              _etch2["default"].dom(
                "div",
                { className: "welcome-detail" },
                _etch2["default"].dom(
                  "p",
                  null,
                  _etch2["default"].dom("img", {
                    className: "welcome-img",
                    src: "atom://welcome/assets/shortcut.svg"
                  })
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "If you only remember one keyboard shortcut make it",
                  ' ',
                  _etch2["default"].dom(
                    "kbd",
                    { className: "welcome-key" },
                    this.getCommandPaletteKeyBinding()
                  ),
                  ". This keystroke toggles the command palette, which lists every Atom command. It's a good way to learn more shortcuts. Yes, you can try it now!"
                ),
                _etch2["default"].dom(
                  "p",
                  null,
                  "If you want to use these guides again use the command palette",
                  ' ',
                  _etch2["default"].dom(
                    "kbd",
                    { className: "welcome-key" },
                    this.getCommandPaletteKeyBinding()
                  ),
                  ' ',
                  "and search for ",
                  _etch2["default"].dom(
                    "span",
                    { className: "text-highlight" },
                    "Welcome"
                  ),
                  "."
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: "getSectionProps",
    value: function getSectionProps(sectionName) {
      var props = {
        dataset: { section: sectionName },
        onclick: this.didExpandOrCollapseSection
      };
      if (this.props.openSections && this.props.openSections.indexOf(sectionName) !== -1) {
        props.open = true;
      }
      return props;
    }
  }, {
    key: "getCommandPaletteKeyBinding",
    value: function getCommandPaletteKeyBinding() {
      if (process.platform === 'darwin') {
        return 'cmd-shift-p';
      } else {
        return 'ctrl-shift-p';
      }
    }
  }, {
    key: "getApplicationMenuName",
    value: function getApplicationMenuName() {
      if (process.platform === 'darwin') {
        return 'Atom';
      } else if (process.platform === 'linux') {
        return 'Edit';
      } else {
        return 'File';
      }
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return {
        deserializer: this.constructor.name,
        openSections: this.getOpenSections(),
        uri: this.getURI()
      };
    }
  }, {
    key: "getURI",
    value: function getURI() {
      return this.props.uri;
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return 'Welcome Guide';
    }
  }, {
    key: "isEqual",
    value: function isEqual(other) {
      return other instanceof GuideView;
    }
  }, {
    key: "getOpenSections",
    value: function getOpenSections() {
      return Array.from(this.element.querySelectorAll('details[open]')).map(function (sectionElement) {
        return sectionElement.dataset.section;
      });
    }
  }, {
    key: "didClickProjectButton",
    value: function didClickProjectButton() {
      this.props.reporterProxy.sendEvent('clicked-project-cta');
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'application:open');
    }
  }, {
    key: "didClickGitButton",
    value: function didClickGitButton() {
      this.props.reporterProxy.sendEvent('clicked-git-cta');
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'github:toggle-git-tab');
    }
  }, {
    key: "didClickGitHubButton",
    value: function didClickGitHubButton() {
      this.props.reporterProxy.sendEvent('clicked-github-cta');
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'github:toggle-github-tab');
    }
  }, {
    key: "didClickPackagesButton",
    value: function didClickPackagesButton() {
      this.props.reporterProxy.sendEvent('clicked-packages-cta');
      atom.workspace.open('atom://config/install', { split: 'left' });
    }
  }, {
    key: "didClickThemesButton",
    value: function didClickThemesButton() {
      this.props.reporterProxy.sendEvent('clicked-themes-cta');
      atom.workspace.open('atom://config/themes', { split: 'left' });
    }
  }, {
    key: "didClickStylingButton",
    value: function didClickStylingButton() {
      this.props.reporterProxy.sendEvent('clicked-styling-cta');
      atom.workspace.open('atom://.atom/stylesheet', { split: 'left' });
    }
  }, {
    key: "didClickInitScriptButton",
    value: function didClickInitScriptButton() {
      this.props.reporterProxy.sendEvent('clicked-init-script-cta');
      atom.workspace.open('atom://.atom/init-script', { split: 'left' });
    }
  }, {
    key: "didClickSnippetsButton",
    value: function didClickSnippetsButton() {
      this.props.reporterProxy.sendEvent('clicked-snippets-cta');
      atom.workspace.open('atom://.atom/snippets', { split: 'left' });
    }
  }, {
    key: "didClickTeletypeButton",
    value: function didClickTeletypeButton() {
      this.props.reporterProxy.sendEvent('clicked-teletype-cta');
      atom.workspace.open('atom://config/packages/teletype', { split: 'left' });
    }
  }, {
    key: "didExpandOrCollapseSection",
    value: function didExpandOrCollapseSection(event) {
      var sectionName = event.currentTarget.closest('details').dataset.section;
      var action = event.currentTarget.hasAttribute('open') ? 'collapse' : 'expand';
      this.props.reporterProxy.sendEvent(action + "-" + sectionName + "-section");
    }
  }]);

  return GuideView;
})();

exports["default"] = GuideView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvd2VsY29tZS9saWIvZ3VpZGUtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7b0JBR2lCLE1BQU07Ozs7SUFFRixTQUFTO0FBQ2pCLFdBRFEsU0FBUyxDQUNoQixLQUFLLEVBQUU7MEJBREEsU0FBUzs7QUFFMUIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkUsUUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0QsUUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakUsUUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckUsUUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckUsUUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakUsUUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkUsUUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekUsUUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxD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QUssRUFBRTtBQUNoQyxVQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzNFLFVBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUNuRCxVQUFVLEdBQ1YsUUFBUSxDQUFDO0FBQ2IsVUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFJLE1BQU0sU0FBSSxXQUFXLGNBQVcsQ0FBQztLQUN4RTs7O1NBdGRrQixTQUFTOzs7cUJBQVQsU0FBUyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2plcHN0Ly5hdG9tL3BhY2thZ2VzL3dlbGNvbWUvbGliL2d1aWRlLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXHJcbi8qKiBAanN4IGV0Y2guZG9tICoqL1xyXG5cclxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZVZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XHJcbiAgICB0aGlzLmRpZENsaWNrUHJvamVjdEJ1dHRvbiA9IHRoaXMuZGlkQ2xpY2tQcm9qZWN0QnV0dG9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRpZENsaWNrR2l0QnV0dG9uID0gdGhpcy5kaWRDbGlja0dpdEJ1dHRvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kaWRDbGlja0dpdEh1YkJ1dHRvbiA9IHRoaXMuZGlkQ2xpY2tHaXRIdWJCdXR0b24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZGlkQ2xpY2tUZWxldHlwZUJ1dHRvbiA9IHRoaXMuZGlkQ2xpY2tUZWxldHlwZUJ1dHRvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kaWRDbGlja1BhY2thZ2VzQnV0dG9uID0gdGhpcy5kaWRDbGlja1BhY2thZ2VzQnV0dG9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRpZENsaWNrVGhlbWVzQnV0dG9uID0gdGhpcy5kaWRDbGlja1RoZW1lc0J1dHRvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kaWRDbGlja1N0eWxpbmdCdXR0b24gPSB0aGlzLmRpZENsaWNrU3R5bGluZ0J1dHRvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kaWRDbGlja0luaXRTY3JpcHRCdXR0b24gPSB0aGlzLmRpZENsaWNrSW5pdFNjcmlwdEJ1dHRvbi5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5kaWRDbGlja1NuaXBwZXRzQnV0dG9uID0gdGhpcy5kaWRDbGlja1NuaXBwZXRzQnV0dG9uLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRpZEV4cGFuZE9yQ29sbGFwc2VTZWN0aW9uID0gdGhpcy5kaWRFeHBhbmRPckNvbGxhcHNlU2VjdGlvbi5iaW5kKFxyXG4gICAgICB0aGlzXHJcbiAgICApO1xyXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge31cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lIGlzLWd1aWRlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwid2VsY29tZS1wYW5lbFwiPlxyXG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwid2VsY29tZS10aXRsZVwiPkdldCB0byBrbm93IEF0b20hPC9oMT5cclxuXHJcbiAgICAgICAgICAgIDxkZXRhaWxzXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2VsY29tZS1jYXJkXCJcclxuICAgICAgICAgICAgICB7Li4udGhpcy5nZXRTZWN0aW9uUHJvcHMoJ3Byb2plY3QnKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cIndlbGNvbWUtc3VtbWFyeSBpY29uIGljb24tcmVwb1wiPlxyXG4gICAgICAgICAgICAgICAgT3BlbiBhIDxzcGFuIGNsYXNzTmFtZT1cIndlbGNvbWUtaGlnaGxpZ2h0XCI+UHJvamVjdDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL3Byb2plY3Quc3ZnXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICBJbiBBdG9tIHlvdSBjYW4gb3BlbiBpbmRpdmlkdWFsIGZpbGVzIG9yIGEgd2hvbGUgZm9sZGVyIGFzIGFcclxuICAgICAgICAgICAgICAgICAgcHJvamVjdC4gT3BlbmluZyBhIGZvbGRlciB3aWxsIGFkZCBhIHRyZWUgdmlldyB0byB0aGUgZWRpdG9yXHJcbiAgICAgICAgICAgICAgICAgIHdoZXJlIHlvdSBjYW4gYnJvd3NlIGFsbCB0aGUgZmlsZXMuXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInByb2plY3RCdXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9e3RoaXMuZGlkQ2xpY2tQcm9qZWN0QnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBPcGVuIGEgUHJvamVjdFxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIndlbGNvbWUtbm90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPk5leHQgdGltZTo8L3N0cm9uZz4gWW91IGNhbiBhbHNvIG9wZW4gcHJvamVjdHMgZnJvbVxyXG4gICAgICAgICAgICAgICAgICB0aGUgbWVudSwga2V5Ym9hcmQgc2hvcnRjdXQgb3IgYnkgZHJhZ2dpbmcgYSBmb2xkZXIgb250byB0aGVcclxuICAgICAgICAgICAgICAgICAgQXRvbSBkb2NrIGljb24uXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGV0YWlscz5cclxuXHJcbiAgICAgICAgICAgIDxkZXRhaWxzIGNsYXNzTmFtZT1cIndlbGNvbWUtY2FyZFwiIHsuLi50aGlzLmdldFNlY3Rpb25Qcm9wcygnZ2l0Jyl9PlxyXG4gICAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cIndlbGNvbWUtc3VtbWFyeSBpY29uIGljb24tbWFyay1naXRodWJcIj5cclxuICAgICAgICAgICAgICAgIFZlcnNpb24gY29udHJvbCB3aXRoeycgJ31cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwid2VsY29tZS1oaWdobGlnaHRcIj5HaXQgYW5kIEdpdEh1Yjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL3BhY2thZ2Uuc3ZnXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICBUcmFjayBjaGFuZ2VzIHRvIHlvdXIgY29kZSBhcyB5b3Ugd29yay4gQnJhbmNoLCBjb21taXQsIHB1c2gsXHJcbiAgICAgICAgICAgICAgICAgIGFuZCBwdWxsIHdpdGhvdXQgbGVhdmluZyB0aGUgY29tZm9ydCBvZiB5b3VyIGVkaXRvci5cclxuICAgICAgICAgICAgICAgICAgQ29sbGFib3JhdGUgd2l0aCBvdGhlciBkZXZlbG9wZXJzIG9uIEdpdEh1Yi5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgb25jbGljaz17dGhpcy5kaWRDbGlja0dpdEJ1dHRvbn1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgaW5saW5lLWJsb2NrXCJcclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIE9wZW4gdGhlIEdpdCBwYW5lbFxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9e3RoaXMuZGlkQ2xpY2tHaXRIdWJCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGlubGluZS1ibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBPcGVuIHRoZSBHaXRIdWIgcGFuZWxcclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ3ZWxjb21lLW5vdGVcIj5cclxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz5OZXh0IHRpbWU6PC9zdHJvbmc+IFlvdSBjYW4gdG9nZ2xlIHRoZSBHaXQgdGFiIGJ5XHJcbiAgICAgICAgICAgICAgICAgIGNsaWNraW5nIG9uIHRoZVxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tZGlmZlwiIC8+IGJ1dHRvbiBpbiB5b3VyIHN0YXR1cyBiYXIuXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGV0YWlscz5cclxuXHJcbiAgICAgICAgICAgIDxkZXRhaWxzXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2VsY29tZS1jYXJkXCJcclxuICAgICAgICAgICAgICB7Li4udGhpcy5nZXRTZWN0aW9uUHJvcHMoJ3RlbGV0eXBlJyl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8c3VtbWFyeSBjbGFzc05hbWU9XCJ3ZWxjb21lLXN1bW1hcnkgaWNvbiBpY29uLXJhZGlvLXRvd2VyXCI+XHJcbiAgICAgICAgICAgICAgICBDb2xsYWJvcmF0ZSBpbiByZWFsIHRpbWUgd2l0aHsnICd9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIndlbGNvbWUtaGlnaGxpZ2h0XCI+VGVsZXR5cGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2VsY29tZS1kZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2VsY29tZS1pbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgIHNyYz1cImF0b206Ly93ZWxjb21lL2Fzc2V0cy9jb2RlLnN2Z1wiXHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgU2hhcmUgeW91ciB3b3Jrc3BhY2Ugd2l0aCB0ZWFtIG1lbWJlcnMgYW5kIGNvbGxhYm9yYXRlIG9uIGNvZGVcclxuICAgICAgICAgICAgICAgICAgaW4gcmVhbCB0aW1lLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXt0aGlzLmRpZENsaWNrVGVsZXR5cGVCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGlubGluZS1ibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBJbnN0YWxsIFRlbGV0eXBlIGZvciBBdG9tXHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2RldGFpbHM+XHJcblxyXG4gICAgICAgICAgICA8ZGV0YWlsc1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlbGNvbWUtY2FyZFwiXHJcbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0U2VjdGlvblByb3BzKCdwYWNrYWdlcycpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwid2VsY29tZS1zdW1tYXJ5IGljb24gaWNvbi1wYWNrYWdlXCI+XHJcbiAgICAgICAgICAgICAgICBJbnN0YWxsIGEgPHNwYW4gY2xhc3NOYW1lPVwid2VsY29tZS1oaWdobGlnaHRcIj5QYWNrYWdlPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGNvbWUtZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlbGNvbWUtaW1nXCJcclxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJhdG9tOi8vd2VsY29tZS9hc3NldHMvcGFja2FnZS5zdmdcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIE9uZSBvZiB0aGUgYmVzdCB0aGluZ3MgYWJvdXQgQXRvbSBpcyB0aGUgcGFja2FnZSBlY29zeXN0ZW0uXHJcbiAgICAgICAgICAgICAgICAgIEluc3RhbGxpbmcgcGFja2FnZXMgYWRkcyBuZXcgZmVhdHVyZXMgYW5kIGZ1bmN0aW9uYWxpdHkgeW91XHJcbiAgICAgICAgICAgICAgICAgIGNhbiB1c2UgdG8gbWFrZSB0aGUgZWRpdG9yIHN1aXQgeW91ciBuZWVkcy4gTGV0J3MgaW5zdGFsbCBvbmUuXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj1cInBhY2thZ2VzQnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXt0aGlzLmRpZENsaWNrUGFja2FnZXNCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIE9wZW4gSW5zdGFsbGVyXHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwid2VsY29tZS1ub3RlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzdHJvbmc+TmV4dCB0aW1lOjwvc3Ryb25nPiBZb3UgY2FuIGluc3RhbGwgbmV3IHBhY2thZ2VzIGZyb21cclxuICAgICAgICAgICAgICAgICAgdGhlIHNldHRpbmdzLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2RldGFpbHM+XHJcblxyXG4gICAgICAgICAgICA8ZGV0YWlsc1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlbGNvbWUtY2FyZFwiXHJcbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0U2VjdGlvblByb3BzKCd0aGVtZXMnKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cIndlbGNvbWUtc3VtbWFyeSBpY29uIGljb24tcGFpbnRjYW5cIj5cclxuICAgICAgICAgICAgICAgIENob29zZSBhIDxzcGFuIGNsYXNzPVwid2VsY29tZS1oaWdobGlnaHRcIj5UaGVtZTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL3RoZW1lLnN2Z1wiXHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5BdG9tIGNvbWVzIHdpdGggcHJlaW5zdGFsbGVkIHRoZW1lcy4gTGV0J3MgdHJ5IGEgZmV3LjwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPVwidGhlbWVzQnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXt0aGlzLmRpZENsaWNrVGhlbWVzQnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBPcGVuIHRoZSB0aGVtZSBwaWNrZXJcclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgWW91IGNhbiBhbHNvIGluc3RhbGwgdGhlbWVzIGNyZWF0ZWQgYnkgdGhlIEF0b20gY29tbXVuaXR5LiBUb1xyXG4gICAgICAgICAgICAgICAgICBpbnN0YWxsIG5ldyB0aGVtZXMsIGNsaWNrIG9uIFwiKyBJbnN0YWxsXCIgYW5kIHN3aXRjaCB0aGUgdG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAgIHRvIFwidGhlbWVzXCIuXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ3ZWxjb21lLW5vdGVcIj5cclxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz5OZXh0IHRpbWU6PC9zdHJvbmc+IFlvdSBjYW4gc3dpdGNoIHRoZW1lcyBmcm9tIHRoZVxyXG4gICAgICAgICAgICAgICAgICBzZXR0aW5ncy5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kZXRhaWxzPlxyXG5cclxuICAgICAgICAgICAgPGRldGFpbHNcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWNhcmRcIlxyXG4gICAgICAgICAgICAgIHsuLi50aGlzLmdldFNlY3Rpb25Qcm9wcygnc3R5bGluZycpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwid2VsY29tZS1zdW1tYXJ5IGljb24gaWNvbi1wYWludGNhblwiPlxyXG4gICAgICAgICAgICAgICAgQ3VzdG9taXplIHRoZSA8c3BhbiBjbGFzcz1cIndlbGNvbWUtaGlnaGxpZ2h0XCI+U3R5bGluZzwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL2NvZGUuc3ZnXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICBZb3UgY2FuIGN1c3RvbWl6ZSBhbG1vc3QgYW55dGhpbmcgYnkgYWRkaW5nIHlvdXIgb3duIENTUy9MRVNTLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICByZWY9XCJzdHlsaW5nQnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXt0aGlzLmRpZENsaWNrU3R5bGluZ0J1dHRvbn1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgT3BlbiB5b3VyIFN0eWxlc2hlZXRcclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Ob3cgdW5jb21tZW50IHNvbWUgb2YgdGhlIGV4YW1wbGVzIG9yIHRyeSB5b3VyIG93bjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIndlbGNvbWUtbm90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPk5leHQgdGltZTo8L3N0cm9uZz4gWW91IGNhbiBvcGVuIHlvdXIgc3R5bGVzaGVldCBmcm9tXHJcbiAgICAgICAgICAgICAgICAgIE1lbnUge3RoaXMuZ2V0QXBwbGljYXRpb25NZW51TmFtZSgpfS5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kZXRhaWxzPlxyXG5cclxuICAgICAgICAgICAgPGRldGFpbHNcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWNhcmRcIlxyXG4gICAgICAgICAgICAgIHsuLi50aGlzLmdldFNlY3Rpb25Qcm9wcygnaW5pdC1zY3JpcHQnKX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzTmFtZT1cIndlbGNvbWUtc3VtbWFyeSBpY29uIGljb24tY29kZVwiPlxyXG4gICAgICAgICAgICAgICAgSGFjayBvbiB0aGUgPHNwYW4gY2xhc3M9XCJ3ZWxjb21lLWhpZ2hsaWdodFwiPkluaXQgU2NyaXB0PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGNvbWUtZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlbGNvbWUtaW1nXCJcclxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJhdG9tOi8vd2VsY29tZS9hc3NldHMvY29kZS5zdmdcIlxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIFRoZSBpbml0IHNjcmlwdCBpcyBhIGJpdCBvZiBKYXZhU2NyaXB0IG9yIENvZmZlZVNjcmlwdCBydW4gYXRcclxuICAgICAgICAgICAgICAgICAgc3RhcnR1cC4gWW91IGNhbiB1c2UgaXQgdG8gcXVpY2tseSBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZlxyXG4gICAgICAgICAgICAgICAgICBBdG9tLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICByZWY9XCJpbml0U2NyaXB0QnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXt0aGlzLmRpZENsaWNrSW5pdFNjcmlwdEJ1dHRvbn1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgT3BlbiB5b3VyIEluaXQgU2NyaXB0XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+VW5jb21tZW50IHNvbWUgb2YgdGhlIGV4YW1wbGVzIG9yIHRyeSBvdXQgeW91ciBvd24uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwid2VsY29tZS1ub3RlXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzdHJvbmc+TmV4dCB0aW1lOjwvc3Ryb25nPiBZb3UgY2FuIG9wZW4geW91ciBpbml0IHNjcmlwdCBmcm9tXHJcbiAgICAgICAgICAgICAgICAgIE1lbnUgPiB7dGhpcy5nZXRBcHBsaWNhdGlvbk1lbnVOYW1lKCl9LlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2RldGFpbHM+XHJcblxyXG4gICAgICAgICAgICA8ZGV0YWlsc1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlbGNvbWUtY2FyZFwiXHJcbiAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0U2VjdGlvblByb3BzKCdzbmlwcGV0cycpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwid2VsY29tZS1zdW1tYXJ5IGljb24gaWNvbi1jb2RlXCI+XHJcbiAgICAgICAgICAgICAgICBBZGQgYSA8c3BhbiBjbGFzcz1cIndlbGNvbWUtaGlnaGxpZ2h0XCI+U25pcHBldDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL2NvZGUuc3ZnXCJcclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICBBdG9tIHNuaXBwZXRzIGFsbG93IHlvdSB0byBlbnRlciBhIHNpbXBsZSBwcmVmaXggaW4gdGhlIGVkaXRvclxyXG4gICAgICAgICAgICAgICAgICBhbmQgaGl0IHRhYiB0byBleHBhbmQgdGhlIHByZWZpeCBpbnRvIGEgbGFyZ2VyIGNvZGUgYmxvY2sgd2l0aFxyXG4gICAgICAgICAgICAgICAgICB0ZW1wbGF0ZWQgdmFsdWVzLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICByZWY9XCJzbmlwcGV0c0J1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25jbGljaz17dGhpcy5kaWRDbGlja1NuaXBwZXRzQnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICBPcGVuIHlvdXIgU25pcHBldHNcclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgSW4geW91ciBzbmlwcGV0cyBmaWxlLCB0eXBlIDxjb2RlPnNuaXA8L2NvZGU+IHRoZW4gaGl0eycgJ31cclxuICAgICAgICAgICAgICAgICAgPGNvZGU+dGFiPC9jb2RlPi4gVGhlIDxjb2RlPnNuaXA8L2NvZGU+IHNuaXBwZXQgd2lsbCBleHBhbmQgdG9cclxuICAgICAgICAgICAgICAgICAgY3JlYXRlIGEgc25pcHBldCFcclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIndlbGNvbWUtbm90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPk5leHQgdGltZTo8L3N0cm9uZz4gWW91IGNhbiBvcGVuIHlvdXIgc25pcHBldHMgaW4gTWVudVxyXG4gICAgICAgICAgICAgICAgICA+IHt0aGlzLmdldEFwcGxpY2F0aW9uTWVudU5hbWUoKX0uXHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGV0YWlscz5cclxuXHJcbiAgICAgICAgICAgIDxkZXRhaWxzXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwid2VsY29tZS1jYXJkXCJcclxuICAgICAgICAgICAgICB7Li4udGhpcy5nZXRTZWN0aW9uUHJvcHMoJ3Nob3J0Y3V0cycpfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHN1bW1hcnkgY2xhc3NOYW1lPVwid2VsY29tZS1zdW1tYXJ5IGljb24gaWNvbi1rZXlib2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgTGVhcm4gPHNwYW4gY2xhc3M9XCJ3ZWxjb21lLWhpZ2hsaWdodFwiPktleWJvYXJkIFNob3J0Y3V0czwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxjb21lLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3ZWxjb21lLWltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiYXRvbTovL3dlbGNvbWUvYXNzZXRzL3Nob3J0Y3V0LnN2Z1wiXHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgSWYgeW91IG9ubHkgcmVtZW1iZXIgb25lIGtleWJvYXJkIHNob3J0Y3V0IG1ha2UgaXR7JyAnfVxyXG4gICAgICAgICAgICAgICAgICA8a2JkIGNsYXNzTmFtZT1cIndlbGNvbWUta2V5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0Q29tbWFuZFBhbGV0dGVLZXlCaW5kaW5nKCl9XHJcbiAgICAgICAgICAgICAgICAgIDwva2JkPlxyXG4gICAgICAgICAgICAgICAgICAuIFRoaXMga2V5c3Ryb2tlIHRvZ2dsZXMgdGhlIGNvbW1hbmQgcGFsZXR0ZSwgd2hpY2ggbGlzdHNcclxuICAgICAgICAgICAgICAgICAgZXZlcnkgQXRvbSBjb21tYW5kLiBJdCdzIGEgZ29vZCB3YXkgdG8gbGVhcm4gbW9yZSBzaG9ydGN1dHMuXHJcbiAgICAgICAgICAgICAgICAgIFllcywgeW91IGNhbiB0cnkgaXQgbm93IVxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgIElmIHlvdSB3YW50IHRvIHVzZSB0aGVzZSBndWlkZXMgYWdhaW4gdXNlIHRoZSBjb21tYW5kIHBhbGV0dGV7JyAnfVxyXG4gICAgICAgICAgICAgICAgICA8a2JkIGNsYXNzTmFtZT1cIndlbGNvbWUta2V5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0Q29tbWFuZFBhbGV0dGVLZXlCaW5kaW5nKCl9XHJcbiAgICAgICAgICAgICAgICAgIDwva2JkPnsnICd9XHJcbiAgICAgICAgICAgICAgICAgIGFuZCBzZWFyY2ggZm9yIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaGlnaGxpZ2h0XCI+V2VsY29tZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgLlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2RldGFpbHM+XHJcbiAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFNlY3Rpb25Qcm9wcyhzZWN0aW9uTmFtZSkge1xyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIGRhdGFzZXQ6IHsgc2VjdGlvbjogc2VjdGlvbk5hbWUgfSxcclxuICAgICAgb25jbGljazogdGhpcy5kaWRFeHBhbmRPckNvbGxhcHNlU2VjdGlvblxyXG4gICAgfTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5wcm9wcy5vcGVuU2VjdGlvbnMgJiZcclxuICAgICAgdGhpcy5wcm9wcy5vcGVuU2VjdGlvbnMuaW5kZXhPZihzZWN0aW9uTmFtZSkgIT09IC0xXHJcbiAgICApIHtcclxuICAgICAgcHJvcHMub3BlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJvcHM7XHJcbiAgfVxyXG5cclxuICBnZXRDb21tYW5kUGFsZXR0ZUtleUJpbmRpbmcoKSB7XHJcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcclxuICAgICAgcmV0dXJuICdjbWQtc2hpZnQtcCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ2N0cmwtc2hpZnQtcCc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRBcHBsaWNhdGlvbk1lbnVOYW1lKCkge1xyXG4gICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XHJcbiAgICAgIHJldHVybiAnQXRvbSc7XHJcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcclxuICAgICAgcmV0dXJuICdFZGl0JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnRmlsZSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkZXNlcmlhbGl6ZXI6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcclxuICAgICAgb3BlblNlY3Rpb25zOiB0aGlzLmdldE9wZW5TZWN0aW9ucygpLFxyXG4gICAgICB1cmk6IHRoaXMuZ2V0VVJJKClcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRVUkkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy51cmk7XHJcbiAgfVxyXG5cclxuICBnZXRUaXRsZSgpIHtcclxuICAgIHJldHVybiAnV2VsY29tZSBHdWlkZSc7XHJcbiAgfVxyXG5cclxuICBpc0VxdWFsKG90aGVyKSB7XHJcbiAgICByZXR1cm4gb3RoZXIgaW5zdGFuY2VvZiBHdWlkZVZpZXc7XHJcbiAgfVxyXG5cclxuICBnZXRPcGVuU2VjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGV0YWlsc1tvcGVuXScpKS5tYXAoXHJcbiAgICAgIHNlY3Rpb25FbGVtZW50ID0+IHNlY3Rpb25FbGVtZW50LmRhdGFzZXQuc2VjdGlvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRpZENsaWNrUHJvamVjdEJ1dHRvbigpIHtcclxuICAgIHRoaXMucHJvcHMucmVwb3J0ZXJQcm94eS5zZW5kRXZlbnQoJ2NsaWNrZWQtcHJvamVjdC1jdGEnKTtcclxuICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2goXHJcbiAgICAgIGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSksXHJcbiAgICAgICdhcHBsaWNhdGlvbjpvcGVuJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRpZENsaWNrR2l0QnV0dG9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudCgnY2xpY2tlZC1naXQtY3RhJyk7XHJcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKFxyXG4gICAgICBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpLFxyXG4gICAgICAnZ2l0aHViOnRvZ2dsZS1naXQtdGFiJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRpZENsaWNrR2l0SHViQnV0dG9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudCgnY2xpY2tlZC1naXRodWItY3RhJyk7XHJcbiAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKFxyXG4gICAgICBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpLFxyXG4gICAgICAnZ2l0aHViOnRvZ2dsZS1naXRodWItdGFiJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRpZENsaWNrUGFja2FnZXNCdXR0b24oKSB7XHJcbiAgICB0aGlzLnByb3BzLnJlcG9ydGVyUHJveHkuc2VuZEV2ZW50KCdjbGlja2VkLXBhY2thZ2VzLWN0YScpO1xyXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbignYXRvbTovL2NvbmZpZy9pbnN0YWxsJywgeyBzcGxpdDogJ2xlZnQnIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlkQ2xpY2tUaGVtZXNCdXR0b24oKSB7XHJcbiAgICB0aGlzLnByb3BzLnJlcG9ydGVyUHJveHkuc2VuZEV2ZW50KCdjbGlja2VkLXRoZW1lcy1jdGEnKTtcclxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oJ2F0b206Ly9jb25maWcvdGhlbWVzJywgeyBzcGxpdDogJ2xlZnQnIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlkQ2xpY2tTdHlsaW5nQnV0dG9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudCgnY2xpY2tlZC1zdHlsaW5nLWN0YScpO1xyXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbignYXRvbTovLy5hdG9tL3N0eWxlc2hlZXQnLCB7IHNwbGl0OiAnbGVmdCcgfSk7XHJcbiAgfVxyXG5cclxuICBkaWRDbGlja0luaXRTY3JpcHRCdXR0b24oKSB7XHJcbiAgICB0aGlzLnByb3BzLnJlcG9ydGVyUHJveHkuc2VuZEV2ZW50KCdjbGlja2VkLWluaXQtc2NyaXB0LWN0YScpO1xyXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbignYXRvbTovLy5hdG9tL2luaXQtc2NyaXB0JywgeyBzcGxpdDogJ2xlZnQnIH0pO1xyXG4gIH1cclxuXHJcbiAgZGlkQ2xpY2tTbmlwcGV0c0J1dHRvbigpIHtcclxuICAgIHRoaXMucHJvcHMucmVwb3J0ZXJQcm94eS5zZW5kRXZlbnQoJ2NsaWNrZWQtc25pcHBldHMtY3RhJyk7XHJcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKCdhdG9tOi8vLmF0b20vc25pcHBldHMnLCB7IHNwbGl0OiAnbGVmdCcgfSk7XHJcbiAgfVxyXG5cclxuICBkaWRDbGlja1RlbGV0eXBlQnV0dG9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudCgnY2xpY2tlZC10ZWxldHlwZS1jdGEnKTtcclxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oJ2F0b206Ly9jb25maWcvcGFja2FnZXMvdGVsZXR5cGUnLCB7IHNwbGl0OiAnbGVmdCcgfSk7XHJcbiAgfVxyXG5cclxuICBkaWRFeHBhbmRPckNvbGxhcHNlU2VjdGlvbihldmVudCkge1xyXG4gICAgY29uc3Qgc2VjdGlvbk5hbWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJ2RldGFpbHMnKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgICBjb25zdCBhY3Rpb24gPSBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnb3BlbicpXHJcbiAgICAgID8gJ2NvbGxhcHNlJ1xyXG4gICAgICA6ICdleHBhbmQnO1xyXG4gICAgdGhpcy5wcm9wcy5yZXBvcnRlclByb3h5LnNlbmRFdmVudChgJHthY3Rpb259LSR7c2VjdGlvbk5hbWV9LXNlY3Rpb25gKTtcclxuICB9XHJcbn1cclxuIl19