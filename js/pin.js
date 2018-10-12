'use strict';

(function () {
  var pinWidth = 40;
  var pinHight = 44;
  var maxLocalY = 630;
  var minLocalY = 130;
  var mainElement = document.querySelector('.map__pin--main');
  var field = document.querySelector('.map__overlay');

  for (var i = 0; i < window.map.offers.length; i++) {
    window.map.fragmentWithPins.appendChild(window.dataModule.renderPin(window.map.offers[i]));
  }
  var limits = {
    top: minLocalY - pinHight,
    right: field.offsetWidth + field.offsetLeft,
    bottom: maxLocalY - pinHight,
    left: field.offsetLeft
  };
  mainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var Location = {
        x: 0,
        y: 0
      };

      var relocate = function (newLocation) {
        mainElement.style.left = newLocation.x + 'px';
        mainElement.style.top = newLocation.y + 'px';
        document.querySelector('#address').value = (parseInt(mainElement.style.left, 10)) + ' ' + (parseInt(mainElement.style.top, 10) + pinHight);
      };

      if ((mainElement.offsetLeft - shift.x) > limits.right - pinWidth) {
        Location.x = limits.right - pinWidth;
      } else if ((mainElement.offsetLeft - shift.x) > limits.left) {
        Location.x = mainElement.offsetLeft - shift.x;
      } else if ((mainElement.offsetLeft - shift.x) > limits.right) {
        Location.x = limits.right;
      }

      if ((mainElement.offsetTop - shift.y) > limits.bottom) {
        Location.y = limits.bottom;
      } else if ((mainElement.offsetTop - shift.y) <= (limits.top)) {
        Location.y = limits.top;
      } else if ((mainElement.offsetTop - shift.y) > (limits.top)) {
        Location.y = mainElement.offsetTop - shift.y;
      }

      relocate(Location);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evte) {
          evte.preventDefault();
          mainElement.removeEventListener('click', onClickPreventDefault);
        };
        mainElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
