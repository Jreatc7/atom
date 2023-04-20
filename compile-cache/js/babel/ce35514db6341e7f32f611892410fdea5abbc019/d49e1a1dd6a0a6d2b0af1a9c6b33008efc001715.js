Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/** @babel */
/** @jsx etch.dom */

var _underscorePlus = require('underscore-plus');

var _underscorePlus2 = _interopRequireDefault(_underscorePlus);

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _fsPlus = require('fs-plus');

var _fsPlus2 = _interopRequireDefault(_fsPlus);

var _grim = require('grim');

var _grim2 = _interopRequireDefault(_grim);

var _marked = require('marked');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electron = require('electron');

var DeprecationCopView = (function () {
  function DeprecationCopView(_ref) {
    var _this = this;

    var uri = _ref.uri;

    _classCallCheck(this, DeprecationCopView);

    this.uri = uri;
    this.subscriptions = new _atom.CompositeDisposable();
    this.subscriptions.add(_grim2['default'].on('updated', function () {
      _etch2['default'].update(_this);
    }));
    // TODO: Remove conditional when the new StyleManager deprecation APIs reach stable.
    if (atom.styles.onDidUpdateDeprecations) {
      this.subscriptions.add(atom.styles.onDidUpdateDeprecations(function () {
        _etch2['default'].update(_this);
      }));
    }
    _etch2['default'].initialize(this);
    this.subscriptions.add(atom.commands.add(this.element, {
      'core:move-up': function coreMoveUp() {
        _this.scrollUp();
      },
      'core:move-down': function coreMoveDown() {
        _this.scrollDown();
      },
      'core:page-up': function corePageUp() {
        _this.pageUp();
      },
      'core:page-down': function corePageDown() {
        _this.pageDown();
      },
      'core:move-to-top': function coreMoveToTop() {
        _this.scrollToTop();
      },
      'core:move-to-bottom': function coreMoveToBottom() {
        _this.scrollToBottom();
      }
    }));
  }

  _createClass(DeprecationCopView, [{
    key: 'serialize',
    value: function serialize() {
      return {
        deserializer: this.constructor.name,
        uri: this.getURI(),
        version: 1
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.subscriptions.dispose();
      return _etch2['default'].destroy(this);
    }
  }, {
    key: 'update',
    value: function update() {
      return _etch2['default'].update(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _etch2['default'].dom(
        'div',
        {
          className: 'deprecation-cop pane-item native-key-bindings',
          tabIndex: '-1'
        },
        _etch2['default'].dom(
          'div',
          { className: 'panel' },
          _etch2['default'].dom(
            'div',
            { className: 'padded deprecation-overview' },
            _etch2['default'].dom(
              'div',
              { className: 'pull-right btn-group' },
              _etch2['default'].dom(
                'button',
                {
                  className: 'btn btn-primary check-for-update',
                  onclick: function (event) {
                    event.preventDefault();
                    _this2.checkForUpdates();
                  }
                },
                'Check for Updates'
              )
            )
          ),
          _etch2['default'].dom(
            'div',
            { className: 'panel-heading' },
            _etch2['default'].dom(
              'span',
              null,
              'Deprecated calls'
            )
          ),
          _etch2['default'].dom(
            'ul',
            { className: 'list-tree has-collapsable-children' },
            this.renderDeprecatedCalls()
          ),
          _etch2['default'].dom(
            'div',
            { className: 'panel-heading' },
            _etch2['default'].dom(
              'span',
              null,
              'Deprecated selectors'
            )
          ),
          _etch2['default'].dom(
            'ul',
            { className: 'selectors list-tree has-collapsable-children' },
            this.renderDeprecatedSelectors()
          )
        )
      );
    }
  }, {
    key: 'renderDeprecatedCalls',
    value: function renderDeprecatedCalls() {
      var _this3 = this;

      var deprecationsByPackageName = this.getDeprecatedCallsByPackageName();
      var packageNames = Object.keys(deprecationsByPackageName);
      if (packageNames.length === 0) {
        return _etch2['default'].dom(
          'li',
          { className: 'list-item' },
          'No deprecated calls'
        );
      } else {
        return packageNames.sort().map(function (packageName) {
          return _etch2['default'].dom(
            'li',
            { className: 'deprecation list-nested-item collapsed' },
            _etch2['default'].dom(
              'div',
              {
                className: 'deprecation-info list-item',
                onclick: function (event) {
                  return event.target.parentElement.classList.toggle('collapsed');
                }
              },
              _etch2['default'].dom(
                'span',
                { className: 'text-highlight' },
                packageName || 'atom core'
              ),
              _etch2['default'].dom(
                'span',
                null,
                ' (' + _underscorePlus2['default'].pluralize(deprecationsByPackageName[packageName].length, 'deprecation') + ')'
              )
            ),
            _etch2['default'].dom(
              'ul',
              { className: 'list' },
              _this3.renderPackageActionsIfNeeded(packageName),
              deprecationsByPackageName[packageName].map(function (_ref2) {
                var deprecation = _ref2.deprecation;
                var stack = _ref2.stack;
                return _etch2['default'].dom(
                  'li',
                  { className: 'list-item deprecation-detail' },
                  _etch2['default'].dom('span', { className: 'text-warning icon icon-alert' }),
                  _etch2['default'].dom('div', {
                    className: 'list-item deprecation-message',
                    innerHTML: (0, _marked.marked)(deprecation.getMessage())
                  }),
                  _this3.renderIssueURLIfNeeded(packageName, deprecation, _this3.buildIssueURL(packageName, deprecation, stack)),
                  _etch2['default'].dom(
                    'div',
                    { className: 'stack-trace' },
                    stack.map(function (_ref3) {
                      var functionName = _ref3.functionName;
                      var location = _ref3.location;
                      return _etch2['default'].dom(
                        'div',
                        { className: 'stack-line' },
                        _etch2['default'].dom(
                          'span',
                          null,
                          functionName
                        ),
                        _etch2['default'].dom(
                          'span',
                          null,
                          ' - '
                        ),
                        _etch2['default'].dom(
                          'a',
                          {
                            className: 'stack-line-location',
                            href: location,
                            onclick: function (event) {
                              event.preventDefault();
                              _this3.openLocation(location);
                            }
                          },
                          location
                        )
                      );
                    })
                  )
                );
              })
            )
          );
        });
      }
    }
  }, {
    key: 'renderDeprecatedSelectors',
    value: function renderDeprecatedSelectors() {
      var _this4 = this;

      var deprecationsByPackageName = this.getDeprecatedSelectorsByPackageName();
      var packageNames = Object.keys(deprecationsByPackageName);
      if (packageNames.length === 0) {
        return _etch2['default'].dom(
          'li',
          { className: 'list-item' },
          'No deprecated selectors'
        );
      } else {
        return packageNames.map(function (packageName) {
          return _etch2['default'].dom(
            'li',
            { className: 'deprecation list-nested-item collapsed' },
            _etch2['default'].dom(
              'div',
              {
                className: 'deprecation-info list-item',
                onclick: function (event) {
                  return event.target.parentElement.classList.toggle('collapsed');
                }
              },
              _etch2['default'].dom(
                'span',
                { className: 'text-highlight' },
                packageName
              )
            ),
            _etch2['default'].dom(
              'ul',
              { className: 'list' },
              _this4.renderPackageActionsIfNeeded(packageName),
              deprecationsByPackageName[packageName].map(function (_ref4) {
                var packagePath = _ref4.packagePath;
                var sourcePath = _ref4.sourcePath;
                var deprecation = _ref4.deprecation;

                var relativeSourcePath = _path2['default'].relative(packagePath, sourcePath);
                var issueTitle = 'Deprecated selector in `' + relativeSourcePath + '`';
                var issueBody = 'In `' + relativeSourcePath + '`: \n\n' + deprecation.message;
                return _etch2['default'].dom(
                  'li',
                  { className: 'list-item source-file' },
                  _etch2['default'].dom(
                    'a',
                    {
                      className: 'source-url',
                      href: sourcePath,
                      onclick: function (event) {
                        event.preventDefault();
                        _this4.openLocation(sourcePath);
                      }
                    },
                    relativeSourcePath
                  ),
                  _etch2['default'].dom(
                    'ul',
                    { className: 'list' },
                    _etch2['default'].dom(
                      'li',
                      { className: 'list-item deprecation-detail' },
                      _etch2['default'].dom('span', { className: 'text-warning icon icon-alert' }),
                      _etch2['default'].dom('div', {
                        className: 'list-item deprecation-message',
                        innerHTML: (0, _marked.marked)(deprecation.message)
                      }),
                      _this4.renderSelectorIssueURLIfNeeded(packageName, issueTitle, issueBody)
                    )
                  )
                );
              })
            )
          );
        });
      }
    }
  }, {
    key: 'renderPackageActionsIfNeeded',
    value: function renderPackageActionsIfNeeded(packageName) {
      var _this5 = this;

      if (packageName && atom.packages.getLoadedPackage(packageName)) {
        return _etch2['default'].dom(
          'div',
          { className: 'padded' },
          _etch2['default'].dom(
            'div',
            { className: 'btn-group' },
            _etch2['default'].dom(
              'button',
              {
                className: 'btn check-for-update',
                onclick: function (event) {
                  event.preventDefault();
                  _this5.checkForUpdates();
                }
              },
              'Check for Update'
            ),
            _etch2['default'].dom(
              'button',
              {
                className: 'btn disable-package',
                'data-package-name': packageName,
                onclick: function (event) {
                  event.preventDefault();
                  _this5.disablePackage(packageName);
                }
              },
              'Disable Package'
            )
          )
        );
      } else {
        return '';
      }
    }
  }, {
    key: 'encodeURI',
    value: (function (_encodeURI) {
      function encodeURI(_x) {
        return _encodeURI.apply(this, arguments);
      }

      encodeURI.toString = function () {
        return _encodeURI.toString();
      };

      return encodeURI;
    })(function (str) {
      return encodeURI(str).replace(/#/g, '%23').replace(/;/g, '%3B').replace(/%20/g, '+');
    })
  }, {
    key: 'renderSelectorIssueURLIfNeeded',
    value: function renderSelectorIssueURLIfNeeded(packageName, issueTitle, issueBody) {
      var _this6 = this;

      var repoURL = this.getRepoURL(packageName);
      if (repoURL) {
        var _ret = (function () {
          var issueURL = repoURL + '/issues/new?title=' + _this6.encodeURI(issueTitle) + '&body=' + _this6.encodeURI(issueBody);
          return {
            v: _etch2['default'].dom(
              'div',
              { className: 'btn-toolbar' },
              _etch2['default'].dom(
                'button',
                {
                  className: 'btn issue-url',
                  'data-issue-title': issueTitle,
                  'data-repo-url': repoURL,
                  'data-issue-url': issueURL,
                  onclick: function (event) {
                    event.preventDefault();
                    _this6.openIssueURL(repoURL, issueURL, issueTitle);
                  }
                },
                'Report Issue'
              )
            )
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      } else {
        return '';
      }
    }
  }, {
    key: 'renderIssueURLIfNeeded',
    value: function renderIssueURLIfNeeded(packageName, deprecation, issueURL) {
      var _this7 = this;

      if (packageName && issueURL) {
        var _ret2 = (function () {
          var repoURL = _this7.getRepoURL(packageName);
          var issueTitle = deprecation.getOriginName() + ' is deprecated.';
          return {
            v: _etch2['default'].dom(
              'div',
              { className: 'btn-toolbar' },
              _etch2['default'].dom(
                'button',
                {
                  className: 'btn issue-url',
                  'data-issue-title': issueTitle,
                  'data-repo-url': repoURL,
                  'data-issue-url': issueURL,
                  onclick: function (event) {
                    event.preventDefault();
                    _this7.openIssueURL(repoURL, issueURL, issueTitle);
                  }
                },
                'Report Issue'
              )
            )
          };
        })();

        if (typeof _ret2 === 'object') return _ret2.v;
      } else {
        return '';
      }
    }
  }, {
    key: 'buildIssueURL',
    value: function buildIssueURL(packageName, deprecation, stack) {
      var repoURL = this.getRepoURL(packageName);
      if (repoURL) {
        var title = deprecation.getOriginName() + ' is deprecated.';
        var stacktrace = stack.map(function (_ref5) {
          var functionName = _ref5.functionName;
          var location = _ref5.location;
          return functionName + ' (' + location + ')';
        }).join('\n');
        var body = deprecation.getMessage() + '\n```\n' + stacktrace + '\n```';
        return repoURL + '/issues/new?title=' + encodeURI(title) + '&body=' + encodeURI(body);
      } else {
        return null;
      }
    }
  }, {
    key: 'openIssueURL',
    value: _asyncToGenerator(function* (repoURL, issueURL, issueTitle) {
      var issue = yield this.findSimilarIssue(repoURL, issueTitle);
      if (issue) {
        _electron.shell.openExternal(issue.html_url);
      } else if (process.platform === 'win32') {
        // Windows will not launch URLs greater than ~2000 bytes so we need to shrink it
        _electron.shell.openExternal((yield this.shortenURL(issueURL)) || issueURL);
      } else {
        _electron.shell.openExternal(issueURL);
      }
    })
  }, {
    key: 'findSimilarIssue',
    value: _asyncToGenerator(function* (repoURL, issueTitle) {
      var url = 'https://api.github.com/search/issues';
      var repo = repoURL.replace(/http(s)?:\/\/(\d+\.)?github.com\//gi, '');
      var query = issueTitle + ' repo:' + repo;
      var response = yield window.fetch(url + '?q=' + encodeURI(query) + '&sort=created', {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        var data = yield response.json();
        if (data.items) {
          var issues = {};
          for (var issue of data.items) {
            if (issue.title.includes(issueTitle) && !issues[issue.state]) {
              issues[issue.state] = issue;
            }
          }

          return issues.open || issues.closed;
        }
      }
    })
  }, {
    key: 'shortenURL',
    value: _asyncToGenerator(function* (url) {
      var encodedUrl = encodeURIComponent(url).substr(0, 5000); // is.gd has 5000 char limit
      var incompletePercentEncoding = encodedUrl.indexOf('%', encodedUrl.length - 2);
      if (incompletePercentEncoding >= 0) {
        // Handle an incomplete % encoding cut-off
        encodedUrl = encodedUrl.substr(0, incompletePercentEncoding);
      }

      var result = yield fetch('https://is.gd/create.php?format=simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'url=' + encodedUrl
      });

      return result.text();
    })
  }, {
    key: 'getRepoURL',
    value: function getRepoURL(packageName) {
      var loadedPackage = atom.packages.getLoadedPackage(packageName);
      if (loadedPackage && loadedPackage.metadata && loadedPackage.metadata.repository) {
        var url = loadedPackage.metadata.repository.url || loadedPackage.metadata.repository;
        return url.replace(/\.git$/, '');
      } else {
        return null;
      }
    }
  }, {
    key: 'getDeprecatedCallsByPackageName',
    value: function getDeprecatedCallsByPackageName() {
      var deprecatedCalls = _grim2['default'].getDeprecations();
      deprecatedCalls.sort(function (a, b) {
        return b.getCallCount() - a.getCallCount();
      });
      var deprecatedCallsByPackageName = {};
      for (var deprecation of deprecatedCalls) {
        var stacks = deprecation.getStacks();
        stacks.sort(function (a, b) {
          return b.callCount - a.callCount;
        });
        for (var stack of stacks) {
          var packageName = null;
          if (stack.metadata && stack.metadata.packageName) {
            packageName = stack.metadata.packageName;
          } else {
            packageName = (this.getPackageName(stack) || '').toLowerCase();
          }

          deprecatedCallsByPackageName[packageName] = deprecatedCallsByPackageName[packageName] || [];
          deprecatedCallsByPackageName[packageName].push({ deprecation: deprecation, stack: stack });
        }
      }
      return deprecatedCallsByPackageName;
    }
  }, {
    key: 'getDeprecatedSelectorsByPackageName',
    value: function getDeprecatedSelectorsByPackageName() {
      var deprecatedSelectorsByPackageName = {};
      if (atom.styles.getDeprecations) {
        var deprecatedSelectorsBySourcePath = atom.styles.getDeprecations();
        for (var sourcePath of Object.keys(deprecatedSelectorsBySourcePath)) {
          var deprecation = deprecatedSelectorsBySourcePath[sourcePath];
          var components = sourcePath.split(_path2['default'].sep);
          var packagesComponentIndex = components.indexOf('packages');
          var packageName = null;
          var packagePath = null;
          if (packagesComponentIndex === -1) {
            packageName = 'Other'; // could be Atom Core or the personal style sheet
            packagePath = '';
          } else {
            packageName = components[packagesComponentIndex + 1];
            packagePath = components.slice(0, packagesComponentIndex + 1).join(_path2['default'].sep);
          }

          deprecatedSelectorsByPackageName[packageName] = deprecatedSelectorsByPackageName[packageName] || [];
          deprecatedSelectorsByPackageName[packageName].push({
            packagePath: packagePath,
            sourcePath: sourcePath,
            deprecation: deprecation
          });
        }
      }

      return deprecatedSelectorsByPackageName;
    }
  }, {
    key: 'getPackageName',
    value: function getPackageName(stack) {
      var packagePaths = this.getPackagePathsByPackageName();
      for (var _ref63 of packagePaths) {
        var _ref62 = _slicedToArray(_ref63, 2);

        var packageName = _ref62[0];
        var packagePath = _ref62[1];

        if (packagePath.includes('.atom/dev/packages') || packagePath.includes('.atom/packages')) {
          packagePaths.set(packageName, _fsPlus2['default'].absolute(packagePath));
        }
      }

      for (var i = 1; i < stack.length; i++) {
        var fileName = stack[i].fileName;

        // Empty when it was run from the dev console
        if (!fileName) {
          return null;
        }

        // Continue to next stack entry if call is in node_modules
        if (fileName.includes(_path2['default'].sep + 'node_modules' + _path2['default'].sep)) {
          continue;
        }

        for (var _ref73 of packagePaths) {
          var _ref72 = _slicedToArray(_ref73, 2);

          var packageName = _ref72[0];
          var packagePath = _ref72[1];

          var relativePath = _path2['default'].relative(packagePath, fileName);
          if (!/^\.\./.test(relativePath)) {
            return packageName;
          }
        }

        if (atom.getUserInitScriptPath() === fileName) {
          return 'Your local ' + _path2['default'].basename(fileName) + ' file';
        }
      }

      return null;
    }
  }, {
    key: 'getPackagePathsByPackageName',
    value: function getPackagePathsByPackageName() {
      if (this.packagePathsByPackageName) {
        return this.packagePathsByPackageName;
      } else {
        this.packagePathsByPackageName = new Map();
        for (var pack of atom.packages.getLoadedPackages()) {
          this.packagePathsByPackageName.set(pack.name, pack.path);
        }
        return this.packagePathsByPackageName;
      }
    }
  }, {
    key: 'checkForUpdates',
    value: function checkForUpdates() {
      atom.workspace.open('atom://config/updates');
    }
  }, {
    key: 'disablePackage',
    value: function disablePackage(packageName) {
      if (packageName) {
        atom.packages.disablePackage(packageName);
      }
    }
  }, {
    key: 'openLocation',
    value: function openLocation(location) {
      var pathToOpen = location.replace('file://', '');
      if (process.platform === 'win32') {
        pathToOpen = pathToOpen.replace(/^\//, '');
      }
      atom.open({ pathsToOpen: [pathToOpen] });
    }
  }, {
    key: 'getURI',
    value: function getURI() {
      return this.uri;
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      return 'Deprecation Cop';
    }
  }, {
    key: 'getIconName',
    value: function getIconName() {
      return 'alert';
    }
  }, {
    key: 'scrollUp',
    value: function scrollUp() {
      this.element.scrollTop -= document.body.offsetHeight / 20;
    }
  }, {
    key: 'scrollDown',
    value: function scrollDown() {
      this.element.scrollTop += document.body.offsetHeight / 20;
    }
  }, {
    key: 'pageUp',
    value: function pageUp() {
      this.element.scrollTop -= this.element.offsetHeight;
    }
  }, {
    key: 'pageDown',
    value: function pageDown() {
      this.element.scrollTop += this.element.offsetHeight;
    }
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      this.element.scrollTop = 0;
    }
  }, {
    key: 'scrollToBottom',
    value: function scrollToBottom() {
      this.element.scrollTop = this.element.scrollHeight;
    }
  }]);

  return DeprecationCopView;
})();

exports['default'] = DeprecationCopView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZGVwcmVjYXRpb24tY29wL2xpYi9kZXByZWNhdGlvbi1jb3Atdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFHYyxpQkFBaUI7Ozs7b0JBQ0ssTUFBTTs7b0JBQ3pCLE1BQU07Ozs7c0JBQ1IsU0FBUzs7OztvQkFDUCxNQUFNOzs7O3NCQUNBLFFBQVE7O29CQUNkLE1BQU07Ozs7d0JBQ0QsVUFBVTs7SUFFWCxrQkFBa0I7QUFDMUIsV0FEUSxrQkFBa0IsQ0FDekIsSUFBTyxFQUFFOzs7UUFBUCxHQUFHLEdBQUwsSUFBTyxDQUFMLEdBQUc7OzBCQURFLGtCQUFrQjs7QUFFbkMsUUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0FBQy9DLFFBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixrQkFBSyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDdkIsd0JBQUssTUFBTSxPQUFNLENBQUM7S0FDbkIsQ0FBQyxDQUNILENBQUM7O0FBRUYsUUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFO0FBQ3ZDLFVBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFlBQU07QUFDeEMsMEJBQUssTUFBTSxPQUFNLENBQUM7T0FDbkIsQ0FBQyxDQUNILENBQUM7S0FDSDtBQUNELHNCQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUM5QixvQkFBYyxFQUFFLHNCQUFNO0FBQ3BCLGNBQUssUUFBUSxFQUFFLENBQUM7T0FDakI7QUFDRCxzQkFBZ0Is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QUFDO09BQzVDO0FBQ0QsVUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMxQzs7O1dBRUssa0JBQUc7QUFDUCxhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVPLG9CQUFHO0FBQ1QsYUFBTyxpQkFBaUIsQ0FBQztLQUMxQjs7O1dBRVUsdUJBQUc7QUFDWixhQUFPLE9BQU8sQ0FBQztLQUNoQjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7S0FDM0Q7OztXQUVTLHNCQUFHO0FBQ1gsVUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0tBQzNEOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO0tBQ3JEOzs7V0FFTyxvQkFBRztBQUNULFVBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO0tBQ3JEOzs7V0FFVSx1QkFBRztBQUNaLFVBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUM1Qjs7O1dBRWEsMEJBQUc7QUFDZixVQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztLQUNwRDs7O1NBMWpCa0Isa0JBQWtCOzs7cUJBQWxCLGtCQUFrQiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2plcHN0Ly5hdG9tL3BhY2thZ2VzL2RlcHJlY2F0aW9uLWNvcC9saWIvZGVwcmVjYXRpb24tY29wLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXHJcbi8qKiBAanN4IGV0Y2guZG9tICovXHJcblxyXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlLXBsdXMnO1xyXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XHJcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtcGx1cyc7XHJcbmltcG9ydCBHcmltIGZyb20gJ2dyaW0nO1xyXG5pbXBvcnQgeyBtYXJrZWQgfSBmcm9tICdtYXJrZWQnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgc2hlbGwgfSBmcm9tICdlbGVjdHJvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXByZWNhdGlvbkNvcFZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKHsgdXJpIH0pIHtcclxuICAgIHRoaXMudXJpID0gdXJpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXHJcbiAgICAgIEdyaW0ub24oJ3VwZGF0ZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgZXRjaC51cGRhdGUodGhpcyk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy8gVE9ETzogUmVtb3ZlIGNvbmRpdGlvbmFsIHdoZW4gdGhlIG5ldyBTdHlsZU1hbmFnZXIgZGVwcmVjYXRpb24gQVBJcyByZWFjaCBzdGFibGUuXHJcbiAgICBpZiAoYXRvbS5zdHlsZXMub25EaWRVcGRhdGVEZXByZWNhdGlvbnMpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcclxuICAgICAgICBhdG9tLnN0eWxlcy5vbkRpZFVwZGF0ZURlcHJlY2F0aW9ucygoKSA9PiB7XHJcbiAgICAgICAgICBldGNoLnVwZGF0ZSh0aGlzKTtcclxuICAgICAgICB9KVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcclxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5lbGVtZW50LCB7XHJcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsVXAoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsRG93bigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2NvcmU6cGFnZS11cCc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMucGFnZVVwKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnY29yZTpwYWdlLWRvd24nOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBhZ2VEb3duKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnY29yZTptb3ZlLXRvLXRvcCc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdjb3JlOm1vdmUtdG8tYm90dG9tJzogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkZXNlcmlhbGl6ZXI6IHRoaXMuY29uc3RydWN0b3IubmFtZSxcclxuICAgICAgdXJpOiB0aGlzLmdldFVSSSgpLFxyXG4gICAgICB2ZXJzaW9uOiAxXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XHJcbiAgICByZXR1cm4gZXRjaC5kZXN0cm95KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImRlcHJlY2F0aW9uLWNvcCBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiXHJcbiAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZGRlZCBkZXByZWNhdGlvbi1vdmVydmlld1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB1bGwtcmlnaHQgYnRuLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGNoZWNrLWZvci11cGRhdGVcIlxyXG4gICAgICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBDaGVjayBmb3IgVXBkYXRlc1xyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICA8c3Bhbj5EZXByZWNhdGVkIGNhbGxzPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlblwiPlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJEZXByZWNhdGVkQ2FsbHMoKX1cclxuICAgICAgICAgIDwvdWw+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgIDxzcGFuPkRlcHJlY2F0ZWQgc2VsZWN0b3JzPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic2VsZWN0b3JzIGxpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW5cIj5cclxuICAgICAgICAgICAge3RoaXMucmVuZGVyRGVwcmVjYXRlZFNlbGVjdG9ycygpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyRGVwcmVjYXRlZENhbGxzKCkge1xyXG4gICAgY29uc3QgZGVwcmVjYXRpb25zQnlQYWNrYWdlTmFtZSA9IHRoaXMuZ2V0RGVwcmVjYXRlZENhbGxzQnlQYWNrYWdlTmFtZSgpO1xyXG4gICAgY29uc3QgcGFja2FnZU5hbWVzID0gT2JqZWN0LmtleXMoZGVwcmVjYXRpb25zQnlQYWNrYWdlTmFtZSk7XHJcbiAgICBpZiAocGFja2FnZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gPGxpIGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPk5vIGRlcHJlY2F0ZWQgY2FsbHM8L2xpPjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBwYWNrYWdlTmFtZXMuc29ydCgpLm1hcChwYWNrYWdlTmFtZSA9PiAoXHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRlcHJlY2F0aW9uIGxpc3QtbmVzdGVkLWl0ZW0gY29sbGFwc2VkXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImRlcHJlY2F0aW9uLWluZm8gbGlzdC1pdGVtXCJcclxuICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT5cclxuICAgICAgICAgICAgICBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaGlnaGxpZ2h0XCI+e3BhY2thZ2VOYW1lIHx8ICdhdG9tIGNvcmUnfTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+e2AgKCR7Xy5wbHVyYWxpemUoXHJcbiAgICAgICAgICAgICAgZGVwcmVjYXRpb25zQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0ubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICdkZXByZWNhdGlvbidcclxuICAgICAgICAgICAgKX0pYH08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdFwiPlxyXG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJQYWNrYWdlQWN0aW9uc0lmTmVlZGVkKHBhY2thZ2VOYW1lKX1cclxuICAgICAgICAgICAge2RlcHJlY2F0aW9uc0J5UGFja2FnZU5hbWVbcGFja2FnZU5hbWVdLm1hcChcclxuICAgICAgICAgICAgICAoeyBkZXByZWNhdGlvbiwgc3RhY2sgfSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBkZXByZWNhdGlvbi1kZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13YXJuaW5nIGljb24gaWNvbi1hbGVydFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gZGVwcmVjYXRpb24tbWVzc2FnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MPXttYXJrZWQoZGVwcmVjYXRpb24uZ2V0TWVzc2FnZSgpKX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySXNzdWVVUkxJZk5lZWRlZChcclxuICAgICAgICAgICAgICAgICAgICBwYWNrYWdlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXByZWNhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkSXNzdWVVUkwocGFja2FnZU5hbWUsIGRlcHJlY2F0aW9uLCBzdGFjaylcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFjay10cmFjZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFjay5tYXAoKHsgZnVuY3Rpb25OYW1lLCBsb2NhdGlvbiB9KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YWNrLWxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2Z1bmN0aW9uTmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiAtIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdGFjay1saW5lLWxvY2F0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtsb2NhdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTG9jYXRpb24obG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bG9jYXRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICApKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlckRlcHJlY2F0ZWRTZWxlY3RvcnMoKSB7XHJcbiAgICBjb25zdCBkZXByZWNhdGlvbnNCeVBhY2thZ2VOYW1lID0gdGhpcy5nZXREZXByZWNhdGVkU2VsZWN0b3JzQnlQYWNrYWdlTmFtZSgpO1xyXG4gICAgY29uc3QgcGFja2FnZU5hbWVzID0gT2JqZWN0LmtleXMoZGVwcmVjYXRpb25zQnlQYWNrYWdlTmFtZSk7XHJcbiAgICBpZiAocGFja2FnZU5hbWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gPGxpIGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPk5vIGRlcHJlY2F0ZWQgc2VsZWN0b3JzPC9saT47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gcGFja2FnZU5hbWVzLm1hcChwYWNrYWdlTmFtZSA9PiAoXHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRlcHJlY2F0aW9uIGxpc3QtbmVzdGVkLWl0ZW0gY29sbGFwc2VkXCI+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImRlcHJlY2F0aW9uLWluZm8gbGlzdC1pdGVtXCJcclxuICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT5cclxuICAgICAgICAgICAgICBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtaGlnaGxpZ2h0XCI+e3BhY2thZ2VOYW1lfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0XCI+XHJcbiAgICAgICAgICAgIHt0aGlzLnJlbmRlclBhY2thZ2VBY3Rpb25zSWZOZWVkZWQocGFja2FnZU5hbWUpfVxyXG4gICAgICAgICAgICB7ZGVwcmVjYXRpb25zQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0ubWFwKFxyXG4gICAgICAgICAgICAgICh7IHBhY2thZ2VQYXRoLCBzb3VyY2VQYXRoLCBkZXByZWNhdGlvbiB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVNvdXJjZVBhdGggPSBwYXRoLnJlbGF0aXZlKFxyXG4gICAgICAgICAgICAgICAgICBwYWNrYWdlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgc291cmNlUGF0aFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzc3VlVGl0bGUgPSBgRGVwcmVjYXRlZCBzZWxlY3RvciBpbiBcXGAke3JlbGF0aXZlU291cmNlUGF0aH1cXGBgO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNzdWVCb2R5ID0gYEluIFxcYCR7cmVsYXRpdmVTb3VyY2VQYXRofVxcYDogXFxuXFxuJHtcclxuICAgICAgICAgICAgICAgICAgZGVwcmVjYXRpb24ubWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgfWA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHNvdXJjZS1maWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGFcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNvdXJjZS11cmxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgaHJlZj17c291cmNlUGF0aH1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9e2V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTG9jYXRpb24oc291cmNlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtyZWxhdGl2ZVNvdXJjZVBhdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1pdGVtIGRlcHJlY2F0aW9uLWRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdhcm5pbmcgaWNvbiBpY29uLWFsZXJ0XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBkZXByZWNhdGlvbi1tZXNzYWdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw9e21hcmtlZChkZXByZWNhdGlvbi5tZXNzYWdlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU2VsZWN0b3JJc3N1ZVVSTElmTmVlZGVkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhY2thZ2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzc3VlVGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNzdWVCb2R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXJQYWNrYWdlQWN0aW9uc0lmTmVlZGVkKHBhY2thZ2VOYW1lKSB7XHJcbiAgICBpZiAocGFja2FnZU5hbWUgJiYgYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKHBhY2thZ2VOYW1lKSkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFkZGVkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGNoZWNrLWZvci11cGRhdGVcIlxyXG4gICAgICAgICAgICAgIG9uY2xpY2s9e2V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRm9yVXBkYXRlcygpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBDaGVjayBmb3IgVXBkYXRlXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGRpc2FibGUtcGFja2FnZVwiXHJcbiAgICAgICAgICAgICAgZGF0YS1wYWNrYWdlLW5hbWU9e3BhY2thZ2VOYW1lfVxyXG4gICAgICAgICAgICAgIG9uY2xpY2s9e2V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVQYWNrYWdlKHBhY2thZ2VOYW1lKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgRGlzYWJsZSBQYWNrYWdlXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbmNvZGVVUkkoc3RyKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJKHN0cilcclxuICAgICAgLnJlcGxhY2UoLyMvZywgJyUyMycpXHJcbiAgICAgIC5yZXBsYWNlKC87L2csICclM0InKVxyXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJTZWxlY3Rvcklzc3VlVVJMSWZOZWVkZWQocGFja2FnZU5hbWUsIGlzc3VlVGl0bGUsIGlzc3VlQm9keSkge1xyXG4gICAgY29uc3QgcmVwb1VSTCA9IHRoaXMuZ2V0UmVwb1VSTChwYWNrYWdlTmFtZSk7XHJcbiAgICBpZiAocmVwb1VSTCkge1xyXG4gICAgICBjb25zdCBpc3N1ZVVSTCA9IGAke3JlcG9VUkx9L2lzc3Vlcy9uZXc/dGl0bGU9JHt0aGlzLmVuY29kZVVSSShcclxuICAgICAgICBpc3N1ZVRpdGxlXHJcbiAgICAgICl9JmJvZHk9JHt0aGlzLmVuY29kZVVSSShpc3N1ZUJvZHkpfWA7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tdG9vbGJhclwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gaXNzdWUtdXJsXCJcclxuICAgICAgICAgICAgZGF0YS1pc3N1ZS10aXRsZT17aXNzdWVUaXRsZX1cclxuICAgICAgICAgICAgZGF0YS1yZXBvLXVybD17cmVwb1VSTH1cclxuICAgICAgICAgICAgZGF0YS1pc3N1ZS11cmw9e2lzc3VlVVJMfVxyXG4gICAgICAgICAgICBvbmNsaWNrPXtldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICB0aGlzLm9wZW5Jc3N1ZVVSTChyZXBvVVJMLCBpc3N1ZVVSTCwgaXNzdWVUaXRsZSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFJlcG9ydCBJc3N1ZVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXJJc3N1ZVVSTElmTmVlZGVkKHBhY2thZ2VOYW1lLCBkZXByZWNhdGlvbiwgaXNzdWVVUkwpIHtcclxuICAgIGlmIChwYWNrYWdlTmFtZSAmJiBpc3N1ZVVSTCkge1xyXG4gICAgICBjb25zdCByZXBvVVJMID0gdGhpcy5nZXRSZXBvVVJMKHBhY2thZ2VOYW1lKTtcclxuICAgICAgY29uc3QgaXNzdWVUaXRsZSA9IGAke2RlcHJlY2F0aW9uLmdldE9yaWdpbk5hbWUoKX0gaXMgZGVwcmVjYXRlZC5gO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLXRvb2xiYXJcIj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGlzc3VlLXVybFwiXHJcbiAgICAgICAgICAgIGRhdGEtaXNzdWUtdGl0bGU9e2lzc3VlVGl0bGV9XHJcbiAgICAgICAgICAgIGRhdGEtcmVwby11cmw9e3JlcG9VUkx9XHJcbiAgICAgICAgICAgIGRhdGEtaXNzdWUtdXJsPXtpc3N1ZVVSTH1cclxuICAgICAgICAgICAgb25jbGljaz17ZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5vcGVuSXNzdWVVUkwocmVwb1VSTCwgaXNzdWVVUkwsIGlzc3VlVGl0bGUpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICBSZXBvcnQgSXNzdWVcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnVpbGRJc3N1ZVVSTChwYWNrYWdlTmFtZSwgZGVwcmVjYXRpb24sIHN0YWNrKSB7XHJcbiAgICBjb25zdCByZXBvVVJMID0gdGhpcy5nZXRSZXBvVVJMKHBhY2thZ2VOYW1lKTtcclxuICAgIGlmIChyZXBvVVJMKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gYCR7ZGVwcmVjYXRpb24uZ2V0T3JpZ2luTmFtZSgpfSBpcyBkZXByZWNhdGVkLmA7XHJcbiAgICAgIGNvbnN0IHN0YWNrdHJhY2UgPSBzdGFja1xyXG4gICAgICAgIC5tYXAoKHsgZnVuY3Rpb25OYW1lLCBsb2NhdGlvbiB9KSA9PiBgJHtmdW5jdGlvbk5hbWV9ICgke2xvY2F0aW9ufSlgKVxyXG4gICAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgICAgY29uc3QgYm9keSA9IGAke2RlcHJlY2F0aW9uLmdldE1lc3NhZ2UoKX1cXG5cXGBcXGBcXGBcXG4ke3N0YWNrdHJhY2V9XFxuXFxgXFxgXFxgYDtcclxuICAgICAgcmV0dXJuIGAke3JlcG9VUkx9L2lzc3Vlcy9uZXc/dGl0bGU9JHtlbmNvZGVVUkkodGl0bGUpfSZib2R5PSR7ZW5jb2RlVVJJKFxyXG4gICAgICAgIGJvZHlcclxuICAgICAgKX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBvcGVuSXNzdWVVUkwocmVwb1VSTCwgaXNzdWVVUkwsIGlzc3VlVGl0bGUpIHtcclxuICAgIGNvbnN0IGlzc3VlID0gYXdhaXQgdGhpcy5maW5kU2ltaWxhcklzc3VlKHJlcG9VUkwsIGlzc3VlVGl0bGUpO1xyXG4gICAgaWYgKGlzc3VlKSB7XHJcbiAgICAgIHNoZWxsLm9wZW5FeHRlcm5hbChpc3N1ZS5odG1sX3VybCk7XHJcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcclxuICAgICAgLy8gV2luZG93cyB3aWxsIG5vdCBsYXVuY2ggVVJMcyBncmVhdGVyIHRoYW4gfjIwMDAgYnl0ZXMgc28gd2UgbmVlZCB0byBzaHJpbmsgaXRcclxuICAgICAgc2hlbGwub3BlbkV4dGVybmFsKChhd2FpdCB0aGlzLnNob3J0ZW5VUkwoaXNzdWVVUkwpKSB8fCBpc3N1ZVVSTCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaGVsbC5vcGVuRXh0ZXJuYWwoaXNzdWVVUkwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZmluZFNpbWlsYXJJc3N1ZShyZXBvVVJMLCBpc3N1ZVRpdGxlKSB7XHJcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvaXNzdWVzJztcclxuICAgIGNvbnN0IHJlcG8gPSByZXBvVVJMLnJlcGxhY2UoL2h0dHAocyk/OlxcL1xcLyhcXGQrXFwuKT9naXRodWIuY29tXFwvL2dpLCAnJyk7XHJcbiAgICBjb25zdCBxdWVyeSA9IGAke2lzc3VlVGl0bGV9IHJlcG86JHtyZXBvfWA7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5mZXRjaChcclxuICAgICAgYCR7dXJsfT9xPSR7ZW5jb2RlVVJJKHF1ZXJ5KX0mc29ydD1jcmVhdGVkYCxcclxuICAgICAge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vdm5kLmdpdGh1Yi52Mytqc29uJyxcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIGlmIChkYXRhLml0ZW1zKSB7XHJcbiAgICAgICAgY29uc3QgaXNzdWVzID0ge307XHJcbiAgICAgICAgZm9yIChjb25zdCBpc3N1ZSBvZiBkYXRhLml0ZW1zKSB7XHJcbiAgICAgICAgICBpZiAoaXNzdWUudGl0bGUuaW5jbHVkZXMoaXNzdWVUaXRsZSkgJiYgIWlzc3Vlc1tpc3N1ZS5zdGF0ZV0pIHtcclxuICAgICAgICAgICAgaXNzdWVzW2lzc3VlLnN0YXRlXSA9IGlzc3VlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlzc3Vlcy5vcGVuIHx8IGlzc3Vlcy5jbG9zZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3J0ZW5VUkwodXJsKSB7XHJcbiAgICBsZXQgZW5jb2RlZFVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLnN1YnN0cigwLCA1MDAwKTsgLy8gaXMuZ2QgaGFzIDUwMDAgY2hhciBsaW1pdFxyXG4gICAgbGV0IGluY29tcGxldGVQZXJjZW50RW5jb2RpbmcgPSBlbmNvZGVkVXJsLmluZGV4T2YoXHJcbiAgICAgICclJyxcclxuICAgICAgZW5jb2RlZFVybC5sZW5ndGggLSAyXHJcbiAgICApO1xyXG4gICAgaWYgKGluY29tcGxldGVQZXJjZW50RW5jb2RpbmcgPj0gMCkge1xyXG4gICAgICAvLyBIYW5kbGUgYW4gaW5jb21wbGV0ZSAlIGVuY29kaW5nIGN1dC1vZmZcclxuICAgICAgZW5jb2RlZFVybCA9IGVuY29kZWRVcmwuc3Vic3RyKDAsIGluY29tcGxldGVQZXJjZW50RW5jb2RpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9pcy5nZC9jcmVhdGUucGhwP2Zvcm1hdD1zaW1wbGUnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9LFxyXG4gICAgICBib2R5OiBgdXJsPSR7ZW5jb2RlZFVybH1gXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0LnRleHQoKTtcclxuICB9XHJcblxyXG4gIGdldFJlcG9VUkwocGFja2FnZU5hbWUpIHtcclxuICAgIGNvbnN0IGxvYWRlZFBhY2thZ2UgPSBhdG9tLnBhY2thZ2VzLmdldExvYWRlZFBhY2thZ2UocGFja2FnZU5hbWUpO1xyXG4gICAgaWYgKFxyXG4gICAgICBsb2FkZWRQYWNrYWdlICYmXHJcbiAgICAgIGxvYWRlZFBhY2thZ2UubWV0YWRhdGEgJiZcclxuICAgICAgbG9hZGVkUGFja2FnZS5tZXRhZGF0YS5yZXBvc2l0b3J5XHJcbiAgICApIHtcclxuICAgICAgY29uc3QgdXJsID1cclxuICAgICAgICBsb2FkZWRQYWNrYWdlLm1ldGFkYXRhLnJlcG9zaXRvcnkudXJsIHx8XHJcbiAgICAgICAgbG9hZGVkUGFja2FnZS5tZXRhZGF0YS5yZXBvc2l0b3J5O1xyXG4gICAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcLmdpdCQvLCAnJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlcHJlY2F0ZWRDYWxsc0J5UGFja2FnZU5hbWUoKSB7XHJcbiAgICBjb25zdCBkZXByZWNhdGVkQ2FsbHMgPSBHcmltLmdldERlcHJlY2F0aW9ucygpO1xyXG4gICAgZGVwcmVjYXRlZENhbGxzLnNvcnQoKGEsIGIpID0+IGIuZ2V0Q2FsbENvdW50KCkgLSBhLmdldENhbGxDb3VudCgpKTtcclxuICAgIGNvbnN0IGRlcHJlY2F0ZWRDYWxsc0J5UGFja2FnZU5hbWUgPSB7fTtcclxuICAgIGZvciAoY29uc3QgZGVwcmVjYXRpb24gb2YgZGVwcmVjYXRlZENhbGxzKSB7XHJcbiAgICAgIGNvbnN0IHN0YWNrcyA9IGRlcHJlY2F0aW9uLmdldFN0YWNrcygpO1xyXG4gICAgICBzdGFja3Muc29ydCgoYSwgYikgPT4gYi5jYWxsQ291bnQgLSBhLmNhbGxDb3VudCk7XHJcbiAgICAgIGZvciAoY29uc3Qgc3RhY2sgb2Ygc3RhY2tzKSB7XHJcbiAgICAgICAgbGV0IHBhY2thZ2VOYW1lID0gbnVsbDtcclxuICAgICAgICBpZiAoc3RhY2subWV0YWRhdGEgJiYgc3RhY2subWV0YWRhdGEucGFja2FnZU5hbWUpIHtcclxuICAgICAgICAgIHBhY2thZ2VOYW1lID0gc3RhY2subWV0YWRhdGEucGFja2FnZU5hbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBhY2thZ2VOYW1lID0gKHRoaXMuZ2V0UGFja2FnZU5hbWUoc3RhY2spIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVwcmVjYXRlZENhbGxzQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0gPVxyXG4gICAgICAgICAgZGVwcmVjYXRlZENhbGxzQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0gfHwgW107XHJcbiAgICAgICAgZGVwcmVjYXRlZENhbGxzQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0ucHVzaCh7IGRlcHJlY2F0aW9uLCBzdGFjayB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlcHJlY2F0ZWRDYWxsc0J5UGFja2FnZU5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXREZXByZWNhdGVkU2VsZWN0b3JzQnlQYWNrYWdlTmFtZSgpIHtcclxuICAgIGNvbnN0IGRlcHJlY2F0ZWRTZWxlY3RvcnNCeVBhY2thZ2VOYW1lID0ge307XHJcbiAgICBpZiAoYXRvbS5zdHlsZXMuZ2V0RGVwcmVjYXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGRlcHJlY2F0ZWRTZWxlY3RvcnNCeVNvdXJjZVBhdGggPSBhdG9tLnN0eWxlcy5nZXREZXByZWNhdGlvbnMoKTtcclxuICAgICAgZm9yIChjb25zdCBzb3VyY2VQYXRoIG9mIE9iamVjdC5rZXlzKGRlcHJlY2F0ZWRTZWxlY3RvcnNCeVNvdXJjZVBhdGgpKSB7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjYXRpb24gPSBkZXByZWNhdGVkU2VsZWN0b3JzQnlTb3VyY2VQYXRoW3NvdXJjZVBhdGhdO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzb3VyY2VQYXRoLnNwbGl0KHBhdGguc2VwKTtcclxuICAgICAgICBjb25zdCBwYWNrYWdlc0NvbXBvbmVudEluZGV4ID0gY29tcG9uZW50cy5pbmRleE9mKCdwYWNrYWdlcycpO1xyXG4gICAgICAgIGxldCBwYWNrYWdlTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhY2thZ2VQYXRoID0gbnVsbDtcclxuICAgICAgICBpZiAocGFja2FnZXNDb21wb25lbnRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIHBhY2thZ2VOYW1lID0gJ090aGVyJzsgLy8gY291bGQgYmUgQXRvbSBDb3JlIG9yIHRoZSBwZXJzb25hbCBzdHlsZSBzaGVldFxyXG4gICAgICAgICAgcGFja2FnZVBhdGggPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFja2FnZU5hbWUgPSBjb21wb25lbnRzW3BhY2thZ2VzQ29tcG9uZW50SW5kZXggKyAxXTtcclxuICAgICAgICAgIHBhY2thZ2VQYXRoID0gY29tcG9uZW50c1xyXG4gICAgICAgICAgICAuc2xpY2UoMCwgcGFja2FnZXNDb21wb25lbnRJbmRleCArIDEpXHJcbiAgICAgICAgICAgIC5qb2luKHBhdGguc2VwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlcHJlY2F0ZWRTZWxlY3RvcnNCeVBhY2thZ2VOYW1lW3BhY2thZ2VOYW1lXSA9XHJcbiAgICAgICAgICBkZXByZWNhdGVkU2VsZWN0b3JzQnlQYWNrYWdlTmFtZVtwYWNrYWdlTmFtZV0gfHwgW107XHJcbiAgICAgICAgZGVwcmVjYXRlZFNlbGVjdG9yc0J5UGFja2FnZU5hbWVbcGFja2FnZU5hbWVdLnB1c2goe1xyXG4gICAgICAgICAgcGFja2FnZVBhdGgsXHJcbiAgICAgICAgICBzb3VyY2VQYXRoLFxyXG4gICAgICAgICAgZGVwcmVjYXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkZXByZWNhdGVkU2VsZWN0b3JzQnlQYWNrYWdlTmFtZTtcclxuICB9XHJcblxyXG4gIGdldFBhY2thZ2VOYW1lKHN0YWNrKSB7XHJcbiAgICBjb25zdCBwYWNrYWdlUGF0aHMgPSB0aGlzLmdldFBhY2thZ2VQYXRoc0J5UGFja2FnZU5hbWUoKTtcclxuICAgIGZvciAoY29uc3QgW3BhY2thZ2VOYW1lLCBwYWNrYWdlUGF0aF0gb2YgcGFja2FnZVBhdGhzKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwYWNrYWdlUGF0aC5pbmNsdWRlcygnLmF0b20vZGV2L3BhY2thZ2VzJykgfHxcclxuICAgICAgICBwYWNrYWdlUGF0aC5pbmNsdWRlcygnLmF0b20vcGFja2FnZXMnKVxyXG4gICAgICApIHtcclxuICAgICAgICBwYWNrYWdlUGF0aHMuc2V0KHBhY2thZ2VOYW1lLCBmcy5hYnNvbHV0ZShwYWNrYWdlUGF0aCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB7IGZpbGVOYW1lIH0gPSBzdGFja1tpXTtcclxuXHJcbiAgICAgIC8vIEVtcHR5IHdoZW4gaXQgd2FzIHJ1biBmcm9tIHRoZSBkZXYgY29uc29sZVxyXG4gICAgICBpZiAoIWZpbGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENvbnRpbnVlIHRvIG5leHQgc3RhY2sgZW50cnkgaWYgY2FsbCBpcyBpbiBub2RlX21vZHVsZXNcclxuICAgICAgaWYgKGZpbGVOYW1lLmluY2x1ZGVzKGAke3BhdGguc2VwfW5vZGVfbW9kdWxlcyR7cGF0aC5zZXB9YCkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBbcGFja2FnZU5hbWUsIHBhY2thZ2VQYXRoXSBvZiBwYWNrYWdlUGF0aHMpIHtcclxuICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXRoLnJlbGF0aXZlKHBhY2thZ2VQYXRoLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgaWYgKCEvXlxcLlxcLi8udGVzdChyZWxhdGl2ZVBhdGgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gcGFja2FnZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYXRvbS5nZXRVc2VySW5pdFNjcmlwdFBhdGgoKSA9PT0gZmlsZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gYFlvdXIgbG9jYWwgJHtwYXRoLmJhc2VuYW1lKGZpbGVOYW1lKX0gZmlsZWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGdldFBhY2thZ2VQYXRoc0J5UGFja2FnZU5hbWUoKSB7XHJcbiAgICBpZiAodGhpcy5wYWNrYWdlUGF0aHNCeVBhY2thZ2VOYW1lKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhY2thZ2VQYXRoc0J5UGFja2FnZU5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhY2thZ2VQYXRoc0J5UGFja2FnZU5hbWUgPSBuZXcgTWFwKCk7XHJcbiAgICAgIGZvciAoY29uc3QgcGFjayBvZiBhdG9tLnBhY2thZ2VzLmdldExvYWRlZFBhY2thZ2VzKCkpIHtcclxuICAgICAgICB0aGlzLnBhY2thZ2VQYXRoc0J5UGFja2FnZU5hbWUuc2V0KHBhY2submFtZSwgcGFjay5wYXRoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5wYWNrYWdlUGF0aHNCeVBhY2thZ2VOYW1lO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tGb3JVcGRhdGVzKCkge1xyXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbignYXRvbTovL2NvbmZpZy91cGRhdGVzJyk7XHJcbiAgfVxyXG5cclxuICBkaXNhYmxlUGFja2FnZShwYWNrYWdlTmFtZSkge1xyXG4gICAgaWYgKHBhY2thZ2VOYW1lKSB7XHJcbiAgICAgIGF0b20ucGFja2FnZXMuZGlzYWJsZVBhY2thZ2UocGFja2FnZU5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkxvY2F0aW9uKGxvY2F0aW9uKSB7XHJcbiAgICBsZXQgcGF0aFRvT3BlbiA9IGxvY2F0aW9uLnJlcGxhY2UoJ2ZpbGU6Ly8nLCAnJyk7XHJcbiAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xyXG4gICAgICBwYXRoVG9PcGVuID0gcGF0aFRvT3Blbi5yZXBsYWNlKC9eXFwvLywgJycpO1xyXG4gICAgfVxyXG4gICAgYXRvbS5vcGVuKHsgcGF0aHNUb09wZW46IFtwYXRoVG9PcGVuXSB9KTtcclxuICB9XHJcblxyXG4gIGdldFVSSSgpIHtcclxuICAgIHJldHVybiB0aGlzLnVyaTtcclxuICB9XHJcblxyXG4gIGdldFRpdGxlKCkge1xyXG4gICAgcmV0dXJuICdEZXByZWNhdGlvbiBDb3AnO1xyXG4gIH1cclxuXHJcbiAgZ2V0SWNvbk5hbWUoKSB7XHJcbiAgICByZXR1cm4gJ2FsZXJ0JztcclxuICB9XHJcblxyXG4gIHNjcm9sbFVwKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCAtPSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAvIDIwO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsRG93bigpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgKz0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLyAyMDtcclxuICB9XHJcblxyXG4gIHBhZ2VVcCgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgLT0gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICB9XHJcblxyXG4gIHBhZ2VEb3duKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCArPSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICB9XHJcblxyXG4gIHNjcm9sbFRvQm90dG9tKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==