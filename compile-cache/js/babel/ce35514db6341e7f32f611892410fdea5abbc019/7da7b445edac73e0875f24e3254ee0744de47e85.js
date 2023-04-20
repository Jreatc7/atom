Object.defineProperty(exports, '__esModule', {
  value: true
});
/** @babel */

var _atom = require('atom');

var reporter = undefined;

function getReporter() {
  if (!reporter) {
    var Reporter = require('./reporter');
    reporter = new Reporter();
  }
  return reporter;
}

exports['default'] = {
  activate: function activate() {
    this.subscriptions = new _atom.CompositeDisposable();

    if (!atom.config.get('exception-reporting.userId')) {
      atom.config.set('exception-reporting.userId', require('node-uuid').v4());
    }

    this.subscriptions.add(atom.onDidThrowError(function (_ref) {
      var message = _ref.message;
      var url = _ref.url;
      var line = _ref.line;
      var column = _ref.column;
      var originalError = _ref.originalError;

      try {
        getReporter().reportUncaughtException(originalError);
      } catch (secondaryException) {
        try {
          console.error('Error reporting uncaught exception', secondaryException);
          getReporter().reportUncaughtException(secondaryException);
        } catch (error) {}
      }
    }));

    if (atom.onDidFailAssertion != null) {
      this.subscriptions.add(atom.onDidFailAssertion(function (error) {
        try {
          getReporter().reportFailedAssertion(error);
        } catch (secondaryException) {
          try {
            console.error('Error reporting assertion failure', secondaryException);
            getReporter().reportUncaughtException(secondaryException);
          } catch (error) {}
        }
      }));
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZXhjZXB0aW9uLXJlcG9ydGluZy9saWIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztvQkFFb0MsTUFBTTs7QUFFMUMsSUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixTQUFTLFdBQVcsR0FBRztBQUNyQixNQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsUUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLFlBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0dBQzNCO0FBQ0QsU0FBTyxRQUFRLENBQUM7Q0FDakI7O3FCQUVjO0FBQ2IsVUFBUSxFQUFBLG9CQUFHO0FBQ1QsUUFBSSxDQUFDLGFBQWEsR0FBRywrQkFBeUIsQ0FBQzs7QUFFL0MsUUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7QUFDbEQsVUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDMUU7O0FBRUQsUUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBQyxJQUE2QyxFQUFLO1VBQWhELE9BQU8sR0FBVCxJQUE2QyxDQUEzQyxPQUFPO1VBQUUsR0FBRyxHQUFkLElBQTZDLENBQWxDLEdBQUc7VUFBRSxJQUFJLEdBQXBCLElBQTZDLENBQTdCLElBQUk7VUFBRSxNQUFNLEdBQTVCLElBQTZDLENBQXZCLE1BQU07VUFBRSxhQUFhLEdBQTNDLElBQTZDLENBQWYsYUFBYTs7QUFDL0QsVUFBSTtBQUNGLG1CQUFXLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztPQUN0RCxDQUFDLE9BQU8sa0JBQWtCLEVBQUU7QUFDM0IsWUFBSTtBQUNGLGlCQUFPLENBQUMsS0FBSyxDQUNYLG9DQUFvQyxFQUNwQyxrQkFBa0IsQ0FDbkIsQ0FBQztBQUNGLHFCQUFXLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzNELENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtPQUNuQjtLQUNGLENBQUMsQ0FDSCxDQUFDOztBQUVGLFFBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtBQUNuQyxVQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQy9CLFlBQUk7QUFDRixxQkFBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUMsQ0FBQyxPQUFPLGtCQUFrQixFQUFFO0FBQzNCLGNBQUk7QUFDRixtQkFBTyxDQUFDLEtBQUssQ0FDWCxtQ0FBbUMsRUFDbkMsa0JBQWtCLENBQ25CLENBQUM7QUFDRix1QkFBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztXQUMzRCxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7U0FDbkI7T0FDRixDQUFDLENBQ0gsQ0FBQztLQUNIO0dBQ0Y7Q0FDRiIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2plcHN0Ly5hdG9tL3BhY2thZ2VzL2V4Y2VwdGlvbi1yZXBvcnRpbmcvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGJhYmVsICovXHJcblxyXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XHJcblxyXG5sZXQgcmVwb3J0ZXI7XHJcblxyXG5mdW5jdGlvbiBnZXRSZXBvcnRlcigpIHtcclxuICBpZiAoIXJlcG9ydGVyKSB7XHJcbiAgICBjb25zdCBSZXBvcnRlciA9IHJlcXVpcmUoJy4vcmVwb3J0ZXInKTtcclxuICAgIHJlcG9ydGVyID0gbmV3IFJlcG9ydGVyKCk7XHJcbiAgfVxyXG4gIHJldHVybiByZXBvcnRlcjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFjdGl2YXRlKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcclxuXHJcbiAgICBpZiAoIWF0b20uY29uZmlnLmdldCgnZXhjZXB0aW9uLXJlcG9ydGluZy51c2VySWQnKSkge1xyXG4gICAgICBhdG9tLmNvbmZpZy5zZXQoJ2V4Y2VwdGlvbi1yZXBvcnRpbmcudXNlcklkJywgcmVxdWlyZSgnbm9kZS11dWlkJykudjQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcclxuICAgICAgYXRvbS5vbkRpZFRocm93RXJyb3IoKHsgbWVzc2FnZSwgdXJsLCBsaW5lLCBjb2x1bW4sIG9yaWdpbmFsRXJyb3IgfSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBnZXRSZXBvcnRlcigpLnJlcG9ydFVuY2F1Z2h0RXhjZXB0aW9uKG9yaWdpbmFsRXJyb3IpO1xyXG4gICAgICAgIH0gY2F0Y2ggKHNlY29uZGFyeUV4Y2VwdGlvbikge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAnRXJyb3IgcmVwb3J0aW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgICAgc2Vjb25kYXJ5RXhjZXB0aW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGdldFJlcG9ydGVyKCkucmVwb3J0VW5jYXVnaHRFeGNlcHRpb24oc2Vjb25kYXJ5RXhjZXB0aW9uKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgaWYgKGF0b20ub25EaWRGYWlsQXNzZXJ0aW9uICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcclxuICAgICAgICBhdG9tLm9uRGlkRmFpbEFzc2VydGlvbihlcnJvciA9PiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBnZXRSZXBvcnRlcigpLnJlcG9ydEZhaWxlZEFzc2VydGlvbihlcnJvcik7XHJcbiAgICAgICAgICB9IGNhdGNoIChzZWNvbmRhcnlFeGNlcHRpb24pIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgJ0Vycm9yIHJlcG9ydGluZyBhc3NlcnRpb24gZmFpbHVyZScsXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlFeGNlcHRpb25cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIGdldFJlcG9ydGVyKCkucmVwb3J0VW5jYXVnaHRFeGNlcHRpb24oc2Vjb25kYXJ5RXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbiJdfQ==