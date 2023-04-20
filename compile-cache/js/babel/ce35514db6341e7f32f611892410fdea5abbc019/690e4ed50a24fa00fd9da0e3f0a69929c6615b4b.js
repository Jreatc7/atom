Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

'use babel';

var DiffListView = (function () {
  function DiffListView() {
    var _this = this;

    _classCallCheck(this, DiffListView);

    this.selectListView = new _atomSelectList2['default']({
      emptyMessage: 'No diffs in file',
      items: [],
      filterKeyForItem: function filterKeyForItem(diff) {
        return diff.lineText;
      },
      elementForItem: function elementForItem(diff) {
        var li = document.createElement('li');
        li.classList.add('two-lines');

        var primaryLine = document.createElement('div');
        primaryLine.classList.add('primary-line');
        primaryLine.textContent = diff.lineText;
        li.appendChild(primaryLine);

        var secondaryLine = document.createElement('div');
        secondaryLine.classList.add('secondary-line');
        secondaryLine.textContent = '-' + diff.oldStart + ',' + diff.oldLines + ' +' + diff.newStart + ',' + diff.newLines;
        li.appendChild(secondaryLine);

        return li;
      },
      didConfirmSelection: function didConfirmSelection(diff) {
        _this.cancel();
        var bufferRow = diff.newStart > 0 ? diff.newStart - 1 : diff.newStart;
        _this.editor.setCursorBufferPosition([bufferRow, 0], {
          autoscroll: true
        });
        _this.editor.moveToFirstCharacterOfLine();
      },
      didCancelSelection: function didCancelSelection() {
        _this.cancel();
      }
    });
    this.selectListView.element.classList.add('diff-list-view');
    this.panel = atom.workspace.addModalPanel({
      item: this.selectListView,
      visible: false
    });
  }

  _createClass(DiffListView, [{
    key: 'attach',
    value: function attach() {
      this.previouslyFocusedElement = document.activeElement;
      this.selectListView.reset();
      this.panel.show();
      this.selectListView.focus();
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.panel.hide();
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = null;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.cancel();
      this.panel.destroy();
      return this.selectListView.destroy();
    }
  }, {
    key: 'toggle',
    value: _asyncToGenerator(function* () {
      var editor = atom.workspace.getActiveTextEditor();
      if (this.panel.isVisible()) {
        this.cancel();
      } else if (editor) {
        this.editor = editor;
        var repository = yield (0, _helpers2['default'])(this.editor.getPath());
        var diffs = repository ? repository.getLineDiffs(this.editor.getPath(), this.editor.getText()) : [];
        if (!diffs) diffs = [];
        for (var diff of diffs) {
          var bufferRow = diff.newStart > 0 ? diff.newStart - 1 : diff.newStart;
          var lineText = this.editor.lineTextForBufferRow(bufferRow);
          diff.lineText = lineText ? lineText.trim() : '';
        }

        yield this.selectListView.update({ items: diffs });
        this.attach();
      }
    })
  }]);

  return DiffListView;
})();

exports['default'] = DiffListView;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZ2l0LWRpZmYvbGliL2RpZmYtbGlzdC12aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFFMkIsa0JBQWtCOzs7O3VCQUNmLFdBQVc7Ozs7QUFIekMsV0FBVyxDQUFDOztJQUtTLFlBQVk7QUFDcEIsV0FEUSxZQUFZLEdBQ2pCOzs7MEJBREssWUFBWTs7QUFFN0IsUUFBSSxDQUFDLGNBQWMsR0FBRyxnQ0FBbUI7QUFDdkMsa0JBQVksRUFBRSxrQkFBa0I7QUFDaEMsV0FBSyxFQUFFLEVBQUU7QUFDVCxzQkFBZ0IsRUFBRSwwQkFBQSxJQUFJO2VBQUksSUFBSSxDQUFDLFFBQVE7T0FBQTtBQUN2QyxvQkFBYyxFQUFFLHdCQUFBLElBQUksRUFBSTtBQUN0QixZQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLFVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUU5QixZQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELG1CQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQyxtQkFBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3hDLFVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRTVCLFlBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQscUJBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDOUMscUJBQWEsQ0FBQyxXQUFXLFNBQU8sSUFBSSxDQUFDLFFBQVEsU0FBSSxJQUFJLENBQUMsUUFBUSxVQUM1RCxJQUFJLENBQUMsUUFBUSxTQUNYLElBQUksQ0FB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Q0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0QsY0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNqRDs7QUFFRCxjQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDbkQsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO09BQ2Y7S0FDRjs7O1NBcEZrQixZQUFZOzs7cUJBQVosWUFBWSIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2plcHN0Ly5hdG9tL3BhY2thZ2VzL2dpdC1kaWZmL2xpYi9kaWZmLWxpc3Qtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xyXG5cclxuaW1wb3J0IFNlbGVjdExpc3RWaWV3IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xyXG5pbXBvcnQgcmVwb3NpdG9yeUZvclBhdGggZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmZMaXN0VmlldyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNlbGVjdExpc3RWaWV3ID0gbmV3IFNlbGVjdExpc3RWaWV3KHtcclxuICAgICAgZW1wdHlNZXNzYWdlOiAnTm8gZGlmZnMgaW4gZmlsZScsXHJcbiAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgZmlsdGVyS2V5Rm9ySXRlbTogZGlmZiA9PiBkaWZmLmxpbmVUZXh0LFxyXG4gICAgICBlbGVtZW50Rm9ySXRlbTogZGlmZiA9PiB7XHJcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3R3by1saW5lcycpO1xyXG5cclxuICAgICAgICBjb25zdCBwcmltYXJ5TGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHByaW1hcnlMaW5lLmNsYXNzTGlzdC5hZGQoJ3ByaW1hcnktbGluZScpO1xyXG4gICAgICAgIHByaW1hcnlMaW5lLnRleHRDb250ZW50ID0gZGlmZi5saW5lVGV4dDtcclxuICAgICAgICBsaS5hcHBlbmRDaGlsZChwcmltYXJ5TGluZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZGFyeUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzZWNvbmRhcnlMaW5lLmNsYXNzTGlzdC5hZGQoJ3NlY29uZGFyeS1saW5lJyk7XHJcbiAgICAgICAgc2Vjb25kYXJ5TGluZS50ZXh0Q29udGVudCA9IGAtJHtkaWZmLm9sZFN0YXJ0fSwke2RpZmYub2xkTGluZXN9ICske1xyXG4gICAgICAgICAgZGlmZi5uZXdTdGFydFxyXG4gICAgICAgIH0sJHtkaWZmLm5ld0xpbmVzfWA7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoc2Vjb25kYXJ5TGluZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgICAgfSxcclxuICAgICAgZGlkQ29uZmlybVNlbGVjdGlvbjogZGlmZiA9PiB7XHJcbiAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICBjb25zdCBidWZmZXJSb3cgPSBkaWZmLm5ld1N0YXJ0ID4gMCA/IGRpZmYubmV3U3RhcnQgLSAxIDogZGlmZi5uZXdTdGFydDtcclxuICAgICAgICB0aGlzLmVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihbYnVmZmVyUm93LCAwXSwge1xyXG4gICAgICAgICAgYXV0b3Njcm9sbDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZWRpdG9yLm1vdmVUb0ZpcnN0Q2hhcmFjdGVyT2ZMaW5lKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpZENhbmNlbFNlbGVjdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RMaXN0Vmlldy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RpZmYtbGlzdC12aWV3Jyk7XHJcbiAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7XHJcbiAgICAgIGl0ZW06IHRoaXMuc2VsZWN0TGlzdFZpZXcsXHJcbiAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF0dGFjaCgpIHtcclxuICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgIHRoaXMuc2VsZWN0TGlzdFZpZXcucmVzZXQoKTtcclxuICAgIHRoaXMucGFuZWwuc2hvdygpO1xyXG4gICAgdGhpcy5zZWxlY3RMaXN0Vmlldy5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgdGhpcy5wYW5lbC5oaWRlKCk7XHJcbiAgICBpZiAodGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcclxuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdExpc3RWaWV3LmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHRvZ2dsZSgpIHtcclxuICAgIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmlzVmlzaWJsZSgpKSB7XHJcbiAgICAgIHRoaXMuY2FuY2VsKCk7XHJcbiAgICB9IGVsc2UgaWYgKGVkaXRvcikge1xyXG4gICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcclxuICAgICAgY29uc3QgcmVwb3NpdG9yeSA9IGF3YWl0IHJlcG9zaXRvcnlGb3JQYXRoKHRoaXMuZWRpdG9yLmdldFBhdGgoKSk7XHJcbiAgICAgIGxldCBkaWZmcyA9IHJlcG9zaXRvcnlcclxuICAgICAgICA/IHJlcG9zaXRvcnkuZ2V0TGluZURpZmZzKHRoaXMuZWRpdG9yLmdldFBhdGgoKSwgdGhpcy5lZGl0b3IuZ2V0VGV4dCgpKVxyXG4gICAgICAgIDogW107XHJcbiAgICAgIGlmICghZGlmZnMpIGRpZmZzID0gW107XHJcbiAgICAgIGZvciAobGV0IGRpZmYgb2YgZGlmZnMpIHtcclxuICAgICAgICBjb25zdCBidWZmZXJSb3cgPSBkaWZmLm5ld1N0YXJ0ID4gMCA/IGRpZmYubmV3U3RhcnQgLSAxIDogZGlmZi5uZXdTdGFydDtcclxuICAgICAgICBjb25zdCBsaW5lVGV4dCA9IHRoaXMuZWRpdG9yLmxpbmVUZXh0Rm9yQnVmZmVyUm93KGJ1ZmZlclJvdyk7XHJcbiAgICAgICAgZGlmZi5saW5lVGV4dCA9IGxpbmVUZXh0ID8gbGluZVRleHQudHJpbSgpIDogJyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGF3YWl0IHRoaXMuc2VsZWN0TGlzdFZpZXcudXBkYXRlKHsgaXRlbXM6IGRpZmZzIH0pO1xyXG4gICAgICB0aGlzLmF0dGFjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=