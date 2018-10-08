'use strict';

var ESC = 27;
var maxCost = 1000000;
var minCost = 1000;
var maxLocalX = 1000;
var maxLocalY = 630;
var minLocalY = 130;
var maxRooms = 4;
var minRooms = 1;
var maxGuests = 10;
var countOfImg = 3;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = {'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var SOMEFEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var SOMEPHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getElement = function (someElement) {
  var random = someElement[Math.floor(Math.random() * (someElement.length))];
  return random;
};

function getShuffle(arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

var getAvatars = function () {
  var r = [];
  for (var i = 1; i <= 8; i++) {
    r.push(i);
  }
  return r;
};

var avatars = getAvatars();

var getFewElements = function (array) {
  var number = Math.floor(Math.random() * (array.length - 1) + 1);
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  array = array.slice(number);
  return array;
};

var getOffers = function () {
  var offers = [];
  avatars = getShuffle(avatars);
  TITLES = getShuffle(TITLES);

  for (var i = 0; i < avatars.length; i++) {
    SOMEPHOTOS = getShuffle(SOMEPHOTOS);
    var localX = Math.floor(Math.random() * (maxLocalX));
    var localY = Math.floor(Math.random() * (maxLocalY - minLocalY) + minLocalY);
    var Price = Math.floor(Math.random() * (maxCost - minCost) + minCost);
    var roomsNumber = Math.floor(Math.random() * (maxRooms - minRooms) + minRooms);
    var guestsNumber = Math.floor(Math.random() * (maxGuests));
    var getType = TYPES[Object.keys(TYPES)[Math.floor(Math.random() * (Object.keys(TYPES).length))]];
    var array = {
      'author': {
        'avatar': 'img/avatars/user0' + avatars[i] + '.png'
      },
      'offer': {
        'id': i,
        'title': TITLES[i],
        'address': localX + ',' + localY,
        'price': Price,
        'type': getType,
        'rooms': roomsNumber,
        'guests': guestsNumber,
        'checkin': getElement(CHECKINS),
        'checkout': getElement(CHECKOUTS),
        'features': getFewElements(SOMEFEATURES),
        'description': '',
        'photos': [SOMEPHOTOS[0], SOMEPHOTOS[1], SOMEPHOTOS[2]],
      },
      'location': {
        'x': localX,
        'y': localY
      }
    };
    offers.push(array);
  }
  return offers;
};
var offers = getOffers();

var mapPinsListElement = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin');
var templatePinAttributes = templatePin.content.querySelector('.map__pin');

var mapOffersListElement = document.querySelector('.map__filters-container');
var templatecard = document.querySelector('#card').content.querySelector('.map__card');

var renderOffer = function (protoOffer) {
  var offerAtt = templatecard.cloneNode(true);

  offerAtt.querySelector('.popup__text--address').innerHTML = protoOffer.offer.address;
  offerAtt.querySelector('.popup__text--price').innerHTML = protoOffer.offer.price + '₽/ночь';
  offerAtt.querySelector('.popup__type').innerHTML = protoOffer.offer.type;
  offerAtt.querySelector('.popup__text--capacity').innerHTML = protoOffer.offer.rooms + ' комнаты для ' + protoOffer.offer.guests + ' гостей';
  offerAtt.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + protoOffer.offer.checkin + ', выезд до ' + protoOffer.offer.checkout;
  offerAtt.querySelector('.popup__description').innerHTML = protoOffer.offer.description;
  offerAtt.querySelector('img').src = protoOffer.author.avatar;
  offerAtt.querySelector('h3').innerHTML = protoOffer.offer.title;

  var myNode = offerAtt.querySelector('.popup__features');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  for (var m = 0; m < protoOffer.offer.features.length; m++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + protoOffer.offer.features[m]);
    offerAtt.querySelector('.popup__features').appendChild(li);
  }
  for (var k = 0; k < countOfImg; k++) {
    var img = document.createElement('img');
    img.src = protoOffer.offer.photos[k];
    img.width = '45';
    img.height = '40';
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    img.id = protoOffer.offer.id;
    offerAtt.querySelector('.popup__photos').appendChild(img);
  }
  offerAtt.querySelector('.popup__avatar').innerHTML = protoOffer.author.avatar;
  offerAtt.querySelector('.popup__photos img:first-child').remove();

  return offerAtt;
};

document.querySelectorAll('.ad-form__element').forEach(e => e.disabled = 'true');

var renderPin = function (protoPin) {
  var pinAtt = templatePinAttributes.cloneNode(true);

  pinAtt.style.left = protoPin.location.x + 'px';
  pinAtt.style.top = protoPin.location.y + 'px';
  pinAtt.setAttribute('id', protoPin.offer.id);
  pinAtt.querySelector('img').src = protoPin.author.avatar;
  pinAtt.querySelector('img').alt = protoPin.offer.title;
  pinAtt.querySelector('img').id = protoPin.offer.id;
  return pinAtt;
};

var fragmentWithPins = document.createDocumentFragment();
var fragmentWithOffers = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {
  fragmentWithPins.appendChild(renderPin(offers[i]));
}

var openForm = document.querySelector('.ad-form');
var turnOn = document.querySelector('.map__pin--main');
var mainPin = document.querySelector('.map');

var turnOnTheLight = function () {
  mainPin.classList.remove('map--faded');
  openForm.classList.remove('ad-form--disabled');
  mapPinsListElement.appendChild(fragmentWithPins);
  document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(e => e.style.display = 'block');
  document.querySelectorAll('.ad-form__element').forEach(e => e.removeAttribute('disabled'));
}

turnOn.addEventListener('mouseup', function () {
  turnOnTheLight ();
});

var typeOfHouse = document.querySelector('#type');

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
var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

resetForm.addEventListener('click', function () {
  document.querySelector('#address').value = parseInt(turnOn.style.left, 10) + ' ' + parseInt(turnOn.style.top, 10);
  document.querySelector('#title').value = '';
  document.querySelector('#price').value = '';
  document.querySelector('#type').value = 'flat';
  document.querySelector('#room_number').value = '1';
  document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
  mainPin.classList.add('map--faded');
  openForm.classList.add('ad-form--disabled');
  document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(e => e.style.display = 'none');
});

document.querySelector('#address').value = parseInt(turnOn.style.left, 10) + ' ' + parseInt(turnOn.style.top, 10);

var mapPins = document.querySelector('.map__pins');

mapPins.addEventListener('click', function (event) {
  var target = event.target;
  if (target.tagName === 'IMG' || target.tagName === 'BUTTON') {
    var offerId = target.id;
    fragmentWithOffers.appendChild(renderOffer(offers[offerId]));
    if (document.querySelector('.map__filters-container').childElementCount > 0) {
      document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
    }
    mapOffersListElement.appendChild(fragmentWithOffers);
  }
  var closeOffer = document.querySelector('.popup__close');

  closeOffer.addEventListener('click', function () {
    document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
  });

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
submitForm.addEventListener('click', function () {
  if (!validate_form()) {
    document.querySelector('#address').value = parseInt(turnOn.style.left, 10) + ' ' + parseInt(turnOn.style.top, 10);
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#type').value = 'flat';
    document.querySelector('#room_number').value = '1';
    document.querySelector('.map__filters-container').removeChild(document.querySelector('.map__filters-container').lastChild);
    mainPin.classList.add('map--faded');
    openForm.classList.add('ad-form--disabled');
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(e => e.style.display = 'none');
    document.querySelector('main').appendChild(success.cloneNode(true));
    document.querySelector('main .success').setAttribute('tabindex', 0);
    document.querySelectorAll('.ad-form__element').forEach(e => e.disabled = 'true');
    document.querySelector('main .success').tabIndex;

    document.querySelector('main .success').addEventListener('click', function () {
      document.querySelector('main .success').remove();
      turnOnTheLight();
    });

    document.querySelector('main .success').addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC) {
        document.querySelector('main .success').remove();
        turnOnTheLight();
      }
    });
  }
});

