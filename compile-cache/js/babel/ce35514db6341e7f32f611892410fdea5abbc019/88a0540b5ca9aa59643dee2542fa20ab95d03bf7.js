Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atom = require('atom');

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

'use babel';

var MAX_BUFFER_LENGTH_TO_DIFF = 2 * 1024 * 1024;

/**
 * @describe Handles per-editor event and repository subscriptions.
 * @param editor {Atom.TextEditor} - The editor this view will manage.
 */

var GitDiffView = (function () {
  function GitDiffView(editor, editorElement) {
    _classCallCheck(this, GitDiffView);

    // These are the only members guaranteed to exist.
    this.subscriptions = new _atom.CompositeDisposable();
    this.editor = editor;
    this.editorElement = editorElement;
    this.repository = null;
    this.markers = new Map();

    // Assign `null` to all possible child vars here so the JS engine doesn't
    // have to re-evaluate the microcode when we do eventually need them.
    this.releaseChildren();

    // I know this looks janky but it works. Class methods are available
    // before the constructor is executed. It's a micro-opt above lambdas.
    var subscribeToRepository = this.subscribeToRepository.bind(this);
    // WARNING: This gets handed to requestAnimationFrame, so it must be bound.
    this.updateDiffs = this.updateDiffs.bind(this);

    subscribeToRepository();

    this.subscriptions.add(atom.project.onDidChangePaths(subscribeToRepository));
  }

  /**
   * @describe Handles tear down of destructables and subscriptions.
   *   Does not handle release of memory. This method should only be called
   *   just before this object is freed, and should only tear down the main
   *   object components that are guarunteed to exist at all times.
   */

  _createClass(GitDiffView, [{
    key: 'destroy',
    value: function destroy() {
      this.subscriptions.dispose();
      this.destroyChildren();
      this.markers.clear();
    }

    /**
     * @describe Destroys this objects children (non-freeing), it's intended
     *   to be an ease-of use function for maintaing this object. This method
     *   should only tear down objects that are selectively allocated upon
     *   repository discovery.
     *
     *   Example: this.diffs only exists when we have a repository.
     */
  }, {
    key: 'destroyChildren',
    value: function destroyChildren() {
      if (this._animationId) cancelAnimationFrame(this._animationId);

      if (this.diffs) for (var diff of this.diffs) {
        this.markers.get(diff).destroy();
      }
    }

    /**
     * @describe The memory releasing complement function of `destroyChildren`.
     *   frees the memory allocated at all child object storage locations
     *   when there is no repository.
     */
  }, {
    key: 'releaseChildren',
    value: function releaseChildren() {
      this.diffs = null;
      this._repoSubs = null;
      this._animationId = null;
      this.editorPath = null;
      this.buffer = null;
    }

    /**
     * @describe handles all subscriptions based on the repository in focus
     */
  }, {
    key: 'subscribeToRepository',
    value: _asyncToGenerator(function* () {
      var _this = this;

      if (this._repoSubs !== null) {
        this._repoSubs.dispose();
        this.subscriptions.remove(this._repoSubs);
      }

      // Don't cache the path unless we know we need it.
      var editorPath = this.editor.getPath();

      this.repository = yield (0, _helpers2['default'])(editorPath);
      if (this.repository !== null) {
        (function () {
          _this.editorPath = editorPath;
          _this.buffer = _this.editor.getBuffer();

          var subscribeToRepository = _this.subscribeToRepository.bind(_this);
          var updateIconDecoration = _this.updateIconDecoration.bind(_this);
          var scheduleUpdate = _this.scheduleUpdate.bind(_this);

          _this._repoSubs = new _atom.CompositeDisposable(_this.repository.onDidDestroy(subscribeToRepository), _this.repository.onDidChangeStatuses(scheduleUpdate), _this.repository.onDidChangeStatus(function (changedPath) {
            if (changedPath === _this.editorPath) scheduleUpdate();
          }), _this.editor.onDidStopChanging(scheduleUpdate), _this.editor.onDidChangePath(function () {
            _this.editorPath = _this.editor.getPath();
            _this.buffer = _this.editor.getBuffer();
            scheduleUpdate();
          }), atom.commands.add(_this.editorElement, 'git-diff:move-to-next-diff', _this.moveToNextDiff.bind(_this)), atom.commands.add(_this.editorElement, 'git-diff:move-to-previous-diff', _this.moveToPreviousDiff.bind(_this)), atom.config.onDidChange('git-diff.showIconsInEditorGutter', updateIconDecoration), atom.config.onDidChange('editor.showLineNumbers', updateIconDecoration), _this.editorElement.onDidAttach(updateIconDecoration));

          // Every time the repo is changed, the editor needs to be reinitialized.
          _this.subscriptions.add(_this._repoSubs);

          updateIconDecoration();
          scheduleUpdate();
        })();
      } else {
        this.destroyChildren();
        this.releaseChildren();
      }
    })
  }, {
    key: 'moveToNextDiff',
    value: function moveToNextDiff() {
      var cursorLineNumber = this.editor.getCursorBufferPosition().row + 1;
      var nextDiffLineNumber = null;
      var firstDiffLineNumber = null;

      for (var _ref2 of this.diffs) {
        var newStart = _ref2.newStart;

        if (newStart > cursorLineNumber) {
          if (nextDiffLineNumber == null) nextDiffLineNumber = newStart - 1;

          nextDiffLineNumber = Math.min(newStart - 1, nextDiffLineNumber);
        }

        if (firstDiffLineNumber == null) firstDiffLineNumber = newStart - 1;

        firstDiffLineNumber = Math.min(newStart - 1, firstDiffLineNumber);
      }

      // Wrap around to the first diff in the file
      if (atom.config.get('git-diff.wrapAroundOnMoveToDiff') && nextDiffLineNumber == null) {
        nextDiffLineNumber = firstDiffLineNumber;
      }

      this.moveToLineNumber(nextDiffLineNumber);
    }
  }, {
    key: 'moveToPreviousDiff',
    value: function moveToPreviousDiff() {
      var cursorLineNumber = this.editor.getCursorBufferPosition().row + 1;
      var previousDiffLineNumber = null;
      var lastDiffLineNumber = null;
      for (var _ref32 of this.diffs) {
        var newStart = _ref32.newStart;

        if (newStart < cursorLineNumber) {
          previousDiffLineNumber = Math.max(newStart - 1, previousDiffLineNumber);
        }
        lastDiffLineNumber = Math.max(newStart - 1, lastDiffLineNumber);
      }

      // Wrap around to the last diff in the file
      if (atom.config.get('git-diff.wrapAroundOnMoveToDiff') && previousDiffLineNumber === null) {
        previousDiffLineNumber = lastDiffLineNumber;
      }

      this.moveToLineNumber(previousDiffLineNumber);
    }
  }, {
    key: 'updateIconDecoration',
    value: function updateIconDecoration() {
      var gutter = this.editorElement.querySelector('.gutter');
      if (gutter) {
        if (atom.config.get('editor.showLineNumbers') && atom.config.get('git-diff.showIconsInEditorGutter')) {
          gutter.classList.add('git-diff-icon');
        } else {
          gutter.classList.remove('git-diff-icon');
        }
      }
    }
  }, {
    key: 'moveToLineNumber',
    value: function moveToLineNumber(lineNumber) {
      if (lineNumber !== null) {
        this.editor.setCursorBufferPosition([lineNumber, 0]);
        this.editor.moveToFirstCharacterOfLine();
      }
    }
  }, {
    key: 'scheduleUpdate',
    value: function scheduleUpdate() {
      // Use Chromium native requestAnimationFrame because it yields
      // to the browser, is standard and doesn't involve extra JS overhead.
      if (this._animationId) cancelAnimationFrame(this._animationId);

      this._animationId = requestAnimationFrame(this.updateDiffs);
    }

    /**
     * @describe Uses text markers in the target editor to visualize
     *   git modifications, additions, and deletions. The current algorithm
     *   just redraws the markers each call.
     */
  }, {
    key: 'updateDiffs',
    value: function updateDiffs() {
      if (this.buffer.getLength() < MAX_BUFFER_LENGTH_TO_DIFF) {
        // Before we redraw the diffs, tear down the old markers.
        if (this.diffs) for (var diff of this.diffs) {
          this.markers.get(diff).destroy();
        }this.markers.clear();

        var text = this.buffer.getText();
        this.diffs = this.repository.getLineDiffs(this.editorPath, text);
        this.diffs = this.diffs || []; // Sanitize type to array.

        for (var diff of this.diffs) {
          var newStart = diff.newStart;
          var oldLines = diff.oldLines;
          var newLines = diff.newLines;

          var startRow = newStart - 1;
          var endRow = newStart + newLines - 1;

          var mark = undefined;

          if (oldLines === 0 && newLines > 0) {
            mark = this.markRange(startRow, endRow, 'git-line-added');
          } else if (newLines === 0 && oldLines > 0) {
            if (startRow < 0) {
              mark = this.markRange(0, 0, 'git-previous-line-removed');
            } else {
              mark = this.markRange(startRow, startRow, 'git-line-removed');
            }
          } else {
            mark = this.markRange(startRow, endRow, 'git-line-modified');
          }

          this.markers.set(diff, mark);
        }
      }
    }
  }, {
    key: 'markRange',
    value: function markRange(startRow, endRow, klass) {
      var marker = this.editor.markBufferRange([[startRow, 0], [endRow, 0]], {
        invalidate: 'never'
      });
      this.editor.decorateMarker(marker, { type: 'line-number', 'class': klass });
      return marker;
    }
  }]);

  return GitDiffView;
})();

exports['default'] = GitDiffView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZ2l0LWRpZmYvbGliL2dpdC1kaWZmLXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUVvQyxNQUFNOzt1QkFDWixXQUFXOzs7O0FBSHpDLFdBQVcsQ0FBQzs7QUFLWixJQUFNLHlCQUF5QixHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0lBTTdCLFdBQVc7QUFDbkIsV0FEUSxXQUFXLENBQ2xCLE1BQU0sRUFBRSxhQUFhLEVBQUU7MEJBRGhCLFdBQVc7OztBQUc1QixRQUFJLENBQUMsYUFBYSxHQUFHLCtCQUF5QixDQUFDO0FBQy9DLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ25DLFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7OztBQUl6QixRQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7QUFJdkIsUUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVwRSxRQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUvQyx5QkFBcUIsRUFBRSxDQUFDOztBQUV4QixRQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUNyRCxDQUFDO0dBQ0g7Ozs7Ozs7OztlQXhCa0IsV0FBVzs7V0FnQ3ZCLG1CQUFHO0FBQ1IsVUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixVQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7QUFD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QUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZFLGtCQUFVLEVBQUUsT0FBTztPQUNwQixDQUFDLENBQUM7QUFDSCxVQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQU8sS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMxRSxhQUFPLE1BQU0sQ0FBQztLQUNmOzs7U0E5UGtCLFdBQVc7OztxQkFBWCxXQUFXIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZ2l0LWRpZmYvbGliL2dpdC1kaWZmLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcclxuaW1wb3J0IHJlcG9zaXRvcnlGb3JQYXRoIGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5jb25zdCBNQVhfQlVGRkVSX0xFTkdUSF9UT19ESUZGID0gMiAqIDEwMjQgKiAxMDI0O1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmliZSBIYW5kbGVzIHBlci1lZGl0b3IgZXZlbnQgYW5kIHJlcG9zaXRvcnkgc3Vic2NyaXB0aW9ucy5cclxuICogQHBhcmFtIGVkaXRvciB7QXRvbS5UZXh0RWRpdG9yfSAtIFRoZSBlZGl0b3IgdGhpcyB2aWV3IHdpbGwgbWFuYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2l0RGlmZlZpZXcge1xyXG4gIGNvbnN0cnVjdG9yKGVkaXRvciwgZWRpdG9yRWxlbWVudCkge1xyXG4gICAgLy8gVGhlc2UgYXJlIHRoZSBvbmx5IG1lbWJlcnMgZ3VhcmFudGVlZCB0byBleGlzdC5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XHJcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcclxuICAgIHRoaXMuZWRpdG9yRWxlbWVudCA9IGVkaXRvckVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlcG9zaXRvcnkgPSBudWxsO1xyXG4gICAgdGhpcy5tYXJrZXJzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIC8vIEFzc2lnbiBgbnVsbGAgdG8gYWxsIHBvc3NpYmxlIGNoaWxkIHZhcnMgaGVyZSBzbyB0aGUgSlMgZW5naW5lIGRvZXNuJ3RcclxuICAgIC8vIGhhdmUgdG8gcmUtZXZhbHVhdGUgdGhlIG1pY3JvY29kZSB3aGVuIHdlIGRvIGV2ZW50dWFsbHkgbmVlZCB0aGVtLlxyXG4gICAgdGhpcy5yZWxlYXNlQ2hpbGRyZW4oKTtcclxuXHJcbiAgICAvLyBJIGtub3cgdGhpcyBsb29rcyBqYW5reSBidXQgaXQgd29ya3MuIENsYXNzIG1ldGhvZHMgYXJlIGF2YWlsYWJsZVxyXG4gICAgLy8gYmVmb3JlIHRoZSBjb25zdHJ1Y3RvciBpcyBleGVjdXRlZC4gSXQncyBhIG1pY3JvLW9wdCBhYm92ZSBsYW1iZGFzLlxyXG4gICAgY29uc3Qgc3Vic2NyaWJlVG9SZXBvc2l0b3J5ID0gdGhpcy5zdWJzY3JpYmVUb1JlcG9zaXRvcnkuYmluZCh0aGlzKTtcclxuICAgIC8vIFdBUk5JTkc6IFRoaXMgZ2V0cyBoYW5kZWQgdG8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBzbyBpdCBtdXN0IGJlIGJvdW5kLlxyXG4gICAgdGhpcy51cGRhdGVEaWZmcyA9IHRoaXMudXBkYXRlRGlmZnMuYmluZCh0aGlzKTtcclxuXHJcbiAgICBzdWJzY3JpYmVUb1JlcG9zaXRvcnkoKTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxyXG4gICAgICBhdG9tLnByb2plY3Qub25EaWRDaGFuZ2VQYXRocyhzdWJzY3JpYmVUb1JlcG9zaXRvcnkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaWJlIEhhbmRsZXMgdGVhciBkb3duIG9mIGRlc3RydWN0YWJsZXMgYW5kIHN1YnNjcmlwdGlvbnMuXHJcbiAgICogICBEb2VzIG5vdCBoYW5kbGUgcmVsZWFzZSBvZiBtZW1vcnkuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZFxyXG4gICAqICAganVzdCBiZWZvcmUgdGhpcyBvYmplY3QgaXMgZnJlZWQsIGFuZCBzaG91bGQgb25seSB0ZWFyIGRvd24gdGhlIG1haW5cclxuICAgKiAgIG9iamVjdCBjb21wb25lbnRzIHRoYXQgYXJlIGd1YXJ1bnRlZWQgdG8gZXhpc3QgYXQgYWxsIHRpbWVzLlxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcclxuICAgIHRoaXMubWFya2Vycy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaWJlIERlc3Ryb3lzIHRoaXMgb2JqZWN0cyBjaGlsZHJlbiAobm9uLWZyZWVpbmcpLCBpdCdzIGludGVuZGVkXHJcbiAgICogICB0byBiZSBhbiBlYXNlLW9mIHVzZSBmdW5jdGlvbiBmb3IgbWFpbnRhaW5nIHRoaXMgb2JqZWN0LiBUaGlzIG1ldGhvZFxyXG4gICAqICAgc2hvdWxkIG9ubHkgdGVhciBkb3duIG9iamVjdHMgdGhhdCBhcmUgc2VsZWN0aXZlbHkgYWxsb2NhdGVkIHVwb25cclxuICAgKiAgIHJlcG9zaXRvcnkgZGlzY292ZXJ5LlxyXG4gICAqXHJcbiAgICogICBFeGFtcGxlOiB0aGlzLmRpZmZzIG9ubHkgZXhpc3RzIHdoZW4gd2UgaGF2ZSBhIHJlcG9zaXRvcnkuXHJcbiAgICovXHJcbiAgZGVzdHJveUNoaWxkcmVuKCkge1xyXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbklkKSBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25JZCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGlmZnMpXHJcbiAgICAgIGZvciAoY29uc3QgZGlmZiBvZiB0aGlzLmRpZmZzKSB0aGlzLm1hcmtlcnMuZ2V0KGRpZmYpLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmliZSBUaGUgbWVtb3J5IHJlbGVhc2luZyBjb21wbGVtZW50IGZ1bmN0aW9uIG9mIGBkZXN0cm95Q2hpbGRyZW5gLlxyXG4gICAqICAgZnJlZXMgdGhlIG1lbW9yeSBhbGxvY2F0ZWQgYXQgYWxsIGNoaWxkIG9iamVjdCBzdG9yYWdlIGxvY2F0aW9uc1xyXG4gICAqICAgd2hlbiB0aGVyZSBpcyBubyByZXBvc2l0b3J5LlxyXG4gICAqL1xyXG4gIHJlbGVhc2VDaGlsZHJlbigpIHtcclxuICAgIHRoaXMuZGlmZnMgPSBudWxsO1xyXG4gICAgdGhpcy5fcmVwb1N1YnMgPSBudWxsO1xyXG4gICAgdGhpcy5fYW5pbWF0aW9uSWQgPSBudWxsO1xyXG4gICAgdGhpcy5lZGl0b3JQYXRoID0gbnVsbDtcclxuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmliZSBoYW5kbGVzIGFsbCBzdWJzY3JpcHRpb25zIGJhc2VkIG9uIHRoZSByZXBvc2l0b3J5IGluIGZvY3VzXHJcbiAgICovXHJcbiAgYXN5bmMgc3Vic2NyaWJlVG9SZXBvc2l0b3J5KCkge1xyXG4gICAgaWYgKHRoaXMuX3JlcG9TdWJzICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3JlcG9TdWJzLmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnJlbW92ZSh0aGlzLl9yZXBvU3Vicyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRG9uJ3QgY2FjaGUgdGhlIHBhdGggdW5sZXNzIHdlIGtub3cgd2UgbmVlZCBpdC5cclxuICAgIGxldCBlZGl0b3JQYXRoID0gdGhpcy5lZGl0b3IuZ2V0UGF0aCgpO1xyXG5cclxuICAgIHRoaXMucmVwb3NpdG9yeSA9IGF3YWl0IHJlcG9zaXRvcnlGb3JQYXRoKGVkaXRvclBhdGgpO1xyXG4gICAgaWYgKHRoaXMucmVwb3NpdG9yeSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmVkaXRvclBhdGggPSBlZGl0b3JQYXRoO1xyXG4gICAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuZWRpdG9yLmdldEJ1ZmZlcigpO1xyXG5cclxuICAgICAgY29uc3Qgc3Vic2NyaWJlVG9SZXBvc2l0b3J5ID0gdGhpcy5zdWJzY3JpYmVUb1JlcG9zaXRvcnkuYmluZCh0aGlzKTtcclxuICAgICAgY29uc3QgdXBkYXRlSWNvbkRlY29yYXRpb24gPSB0aGlzLnVwZGF0ZUljb25EZWNvcmF0aW9uLmJpbmQodGhpcyk7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlVXBkYXRlID0gdGhpcy5zY2hlZHVsZVVwZGF0ZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5fcmVwb1N1YnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZShcclxuICAgICAgICB0aGlzLnJlcG9zaXRvcnkub25EaWREZXN0cm95KHN1YnNjcmliZVRvUmVwb3NpdG9yeSksXHJcbiAgICAgICAgdGhpcy5yZXBvc2l0b3J5Lm9uRGlkQ2hhbmdlU3RhdHVzZXMoc2NoZWR1bGVVcGRhdGUpLFxyXG4gICAgICAgIHRoaXMucmVwb3NpdG9yeS5vbkRpZENoYW5nZVN0YXR1cyhjaGFuZ2VkUGF0aCA9PiB7XHJcbiAgICAgICAgICBpZiAoY2hhbmdlZFBhdGggPT09IHRoaXMuZWRpdG9yUGF0aCkgc2NoZWR1bGVVcGRhdGUoKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICB0aGlzLmVkaXRvci5vbkRpZFN0b3BDaGFuZ2luZyhzY2hlZHVsZVVwZGF0ZSksXHJcbiAgICAgICAgdGhpcy5lZGl0b3Iub25EaWRDaGFuZ2VQYXRoKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZWRpdG9yUGF0aCA9IHRoaXMuZWRpdG9yLmdldFBhdGgoKTtcclxuICAgICAgICAgIHRoaXMuYnVmZmVyID0gdGhpcy5lZGl0b3IuZ2V0QnVmZmVyKCk7XHJcbiAgICAgICAgICBzY2hlZHVsZVVwZGF0ZSgpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGF0b20uY29tbWFuZHMuYWRkKFxyXG4gICAgICAgICAgdGhpcy5lZGl0b3JFbGVtZW50LFxyXG4gICAgICAgICAgJ2dpdC1kaWZmOm1vdmUtdG8tbmV4dC1kaWZmJyxcclxuICAgICAgICAgIHRoaXMubW92ZVRvTmV4dERpZmYuYmluZCh0aGlzKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgYXRvbS5jb21tYW5kcy5hZGQoXHJcbiAgICAgICAgICB0aGlzLmVkaXRvckVsZW1lbnQsXHJcbiAgICAgICAgICAnZ2l0LWRpZmY6bW92ZS10by1wcmV2aW91cy1kaWZmJyxcclxuICAgICAgICAgIHRoaXMubW92ZVRvUHJldmlvdXNEaWZmLmJpbmQodGhpcylcclxuICAgICAgICApLFxyXG4gICAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKFxyXG4gICAgICAgICAgJ2dpdC1kaWZmLnNob3dJY29uc0luRWRpdG9yR3V0dGVyJyxcclxuICAgICAgICAgIHVwZGF0ZUljb25EZWNvcmF0aW9uXHJcbiAgICAgICAgKSxcclxuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnZWRpdG9yLnNob3dMaW5lTnVtYmVycycsIHVwZGF0ZUljb25EZWNvcmF0aW9uKSxcclxuICAgICAgICB0aGlzLmVkaXRvckVsZW1lbnQub25EaWRBdHRhY2godXBkYXRlSWNvbkRlY29yYXRpb24pXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBFdmVyeSB0aW1lIHRoZSByZXBvIGlzIGNoYW5nZWQsIHRoZSBlZGl0b3IgbmVlZHMgdG8gYmUgcmVpbml0aWFsaXplZC5cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZCh0aGlzLl9yZXBvU3Vicyk7XHJcblxyXG4gICAgICB1cGRhdGVJY29uRGVjb3JhdGlvbigpO1xyXG4gICAgICBzY2hlZHVsZVVwZGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcclxuICAgICAgdGhpcy5yZWxlYXNlQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVUb05leHREaWZmKCkge1xyXG4gICAgY29uc3QgY3Vyc29yTGluZU51bWJlciA9IHRoaXMuZWRpdG9yLmdldEN1cnNvckJ1ZmZlclBvc2l0aW9uKCkucm93ICsgMTtcclxuICAgIGxldCBuZXh0RGlmZkxpbmVOdW1iZXIgPSBudWxsO1xyXG4gICAgbGV0IGZpcnN0RGlmZkxpbmVOdW1iZXIgPSBudWxsO1xyXG5cclxuICAgIGZvciAoY29uc3QgeyBuZXdTdGFydCB9IG9mIHRoaXMuZGlmZnMpIHtcclxuICAgICAgaWYgKG5ld1N0YXJ0ID4gY3Vyc29yTGluZU51bWJlcikge1xyXG4gICAgICAgIGlmIChuZXh0RGlmZkxpbmVOdW1iZXIgPT0gbnVsbCkgbmV4dERpZmZMaW5lTnVtYmVyID0gbmV3U3RhcnQgLSAxO1xyXG5cclxuICAgICAgICBuZXh0RGlmZkxpbmVOdW1iZXIgPSBNYXRoLm1pbihuZXdTdGFydCAtIDEsIG5leHREaWZmTGluZU51bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaXJzdERpZmZMaW5lTnVtYmVyID09IG51bGwpIGZpcnN0RGlmZkxpbmVOdW1iZXIgPSBuZXdTdGFydCAtIDE7XHJcblxyXG4gICAgICBmaXJzdERpZmZMaW5lTnVtYmVyID0gTWF0aC5taW4obmV3U3RhcnQgLSAxLCBmaXJzdERpZmZMaW5lTnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXcmFwIGFyb3VuZCB0byB0aGUgZmlyc3QgZGlmZiBpbiB0aGUgZmlsZVxyXG4gICAgaWYgKFxyXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoJ2dpdC1kaWZmLndyYXBBcm91bmRPbk1vdmVUb0RpZmYnKSAmJlxyXG4gICAgICBuZXh0RGlmZkxpbmVOdW1iZXIgPT0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgIG5leHREaWZmTGluZU51bWJlciA9IGZpcnN0RGlmZkxpbmVOdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb3ZlVG9MaW5lTnVtYmVyKG5leHREaWZmTGluZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICBtb3ZlVG9QcmV2aW91c0RpZmYoKSB7XHJcbiAgICBjb25zdCBjdXJzb3JMaW5lTnVtYmVyID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKS5yb3cgKyAxO1xyXG4gICAgbGV0IHByZXZpb3VzRGlmZkxpbmVOdW1iZXIgPSBudWxsO1xyXG4gICAgbGV0IGxhc3REaWZmTGluZU51bWJlciA9IG51bGw7XHJcbiAgICBmb3IgKGNvbnN0IHsgbmV3U3RhcnQgfSBvZiB0aGlzLmRpZmZzKSB7XHJcbiAgICAgIGlmIChuZXdTdGFydCA8IGN1cnNvckxpbmVOdW1iZXIpIHtcclxuICAgICAgICBwcmV2aW91c0RpZmZMaW5lTnVtYmVyID0gTWF0aC5tYXgobmV3U3RhcnQgLSAxLCBwcmV2aW91c0RpZmZMaW5lTnVtYmVyKTtcclxuICAgICAgfVxyXG4gICAgICBsYXN0RGlmZkxpbmVOdW1iZXIgPSBNYXRoLm1heChuZXdTdGFydCAtIDEsIGxhc3REaWZmTGluZU51bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV3JhcCBhcm91bmQgdG8gdGhlIGxhc3QgZGlmZiBpbiB0aGUgZmlsZVxyXG4gICAgaWYgKFxyXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoJ2dpdC1kaWZmLndyYXBBcm91bmRPbk1vdmVUb0RpZmYnKSAmJlxyXG4gICAgICBwcmV2aW91c0RpZmZMaW5lTnVtYmVyID09PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgcHJldmlvdXNEaWZmTGluZU51bWJlciA9IGxhc3REaWZmTGluZU51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vdmVUb0xpbmVOdW1iZXIocHJldmlvdXNEaWZmTGluZU51bWJlcik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJY29uRGVjb3JhdGlvbigpIHtcclxuICAgIGNvbnN0IGd1dHRlciA9IHRoaXMuZWRpdG9yRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZ3V0dGVyJyk7XHJcbiAgICBpZiAoZ3V0dGVyKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBhdG9tLmNvbmZpZy5nZXQoJ2VkaXRvci5zaG93TGluZU51bWJlcnMnKSAmJlxyXG4gICAgICAgIGF0b20uY29uZmlnLmdldCgnZ2l0LWRpZmYuc2hvd0ljb25zSW5FZGl0b3JHdXR0ZXInKVxyXG4gICAgICApIHtcclxuICAgICAgICBndXR0ZXIuY2xhc3NMaXN0LmFkZCgnZ2l0LWRpZmYtaWNvbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGd1dHRlci5jbGFzc0xpc3QucmVtb3ZlKCdnaXQtZGlmZi1pY29uJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVUb0xpbmVOdW1iZXIobGluZU51bWJlcikge1xyXG4gICAgaWYgKGxpbmVOdW1iZXIgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5lZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oW2xpbmVOdW1iZXIsIDBdKTtcclxuICAgICAgdGhpcy5lZGl0b3IubW92ZVRvRmlyc3RDaGFyYWN0ZXJPZkxpbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjaGVkdWxlVXBkYXRlKCkge1xyXG4gICAgLy8gVXNlIENocm9taXVtIG5hdGl2ZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYmVjYXVzZSBpdCB5aWVsZHNcclxuICAgIC8vIHRvIHRoZSBicm93c2VyLCBpcyBzdGFuZGFyZCBhbmQgZG9lc24ndCBpbnZvbHZlIGV4dHJhIEpTIG92ZXJoZWFkLlxyXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbklkKSBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRpb25JZCk7XHJcblxyXG4gICAgdGhpcy5fYW5pbWF0aW9uSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEaWZmcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpYmUgVXNlcyB0ZXh0IG1hcmtlcnMgaW4gdGhlIHRhcmdldCBlZGl0b3IgdG8gdmlzdWFsaXplXHJcbiAgICogICBnaXQgbW9kaWZpY2F0aW9ucywgYWRkaXRpb25zLCBhbmQgZGVsZXRpb25zLiBUaGUgY3VycmVudCBhbGdvcml0aG1cclxuICAgKiAgIGp1c3QgcmVkcmF3cyB0aGUgbWFya2VycyBlYWNoIGNhbGwuXHJcbiAgICovXHJcbiAgdXBkYXRlRGlmZnMoKSB7XHJcbiAgICBpZiAodGhpcy5idWZmZXIuZ2V0TGVuZ3RoKCkgPCBNQVhfQlVGRkVSX0xFTkdUSF9UT19ESUZGKSB7XHJcbiAgICAgIC8vIEJlZm9yZSB3ZSByZWRyYXcgdGhlIGRpZmZzLCB0ZWFyIGRvd24gdGhlIG9sZCBtYXJrZXJzLlxyXG4gICAgICBpZiAodGhpcy5kaWZmcylcclxuICAgICAgICBmb3IgKGNvbnN0IGRpZmYgb2YgdGhpcy5kaWZmcykgdGhpcy5tYXJrZXJzLmdldChkaWZmKS5kZXN0cm95KCk7XHJcblxyXG4gICAgICB0aGlzLm1hcmtlcnMuY2xlYXIoKTtcclxuXHJcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmJ1ZmZlci5nZXRUZXh0KCk7XHJcbiAgICAgIHRoaXMuZGlmZnMgPSB0aGlzLnJlcG9zaXRvcnkuZ2V0TGluZURpZmZzKHRoaXMuZWRpdG9yUGF0aCwgdGV4dCk7XHJcbiAgICAgIHRoaXMuZGlmZnMgPSB0aGlzLmRpZmZzIHx8IFtdOyAvLyBTYW5pdGl6ZSB0eXBlIHRvIGFycmF5LlxyXG5cclxuICAgICAgZm9yIChjb25zdCBkaWZmIG9mIHRoaXMuZGlmZnMpIHtcclxuICAgICAgICBjb25zdCB7IG5ld1N0YXJ0LCBvbGRMaW5lcywgbmV3TGluZXMgfSA9IGRpZmY7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRSb3cgPSBuZXdTdGFydCAtIDE7XHJcbiAgICAgICAgY29uc3QgZW5kUm93ID0gbmV3U3RhcnQgKyBuZXdMaW5lcyAtIDE7XHJcblxyXG4gICAgICAgIGxldCBtYXJrO1xyXG5cclxuICAgICAgICBpZiAob2xkTGluZXMgPT09IDAgJiYgbmV3TGluZXMgPiAwKSB7XHJcbiAgICAgICAgICBtYXJrID0gdGhpcy5tYXJrUmFuZ2Uoc3RhcnRSb3csIGVuZFJvdywgJ2dpdC1saW5lLWFkZGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChuZXdMaW5lcyA9PT0gMCAmJiBvbGRMaW5lcyA+IDApIHtcclxuICAgICAgICAgIGlmIChzdGFydFJvdyA8IDApIHtcclxuICAgICAgICAgICAgbWFyayA9IHRoaXMubWFya1JhbmdlKDAsIDAsICdnaXQtcHJldmlvdXMtbGluZS1yZW1vdmVkJyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXJrID0gdGhpcy5tYXJrUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Um93LCAnZ2l0LWxpbmUtcmVtb3ZlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXJrID0gdGhpcy5tYXJrUmFuZ2Uoc3RhcnRSb3csIGVuZFJvdywgJ2dpdC1saW5lLW1vZGlmaWVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hcmtlcnMuc2V0KGRpZmYsIG1hcmspO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYXJrUmFuZ2Uoc3RhcnRSb3csIGVuZFJvdywga2xhc3MpIHtcclxuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMuZWRpdG9yLm1hcmtCdWZmZXJSYW5nZShbW3N0YXJ0Um93LCAwXSwgW2VuZFJvdywgMF1dLCB7XHJcbiAgICAgIGludmFsaWRhdGU6ICduZXZlcidcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lZGl0b3IuZGVjb3JhdGVNYXJrZXIobWFya2VyLCB7IHR5cGU6ICdsaW5lLW51bWJlcicsIGNsYXNzOiBrbGFzcyB9KTtcclxuICAgIHJldHVybiBtYXJrZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ==