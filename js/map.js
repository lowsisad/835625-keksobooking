'use strict';

(function () {
  var fragmentWithPins = document.createDocumentFragment();
  window.map = {
    'offers': window.dataModule.getOffers(),
    'openForm': document.querySelector('.ad-form'),
    'turnOn': document.querySelector('.map__pin--main'),
    'mainPin': document.querySelector('.map'),
    'turnOnTheLight': function () {
      window.map.mainPin.classList.remove('map--faded');
      window.map.openForm.classList.remove('ad-form--disabled');
      window.dataModule.mapPinsListElement.appendChild(fragmentWithPins);
      document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (formEl) {
        formEl.style.display = 'block';
      });
      document.querySelectorAll('.ad-form__element').forEach(function (formEl) {
        formEl.removeAttribute('disabled');
      });
    }
  };

  window.map.turnOn.addEventListener('mouseup', function () {
    window.map.turnOnTheLight();
  });

  for (var i = 0; i < window.map.offers.length; i++) {
    fragmentWithPins.appendChild(window.dataModule.renderPin(window.map.offers[i]));
  }
})();
