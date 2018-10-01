'use strict';

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
  SOMEPHOTOS = getShuffle(SOMEPHOTOS);
  for (var i = 0; i < avatars.length; i++) {
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


var renderOffer = function (protoPin) {
  var offerAtt = templatecard.cloneNode(true);

  offerAtt.querySelector('h3').innerHTML = protoPin.offer.title;
  offerAtt.querySelector('.popup__text--address').innerHTML = protoPin.offer.address;
  offerAtt.querySelector('.popup__text--price').innerHTML = protoPin.offer.price + '₽/ночь';
  offerAtt.querySelector('.popup__type').innerHTML = protoPin.offer.type;
  offerAtt.querySelector('.popup__text--capacity').innerHTML = protoPin.offer.rooms + ' комнаты для ' + protoPin.offer.guests + ' гостей';
  offerAtt.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + protoPin.offer.checkin + ', выезд до ' + protoPin.offer.checkout;
  offerAtt.querySelector('.popup__description').innerHTML = protoPin.offer.description;

  var myNode = offerAtt.querySelector('.popup__features');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  for (var m = 0; m < protoPin.offer.features.length; m++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + protoPin.offer.features[m]);
    offerAtt.querySelector('.popup__features').appendChild(li);
  }
  for (var k = 0; k < countOfImg; k++) {
    var img = document.createElement('img');
    img.src = protoPin.offer.photos[k];
    img.width = '45';
    img.height = '40';
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    img.id = protoPin.offer.id;
    offerAtt.querySelector('.popup__photos').appendChild(img);
  }
  offerAtt.querySelector('.popup__avatar').innerHTML = protoPin.author.avatar;
  offerAtt.querySelector('.popup__photos img:first-child').remove();

  return offerAtt;
};

var renderPin = function (protoPin) {
  var pinAtt = templatePinAttributes.cloneNode(true);

  pinAtt.style.left = protoPin.location.x + 'px';
  pinAtt.style.top = protoPin.location.y + 'px';
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


turnOn.addEventListener('mouseup', function () {
  if (event.which === 1) {
    mainPin.classList.remove('map--faded');
    openForm.classList.remove('ad-form--disabled');
    mapPinsListElement.appendChild(fragmentWithPins);
  }
});

var typeOfHouse = document.querySelector('#type');

typeOfHouse.addEventListener('change', function () {
  if (typeOfHouse.value === 'flat') {
    document.querySelector('#price').min = '1000';
  }
  if (typeOfHouse.value === 'palace') {
    document.querySelector('#price').min = '10000';
  }
  if (typeOfHouse.value === 'house') {
    document.querySelector('#price').min = '5000';
  }
  if (typeOfHouse.value === 'bungalo') {
    document.querySelector('#price').min = '0';
  }
});

document.querySelector('#address').value = 'left:' + turnOn.style.left + '; top:' + turnOn.style.top;

var cleanUpForm = document.querySelector('.ad-form__reset');

cleanUpForm.addEventListener('click', function () {
  document.querySelector('.ad-form').reset;
});

var mapPins = document.querySelector('.map__pins');

mapPins.addEventListener('click', function (event) {
  var target = event.target;
  var img = target.closest('img');
  if (!img) {
    return;
  } else {
    var x = target.id;
    fragmentWithOffers.appendChild(renderOffer(offers[x]));
    mapOffersListElement.appendChild(fragmentWithOffers);
  }
});
