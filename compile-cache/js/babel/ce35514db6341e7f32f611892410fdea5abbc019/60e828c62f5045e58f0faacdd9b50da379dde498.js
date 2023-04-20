Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.activate = activate;
exports.deactivate = deactivate;
exports.consumeStatusBar = consumeStatusBar;
exports.setLineEnding = setLineEnding;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _underscorePlus = require('underscore-plus');

var _underscorePlus2 = _interopRequireDefault(_underscorePlus);

var _atom = require('atom');

var _selector = require('./selector');

var _statusBarItem = require('./status-bar-item');

var _statusBarItem2 = _interopRequireDefault(_statusBarItem);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

'use babel';

var LineEndingRegExp = /\r\n|\n/g;

// the following regular expression is executed natively via the `substring` package,
// where `\A` corresponds to the beginning of the string.
// More info: https://github.com/atom/line-ending-selector/pull/56
// eslint-disable-next-line no-useless-escape
var LFRegExp = /(\A|[^\r])\n/g;
var CRLFRegExp = /\r\n/g;

var disposables = null;

function activate() {
  disposables = new _atom.CompositeDisposable();
  var selectorDisposable = undefined;
  var selector = undefined;

  disposables.add(atom.commands.add('atom-text-editor', {
    'line-ending-selector:show': function lineEndingSelectorShow() {
      // Initiating Selector object - called only once when `line-ending-selector:show` is called
      if (!selectorDisposable) {
        // make a Selector object
        selector = new _selector.Selector([{ name: 'LF', value: '\n' }, { name: 'CRLF', value: '\r\n' }]);
        // Add disposable for selector
        selectorDisposable = new _atom.Disposable(function () {
          return selector.dispose();
        });
        disposables.add(selectorDisposable);
      }

      selector.show();
    },

    'line-ending-selector:convert-to-LF': function lineEndingSelectorConvertToLF(event) {
      var editorElement = event.target.closest('atom-text-editor');
      setLineEnding(editorElement.getModel(), '\n');
    },

    'line-ending-selector:convert-to-CRLF': function lineEndingSelectorConvertToCRLF(event) {
      var editorElement = event.target.closest('atom-text-editor');
      setLineEnding(editorElement.getModel(), '\r\n');
    }
  }));
}

function deactivate() {
  disposables.dispose();
}

function consumeStatusBar(statusBar) {
  var statusBarItem = new _statusBarItem2['default']();
  var currentBufferDisposable = null;
  var tooltipDisposable = null;

  var updateTile = _underscorePlus2['default'].debounce(function (buffer) {
    getLineEndings(buffer).then(function (lineEndings) {
      if (lineEndings.size === 0) {
        var defaultLineEnding = getDefaultLineEnding();
        buffer.setPreferredLineEnding(defaultLineEnding);
        lineEndings = new Set().add(defaultLineEnding);
      }
      statusBarItem.setLineEndings(lineEndings);
    });
  }, 0);

  disposables.add(atom.workspace.observeActiveTextEditor(function (editor) {
    if (currentBufferDisposable) currentBufferDisposable.dispose();

    if (editor && editor.getBuffer) {
      (function () {
        var buffer = editor.getBuffer();
        updateTile(buffer);
        currentBufferDisposable = buffer.onDidChange(function (_ref) {
          var oldText = _ref.oldText;
          var newText = _ref.newText;

          if (!statusBarItem.hasLineEnding('\n')) {
            if (newText.indexOf('\n') >= 0) {
              updateTile(buffer);
            }
          } else if (!statusBarItem.hasLineEnding('\r\n')) {
            if (newText.indexOf('\r\n') >= 0) {
              updateTile(buffer);
            }
          } else if (oldText.indexOf('\n')) {
            updateTile(buffer);
          }
        });
      })();
    } else {
      statusBarItem.setLineEndings(new Set());
      currentBufferDisposable = null;
    }

    if (tooltipDisposable) {
      disposables.remove(tooltipDisposable);
      tooltipDisposable.dispose();
    }
    tooltipDisposable = atom.tooltips.add(statusBarItem.element, {
      title: function title() {
        return 'File uses ' + statusBarItem.description() + ' line endings';
      }
    });
    disposables.add(tooltipDisposable);
  }));

  disposables.add(new _atom.Disposable(function () {
    if (currentBufferDisposable) currentBufferDisposable.dispose();
  }));

  statusBarItem.onClick(function () {
    var editor = atom.workspace.getActiveTextEditor();
    atom.commands.dispatch(atom.views.getView(editor), 'line-ending-selector:show');
  });

  var tile = statusBar.addRightTile({ item: statusBarItem, priority: 200 });
  disposables.add(new _atom.Disposable(function () {
    return tile.destroy();
  }));
}

function getDefaultLineEnding() {
  switch (atom.config.get('line-ending-selector.defaultLineEnding')) {
    case 'LF':
      return '\n';
    case 'CRLF':
      return '\r\n';
    case 'OS Default':
    default:
      return _helpers2['default'].getProcessPlatform() === 'win32' ? '\r\n' : '\n';
  }
}

function getLineEndings(buffer) {
  if (typeof buffer.find === 'function') {
    return Promise.all([buffer.find(LFRegExp), buffer.find(CRLFRegExp)]).then(function (_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2);

      var hasLF = _ref22[0];
      var hasCRLF = _ref22[1];

      var result = new Set();
      if (hasLF) result.add('\n');
      if (hasCRLF) result.add('\r\n');
      return result;
    });
  } else {
    return new Promise(function (resolve) {
      var result = new Set();
      for (var i = 0; i < buffer.getLineCount() - 1; i++) {
        result.add(buffer.lineEndingForRow(i));
      }
      resolve(result);
    });
  }
}

function setLineEnding(item, lineEnding) {
  if (item && item.getBuffer) {
    var buffer = item.getBuffer();
    buffer.setPreferredLineEnding(lineEnding);
    buffer.setText(buffer.getText().replace(LineEndingRegExp, lineEnding));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvbGluZS1lbmRpbmctc2VsZWN0b3IvbGliL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs4QkFFYyxpQkFBaUI7Ozs7b0JBQ2lCLE1BQU07O3dCQUM3QixZQUFZOzs2QkFDWCxtQkFBbUI7Ozs7dUJBQ3pCLFdBQVc7Ozs7QUFOL0IsV0FBVyxDQUFDOztBQVFaLElBQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDOzs7Ozs7QUFNcEMsSUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQzs7QUFFM0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDOztBQUVoQixTQUFTLFFBQVEsR0FBRztBQUN6QixhQUFXLEdBQUcsK0JBQXlCLENBQUM7QUFDeEMsTUFBSSxrQkFBa0IsWUFBQSxDQUFDO0FBQ3ZCLE1BQUksUUFBUSxZQUFBLENBQUM7O0FBRWIsYUFBVyxDQUFDLEdBQUcsQ0FDYixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtBQUNwQywrQkFBMkIsRUFBRSxrQ0FBTTs7QUFFakMsVUFBSSxDQUFDLGtCQUFrQixFQUFFOztBQUV2QixnQkFBUSxHQUFHLHVCQUFhLENBQ3RCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQzNCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQ2hDLENBQUMsQ0FBQzs7QUFFSCwwQkFBa0IsR0FBRyxxQkFBZTtpQkFBTSxRQUFRLENBQUMsT0FBTyxFQUFFO1NBQUEsQ0FBQyxDQUFDO0FBQzlELG1CQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7T0FDckM7O0FBRUQsY0FBUSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2pCOztBQUVELHdDQUFvQyxFQUFFLHVDQUFBLEtB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QUFFTSxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO0FBQzlDLE1BQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDMUIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzlCLFVBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQyxVQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztHQUN4RTtDQUNGIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvbGluZS1lbmRpbmctc2VsZWN0b3IvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcclxuXHJcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUtcGx1cyc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcclxuaW1wb3J0IHsgU2VsZWN0b3IgfSBmcm9tICcuL3NlbGVjdG9yJztcclxuaW1wb3J0IFN0YXR1c0Jhckl0ZW0gZnJvbSAnLi9zdGF0dXMtYmFyLWl0ZW0nO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxuY29uc3QgTGluZUVuZGluZ1JlZ0V4cCA9IC9cXHJcXG58XFxuL2c7XHJcblxyXG4vLyB0aGUgZm9sbG93aW5nIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBleGVjdXRlZCBuYXRpdmVseSB2aWEgdGhlIGBzdWJzdHJpbmdgIHBhY2thZ2UsXHJcbi8vIHdoZXJlIGBcXEFgIGNvcnJlc3BvbmRzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHN0cmluZy5cclxuLy8gTW9yZSBpbmZvOiBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9saW5lLWVuZGluZy1zZWxlY3Rvci9wdWxsLzU2XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxyXG5jb25zdCBMRlJlZ0V4cCA9IC8oXFxBfFteXFxyXSlcXG4vZztcclxuY29uc3QgQ1JMRlJlZ0V4cCA9IC9cXHJcXG4vZztcclxuXHJcbmxldCBkaXNwb3NhYmxlcyA9IG51bGw7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gIGxldCBzZWxlY3RvckRpc3Bvc2FibGU7XHJcbiAgbGV0IHNlbGVjdG9yO1xyXG5cclxuICBkaXNwb3NhYmxlcy5hZGQoXHJcbiAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIHtcclxuICAgICAgJ2xpbmUtZW5kaW5nLXNlbGVjdG9yOnNob3cnOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gSW5pdGlhdGluZyBTZWxlY3RvciBvYmplY3QgLSBjYWxsZWQgb25seSBvbmNlIHdoZW4gYGxpbmUtZW5kaW5nLXNlbGVjdG9yOnNob3dgIGlzIGNhbGxlZFxyXG4gICAgICAgIGlmICghc2VsZWN0b3JEaXNwb3NhYmxlKSB7XHJcbiAgICAgICAgICAvLyBtYWtlIGEgU2VsZWN0b3Igb2JqZWN0XHJcbiAgICAgICAgICBzZWxlY3RvciA9IG5ldyBTZWxlY3RvcihbXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0xGJywgdmFsdWU6ICdcXG4nIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ0NSTEYnLCB2YWx1ZTogJ1xcclxcbicgfVxyXG4gICAgICAgICAgXSk7XHJcbiAgICAgICAgICAvLyBBZGQgZGlzcG9zYWJsZSBmb3Igc2VsZWN0b3JcclxuICAgICAgICAgIHNlbGVjdG9yRGlzcG9zYWJsZSA9IG5ldyBEaXNwb3NhYmxlKCgpID0+IHNlbGVjdG9yLmRpc3Bvc2UoKSk7XHJcbiAgICAgICAgICBkaXNwb3NhYmxlcy5hZGQoc2VsZWN0b3JEaXNwb3NhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdG9yLnNob3coKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdsaW5lLWVuZGluZy1zZWxlY3Rvcjpjb252ZXJ0LXRvLUxGJzogZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVkaXRvckVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYXRvbS10ZXh0LWVkaXRvcicpO1xyXG4gICAgICAgIHNldExpbmVFbmRpbmcoZWRpdG9yRWxlbWVudC5nZXRNb2RlbCgpLCAnXFxuJyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnbGluZS1lbmRpbmctc2VsZWN0b3I6Y29udmVydC10by1DUkxGJzogZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVkaXRvckVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYXRvbS10ZXh0LWVkaXRvcicpO1xyXG4gICAgICAgIHNldExpbmVFbmRpbmcoZWRpdG9yRWxlbWVudC5nZXRNb2RlbCgpLCAnXFxyXFxuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XHJcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZVN0YXR1c0JhcihzdGF0dXNCYXIpIHtcclxuICBsZXQgc3RhdHVzQmFySXRlbSA9IG5ldyBTdGF0dXNCYXJJdGVtKCk7XHJcbiAgbGV0IGN1cnJlbnRCdWZmZXJEaXNwb3NhYmxlID0gbnVsbDtcclxuICBsZXQgdG9vbHRpcERpc3Bvc2FibGUgPSBudWxsO1xyXG5cclxuICBjb25zdCB1cGRhdGVUaWxlID0gXy5kZWJvdW5jZShidWZmZXIgPT4ge1xyXG4gICAgZ2V0TGluZUVuZGluZ3MoYnVmZmVyKS50aGVuKGxpbmVFbmRpbmdzID0+IHtcclxuICAgICAgaWYgKGxpbmVFbmRpbmdzLnNpemUgPT09IDApIHtcclxuICAgICAgICBsZXQgZGVmYXVsdExpbmVFbmRpbmcgPSBnZXREZWZhdWx0TGluZUVuZGluZygpO1xyXG4gICAgICAgIGJ1ZmZlci5zZXRQcmVmZXJyZWRMaW5lRW5kaW5nKGRlZmF1bHRMaW5lRW5kaW5nKTtcclxuICAgICAgICBsaW5lRW5kaW5ncyA9IG5ldyBTZXQoKS5hZGQoZGVmYXVsdExpbmVFbmRpbmcpO1xyXG4gICAgICB9XHJcbiAgICAgIHN0YXR1c0Jhckl0ZW0uc2V0TGluZUVuZGluZ3MobGluZUVuZGluZ3MpO1xyXG4gICAgfSk7XHJcbiAgfSwgMCk7XHJcblxyXG4gIGRpc3Bvc2FibGVzLmFkZChcclxuICAgIGF0b20ud29ya3NwYWNlLm9ic2VydmVBY3RpdmVUZXh0RWRpdG9yKGVkaXRvciA9PiB7XHJcbiAgICAgIGlmIChjdXJyZW50QnVmZmVyRGlzcG9zYWJsZSkgY3VycmVudEJ1ZmZlckRpc3Bvc2FibGUuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgaWYgKGVkaXRvciAmJiBlZGl0b3IuZ2V0QnVmZmVyKSB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IGVkaXRvci5nZXRCdWZmZXIoKTtcclxuICAgICAgICB1cGRhdGVUaWxlKGJ1ZmZlcik7XHJcbiAgICAgICAgY3VycmVudEJ1ZmZlckRpc3Bvc2FibGUgPSBidWZmZXIub25EaWRDaGFuZ2UoKHsgb2xkVGV4dCwgbmV3VGV4dCB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXN0YXR1c0Jhckl0ZW0uaGFzTGluZUVuZGluZygnXFxuJykpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1RleHQuaW5kZXhPZignXFxuJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgIHVwZGF0ZVRpbGUoYnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICghc3RhdHVzQmFySXRlbS5oYXNMaW5lRW5kaW5nKCdcXHJcXG4nKSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VGV4dC5pbmRleE9mKCdcXHJcXG4nKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgdXBkYXRlVGlsZShidWZmZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKG9sZFRleHQuaW5kZXhPZignXFxuJykpIHtcclxuICAgICAgICAgICAgdXBkYXRlVGlsZShidWZmZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXR1c0Jhckl0ZW0uc2V0TGluZUVuZGluZ3MobmV3IFNldCgpKTtcclxuICAgICAgICBjdXJyZW50QnVmZmVyRGlzcG9zYWJsZSA9IG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0b29sdGlwRGlzcG9zYWJsZSkge1xyXG4gICAgICAgIGRpc3Bvc2FibGVzLnJlbW92ZSh0b29sdGlwRGlzcG9zYWJsZSk7XHJcbiAgICAgICAgdG9vbHRpcERpc3Bvc2FibGUuZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRvb2x0aXBEaXNwb3NhYmxlID0gYXRvbS50b29sdGlwcy5hZGQoc3RhdHVzQmFySXRlbS5lbGVtZW50LCB7XHJcbiAgICAgICAgdGl0bGUoKSB7XHJcbiAgICAgICAgICByZXR1cm4gYEZpbGUgdXNlcyAke3N0YXR1c0Jhckl0ZW0uZGVzY3JpcHRpb24oKX0gbGluZSBlbmRpbmdzYDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwb3NhYmxlcy5hZGQodG9vbHRpcERpc3Bvc2FibGUpO1xyXG4gICAgfSlcclxuICApO1xyXG5cclxuICBkaXNwb3NhYmxlcy5hZGQoXHJcbiAgICBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XHJcbiAgICAgIGlmIChjdXJyZW50QnVmZmVyRGlzcG9zYWJsZSkgY3VycmVudEJ1ZmZlckRpc3Bvc2FibGUuZGlzcG9zZSgpO1xyXG4gICAgfSlcclxuICApO1xyXG5cclxuICBzdGF0dXNCYXJJdGVtLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgY29uc3QgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xyXG4gICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaChcclxuICAgICAgYXRvbS52aWV3cy5nZXRWaWV3KGVkaXRvciksXHJcbiAgICAgICdsaW5lLWVuZGluZy1zZWxlY3RvcjpzaG93J1xyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgbGV0IHRpbGUgPSBzdGF0dXNCYXIuYWRkUmlnaHRUaWxlKHsgaXRlbTogc3RhdHVzQmFySXRlbSwgcHJpb3JpdHk6IDIwMCB9KTtcclxuICBkaXNwb3NhYmxlcy5hZGQobmV3IERpc3Bvc2FibGUoKCkgPT4gdGlsZS5kZXN0cm95KCkpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdExpbmVFbmRpbmcoKSB7XHJcbiAgc3dpdGNoIChhdG9tLmNvbmZpZy5nZXQoJ2xpbmUtZW5kaW5nLXNlbGVjdG9yLmRlZmF1bHRMaW5lRW5kaW5nJykpIHtcclxuICAgIGNhc2UgJ0xGJzpcclxuICAgICAgcmV0dXJuICdcXG4nO1xyXG4gICAgY2FzZSAnQ1JMRic6XHJcbiAgICAgIHJldHVybiAnXFxyXFxuJztcclxuICAgIGNhc2UgJ09TIERlZmF1bHQnOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIGhlbHBlcnMuZ2V0UHJvY2Vzc1BsYXRmb3JtKCkgPT09ICd3aW4zMicgPyAnXFxyXFxuJyA6ICdcXG4nO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TGluZUVuZGluZ3MoYnVmZmVyKSB7XHJcbiAgaWYgKHR5cGVvZiBidWZmZXIuZmluZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtidWZmZXIuZmluZChMRlJlZ0V4cCksIGJ1ZmZlci5maW5kKENSTEZSZWdFeHApXSkudGhlbihcclxuICAgICAgKFtoYXNMRiwgaGFzQ1JMRl0pID0+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgaWYgKGhhc0xGKSByZXN1bHQuYWRkKCdcXG4nKTtcclxuICAgICAgICBpZiAoaGFzQ1JMRikgcmVzdWx0LmFkZCgnXFxyXFxuJyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0KCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyLmdldExpbmVDb3VudCgpIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgcmVzdWx0LmFkZChidWZmZXIubGluZUVuZGluZ0ZvclJvdyhpKSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0TGluZUVuZGluZyhpdGVtLCBsaW5lRW5kaW5nKSB7XHJcbiAgaWYgKGl0ZW0gJiYgaXRlbS5nZXRCdWZmZXIpIHtcclxuICAgIGxldCBidWZmZXIgPSBpdGVtLmdldEJ1ZmZlcigpO1xyXG4gICAgYnVmZmVyLnNldFByZWZlcnJlZExpbmVFbmRpbmcobGluZUVuZGluZyk7XHJcbiAgICBidWZmZXIuc2V0VGV4dChidWZmZXIuZ2V0VGV4dCgpLnJlcGxhY2UoTGluZUVuZGluZ1JlZ0V4cCwgbGluZUVuZGluZykpO1xyXG4gIH1cclxufVxyXG4iXX0=