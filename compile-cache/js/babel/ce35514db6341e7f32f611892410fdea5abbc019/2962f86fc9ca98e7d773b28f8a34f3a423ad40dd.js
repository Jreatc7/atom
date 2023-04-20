function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

/** @babel */

var dalek = require('./dalek');
var Grim = require('grim');

module.exports = {
  activate: function activate() {
    atom.packages.onDidActivateInitialPackages(_asyncToGenerator(function* () {
      var duplicates = yield dalek.enumerate();
      for (var i = 0; i < duplicates.length; i++) {
        var duplicate = duplicates[i];
        Grim.deprecate('You have the core package "' + duplicate + '" installed as a community package. See https://github.com/atom/atom/blob/master/packages/dalek/README.md for how this causes problems and instructions on how to correct the situation.', { packageName: duplicate });
      }
    }));
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZGFsZWsvbGliL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTdCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixVQUFRLEVBQUEsb0JBQUc7QUFDVCxRQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixtQkFBQyxhQUFZO0FBQ3JELFVBQU0sVUFBVSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzNDLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFDLFlBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxZQUFJLENBQUMsU0FBUyxpQ0FDa0IsU0FBUywrTEFDdkMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLENBQzNCLENBQUM7T0FDSDtLQUNGLEVBQUMsQ0FBQztHQUNKO0NBQ0YsQ0FBQyIsImZpbGUiOiJmaWxlOi8vL0M6L1VzZXJzL2plcHN0Ly5hdG9tL3BhY2thZ2VzL2RhbGVrL2xpYi9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBiYWJlbCAqL1xyXG5cclxuY29uc3QgZGFsZWsgPSByZXF1aXJlKCcuL2RhbGVrJyk7XHJcbmNvbnN0IEdyaW0gPSByZXF1aXJlKCdncmltJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBhY3RpdmF0ZSgpIHtcclxuICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyhhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBhd2FpdCBkYWxlay5lbnVtZXJhdGUoKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkdXBsaWNhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZHVwbGljYXRlID0gZHVwbGljYXRlc1tpXTtcclxuICAgICAgICBHcmltLmRlcHJlY2F0ZShcclxuICAgICAgICAgIGBZb3UgaGF2ZSB0aGUgY29yZSBwYWNrYWdlIFwiJHtkdXBsaWNhdGV9XCIgaW5zdGFsbGVkIGFzIGEgY29tbXVuaXR5IHBhY2thZ2UuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXRvbS9hdG9tL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2RhbGVrL1JFQURNRS5tZCBmb3IgaG93IHRoaXMgY2F1c2VzIHByb2JsZW1zIGFuZCBpbnN0cnVjdGlvbnMgb24gaG93IHRvIGNvcnJlY3QgdGhlIHNpdHVhdGlvbi5gLFxyXG4gICAgICAgICAgeyBwYWNrYWdlTmFtZTogZHVwbGljYXRlIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==