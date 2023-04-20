Object.defineProperty(exports, '__esModule', {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

var _atom = require('atom');

'use babel';
exports['default'] = _asyncToGenerator(function* (goalPath) {
  if (goalPath) {
    return atom.project.repositoryForDirectory(new _atom.Directory(goalPath));
  }
  return null;
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vQzovVXNlcnMvamVwc3QvLmF0b20vcGFja2FnZXMvZ2l0LWRpZmYvbGliL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUMwQixNQUFNOztBQURoQyxXQUFXLENBQUM7dUNBR0csV0FBZSxRQUFRLEVBQUU7QUFDdEMsTUFBSSxRQUFRLEVBQUU7QUFDWixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsb0JBQWMsUUFBUSxDQUFDLENBQUMsQ0FBQztHQUNyRTtBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2IiLCJmaWxlIjoiZmlsZTovLy9DOi9Vc2Vycy9qZXBzdC8uYXRvbS9wYWNrYWdlcy9naXQtZGlmZi9saWIvaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xyXG5pbXBvcnQgeyBEaXJlY3RvcnkgfSBmcm9tICdhdG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKGdvYWxQYXRoKSB7XHJcbiAgaWYgKGdvYWxQYXRoKSB7XHJcbiAgICByZXR1cm4gYXRvbS5wcm9qZWN0LnJlcG9zaXRvcnlGb3JEaXJlY3RvcnkobmV3IERpcmVjdG9yeShnb2FsUGF0aCkpO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG4iXX0=