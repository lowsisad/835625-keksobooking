'use strict';

(function () {
  window.offers = window.getOffers();
  var fragmentWithPins = document.createDocumentFragment();

  for (var i = 0; i < window.offers.length; i++) {
    fragmentWithPins.appendChild(window.renderPin(window.offers[i]));
  }
  window.openForm = document.querySelector('.ad-form');
  window.turnOn = document.querySelector('.map__pin--main');
  window.mainPin = document.querySelector('.map');

  window.turnOnTheLight = function () {
    window.mainPin.classList.remove('map--faded');
    window.openForm.classList.remove('ad-form--disabled');
    window.mapPinsListElement.appendChild(fragmentWithPins);
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (formEl) {
      formEl.style.display = 'block';
    });
    document.querySelectorAll('.ad-form__element').forEach(function (formEl) {
      formEl.removeAttribute('disabled');
    });
  };

  window.turnOn.addEventListener('mouseup', function () {
    window.turnOnTheLight();
  });
})();
