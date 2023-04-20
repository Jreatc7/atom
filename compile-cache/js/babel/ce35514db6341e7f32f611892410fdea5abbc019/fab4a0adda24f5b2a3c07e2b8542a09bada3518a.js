function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

/** @babel */

var fs = require('fs');
var path = require('path');

module.exports = {
  enumerate: _asyncToGenerator(function* () {
    if (atom.inDevMode()) {
      return [];
    }

    var duplicatePackages = [];
    var names = atom.packages.getAvailablePackageNames();
    for (var _name of names) {
      if (atom.packages.isBundledPackage(_name)) {
        var isDuplicatedPackage = yield this.isInstalledAsCommunityPackage(_name);
        if (isDuplicatedPackage) {
          duplicatePackages.push(_name);
        }
      }
    }

    return duplicatePackages;
  }),

  isInstalledAsCommunityPackage: _asyncToGenerator(function* (name) {
    var availablePackagePaths = atom.packages.getPackageDirPaths();

    for (var packagePath of availablePackagePaths) {
      var candidate = path.join(packagePath, name);

      if (fs.existsSync(candidate)) {
        var realPath = yield this.realpath(candidate);
        if (realPath === candidate) {
          return true;
        }
      }
    }

    return false;
  }),

  realpath: function realpath(path) {
    return new Promise(function (resolve, reject) {
      fs.realpath(path, function (error, realpath) {
        if (error) {
          reject(error);
        } else {
          resolve(realpath);
        }
      });
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZGFsZWsvbGliL2RhbGVrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUU3QixNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2YsQUFBTSxXQUFTLG9CQUFBLGFBQUc7QUFDaEIsUUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUM7S0FDWDs7QUFFRCxRQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUM3QixRQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixFQUFFLENBQUM7QUFDdkQsU0FBSyxJQUFJLEtBQUksSUFBSSxLQUFLLEVBQUU7QUFDdEIsVUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxFQUFFO0FBQ3hDLFlBQU0sbUJBQW1CLEdBQUcsTUFBTSxJQUFJLENBQUMsNkJBQTZCLENBQ2xFLEtBQUksQ0FDTCxDQUFDO0FBQ0YsWUFBSSxtQkFBbUIsRUFBRTtBQUN2QiwyQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7U0FDOUI7T0FDRjtLQUNGOztBQUVELFdBQU8saUJBQWlCLENBQUM7R0FDMUIsQ0FBQTs7QUFFRCxBQUFNLCtCQUE2QixvQkFBQSxXQUFDLElBQUksRUFBRTtBQUN4QyxRQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7QUFFakUsU0FBSyxJQUFJLFdBQVcsSUFBSSxxQkFBcUIsRUFBRTtBQUM3QyxVQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFL0MsVUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzVCLFlBQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRCxZQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7QUFDMUIsaUJBQU8sSUFBSSxDQUFDO1NBQ2I7T0FDRjtLQUNGOztBQUVELFdBQU8sS0FBSyxDQUFDO0dBQ2QsQ0FBQTs7QUFFRCxVQUFRLEVBQUEsa0JBQUMsSUFBSSxFQUFFO0FBQ2IsV0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7QUFDdEMsUUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBUyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFlBQUksS0FBSyxFQUFFO0FBQ1QsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmLE1BQU07QUFDTCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25CO09BQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0o7Q0FDRixDQUFDIiwiZmlsZSI6ImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZGFsZWsvbGliL2RhbGVrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBiYWJlbCAqL1xyXG5cclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgYXN5bmMgZW51bWVyYXRlKCkge1xyXG4gICAgaWYgKGF0b20uaW5EZXZNb2RlKCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGR1cGxpY2F0ZVBhY2thZ2VzID0gW107XHJcbiAgICBjb25zdCBuYW1lcyA9IGF0b20ucGFja2FnZXMuZ2V0QXZhaWxhYmxlUGFja2FnZU5hbWVzKCk7XHJcbiAgICBmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XHJcbiAgICAgIGlmIChhdG9tLnBhY2thZ2VzLmlzQnVuZGxlZFBhY2thZ2UobmFtZSkpIHtcclxuICAgICAgICBjb25zdCBpc0R1cGxpY2F0ZWRQYWNrYWdlID0gYXdhaXQgdGhpcy5pc0luc3RhbGxlZEFzQ29tbXVuaXR5UGFja2FnZShcclxuICAgICAgICAgIG5hbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChpc0R1cGxpY2F0ZWRQYWNrYWdlKSB7XHJcbiAgICAgICAgICBkdXBsaWNhdGVQYWNrYWdlcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkdXBsaWNhdGVQYWNrYWdlcztcclxuICB9LFxyXG5cclxuICBhc3luYyBpc0luc3RhbGxlZEFzQ29tbXVuaXR5UGFja2FnZShuYW1lKSB7XHJcbiAgICBjb25zdCBhdmFpbGFibGVQYWNrYWdlUGF0aHMgPSBhdG9tLnBhY2thZ2VzLmdldFBhY2thZ2VEaXJQYXRocygpO1xyXG5cclxuICAgIGZvciAobGV0IHBhY2thZ2VQYXRoIG9mIGF2YWlsYWJsZVBhY2thZ2VQYXRocykge1xyXG4gICAgICBjb25zdCBjYW5kaWRhdGUgPSBwYXRoLmpvaW4ocGFja2FnZVBhdGgsIG5hbWUpO1xyXG5cclxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoY2FuZGlkYXRlKSkge1xyXG4gICAgICAgIGNvbnN0IHJlYWxQYXRoID0gYXdhaXQgdGhpcy5yZWFscGF0aChjYW5kaWRhdGUpO1xyXG4gICAgICAgIGlmIChyZWFsUGF0aCA9PT0gY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxuXHJcbiAgcmVhbHBhdGgocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZnMucmVhbHBhdGgocGF0aCwgZnVuY3Rpb24oZXJyb3IsIHJlYWxwYXRoKSB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHJlYWxwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG4iXX0=