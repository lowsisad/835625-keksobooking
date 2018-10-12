'use strict';

(function () {
  var ESC = 27;
  var typeOfHouse = document.querySelector('#type');
  var fragmentWithOffers = document.createDocumentFragment();
  typeOfHouse.addEventListener('change', function () {
    if (typeOfHouse.value === 'flat') {
      document.querySelector('#price').min = '1000';
      document.querySelector('#price').placeholder = '1000';
    }
    if (typeOfHouse.value === 'palace') {
      document.querySelector('#price').min = '10000';
      document.querySelector('#price').placeholder = '10000';
    }
    if (typeOfHouse.value === 'house') {
      document.querySelector('#price').min = '5000';
      document.querySelector('#price').placeholder = '5000';
    }
    if (typeOfHouse.value === 'bungalo') {
      document.querySelector('#price').min = '0';
      document.querySelector('#price').placeholder = '0';
    }
  });

  var resetForm = document.querySelector('.ad-form__reset');

  resetForm.addEventListener('click', function () {
    document.querySelector('#address').value = parseInt(window.map.turnOn.style.left, 10) + ' ' + parseInt(window.map.turnOn.style.top, 10);
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#type').value = 'flat';
    document.querySelector('#room_number').value = '1';
    document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
    window.map.mainPin.classList.add('map--faded');
    window.map.openForm.classList.add('ad-form--disabled');
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (formEl) {
      formEl.style.display = 'none';
    });
  });

  document.querySelector('#address').value = parseInt(window.map.turnOn.style.left, 10) + ' ' + parseInt(window.map.turnOn.style.top, 10);

  var mapPins = document.querySelector('.map__pins');

  mapPins.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'IMG' || target.tagName === 'BUTTON') {
      if ((target.height != 44) && (!(target.classList.contains('map__pin--main')))) {
        var offerId = target.id;
        fragmentWithOffers.appendChild(window.dataModule.renderOffer(window.map.offers[offerId]));
        if (document.querySelector('.map__filters-container').childElementCount > 0) {
          document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
        }
        window.dataModule.mapOffersListElement.appendChild(fragmentWithOffers);
      }
    }

    var closeOffer = document.querySelector('.popup__close');
    if (document.querySelector('.popup__close')) {
        closeOffer.addEventListener('click', function () {
            document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
        });
    }
  });

  var roomNumber = document.querySelector('#room_number');
  var maxGuest = document.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '1') {
      maxGuest.options[0].disabled = true;
      maxGuest.options[1].disabled = true;
      maxGuest.options[2].disabled = false;
      maxGuest.options[3].disabled = true;
      maxGuest.value = 1;
    }
    if (roomNumber.value === '2') {
      maxGuest.options[0].disabled = true;
      maxGuest.options[1].disabled = false;
      maxGuest.options[2].disabled = false;
      maxGuest.options[3].disabled = true;
      maxGuest.value = 1;
    }
    if (roomNumber.value === '3') {
      maxGuest.options[0].disabled = false;
      maxGuest.options[1].disabled = false;
      maxGuest.options[2].disabled = false;
      maxGuest.options[3].disabled = true;
      maxGuest.value = 1;
    }
    if (roomNumber.value === '100') {
      maxGuest.options[0].disabled = true;
      maxGuest.options[1].disabled = true;
      maxGuest.options[2].disabled = true;
      maxGuest.options[3].disabled = false;
      maxGuest.value = 0;
    }
  });

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var tempSuccess = document.querySelector('#success');
  var success = tempSuccess.content.querySelector('.success');

  var submitForm = document.querySelector('.ad-form__submit');
  submitForm.addEventListener('submit', function () {
    document.querySelector('#address').value = parseInt(window.map.turnOn.style.left, 10) + ' ' + parseInt(window.map.turnOn.style.top, 10);
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#type').value = 'flat';
    document.querySelector('#room_number').value = '1';
    document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
    window.map.mainPin.classList.add('map--faded');
    window.map.openForm.classList.add('ad-form--disabled');
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (formEl) {
      formEl.style.display = 'none';
    });
    document.querySelector('main').appendChild(success.cloneNode(true));
    document.querySelector('main .success').setAttribute('tabindex', 0);
    document.querySelectorAll('.ad-form__element').forEach(function (formEl) {
      formEl.disabled = 'true';
    });

    document.querySelector('main .success').addEventListener('click', function () {
      document.querySelector('main .success').remove();
      window.map.turnOnTheLight();
    });

    document.querySelector('main .success').addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        document.querySelector('main .success').remove();
        window.map.turnOnTheLight();
      }
    });
  });
})();
