Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/** @babel */

var ReporterProxy = (function () {
  function ReporterProxy() {
    _classCallCheck(this, ReporterProxy);

    this.reporter = null;
    this.queue = [];
    this.eventType = 'welcome-v1';
  }

  _createClass(ReporterProxy, [{
    key: 'setReporter',
    value: function setReporter(reporter) {
      this.reporter = reporter;
      var customEvent = undefined;

      while (customEvent = this.queue.shift()) {
        this.reporter.addCustomEvent(this.eventType, customEvent);
      }
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(action, label, value) {
      var event = { ea: action, el: label, ev: value };
      if (this.reporter) {
        this.reporter.addCustomEvent(this.eventType, event);
      } else {
        this.queue.push(event);
      }
    }
  }]);

  return ReporterProxy;
})();

exports['default'] = ReporterProxy;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvd2VsY29tZS9saWIvcmVwb3J0ZXItcHJveHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUVxQixhQUFhO0FBQ3JCLFdBRFEsYUFBYSxHQUNsQjswQkFESyxhQUFhOztBQUU5QixRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztHQUMvQjs7ZUFMa0IsYUFBYTs7V0FPckIscUJBQUMsUUFBUSxFQUFFO0FBQ3BCLFVBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLFVBQUksV0FBVyxZQUFBLENBQUM7O0FBRWhCLGFBQVEsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUc7QUFDekMsWUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztPQUMzRDtLQUNGOzs7V0FFUSxtQkFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUM5QixVQUFNLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDbkQsVUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2pCLFlBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDckQsTUFBTTtBQUNMLFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3hCO0tBQ0Y7OztTQXZCa0IsYUFBYTs7O3FCQUFiLGFBQWEiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9qZXBzdC8uYXRvbS9wYWNrYWdlcy93ZWxjb21lL2xpYi9yZXBvcnRlci1wcm94eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAYmFiZWwgKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcG9ydGVyUHJveHkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yZXBvcnRlciA9IG51bGw7XHJcbiAgICB0aGlzLnF1ZXVlID0gW107XHJcbiAgICB0aGlzLmV2ZW50VHlwZSA9ICd3ZWxjb21lLXYxJztcclxuICB9XHJcblxyXG4gIHNldFJlcG9ydGVyKHJlcG9ydGVyKSB7XHJcbiAgICB0aGlzLnJlcG9ydGVyID0gcmVwb3J0ZXI7XHJcbiAgICBsZXQgY3VzdG9tRXZlbnQ7XHJcblxyXG4gICAgd2hpbGUgKChjdXN0b21FdmVudCA9IHRoaXMucXVldWUuc2hpZnQoKSkpIHtcclxuICAgICAgdGhpcy5yZXBvcnRlci5hZGRDdXN0b21FdmVudCh0aGlzLmV2ZW50VHlwZSwgY3VzdG9tRXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VuZEV2ZW50KGFjdGlvbiwgbGFiZWwsIHZhbHVlKSB7XHJcbiAgICBjb25zdCBldmVudCA9IHsgZWE6IGFjdGlvbiwgZWw6IGxhYmVsLCBldjogdmFsdWUgfTtcclxuICAgIGlmICh0aGlzLnJlcG9ydGVyKSB7XHJcbiAgICAgIHRoaXMucmVwb3J0ZXIuYWRkQ3VzdG9tRXZlbnQodGhpcy5ldmVudFR5cGUsIGV2ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucXVldWUucHVzaChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==