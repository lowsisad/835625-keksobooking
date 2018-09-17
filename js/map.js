'use strict';

var numbersOfOffers = 8;
var width = 600;
var height = 350;
var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var someFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var somePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getElement = function (someElement) {
  var random = someElement[Math.floor(Math.random() * (someElement.length))];
  return random;
};

var getRandom = function compareRandom() {
  return Math.random() - 0.5;
};

var offers = [];

var getOffers = function () {
  avatars.sort(getRandom);
  titles.sort(getRandom);
  for (var i = 0; i < numbersOfOffers; i++) {
    var localX = Math.floor(Math.random() * (width));
    var localY = Math.floor(Math.random() * (height));
    var Price = Math.floor(Math.random() * (1000000 - 1000) + 1000);
    var roomsNumber = Math.floor(Math.random() * (4 - 1) + 1);
    var guestsNumber = Math.floor(Math.random() * (10));
    var array = {
      'author': {
        'avatar': 'img/avatars/user0' + avatars[i] + '.png'
      },
      'offer': {
        'title': titles[i],
        'address': localX + ',' + localY,
        'price': Price,
        'type': getElement(types),
        'rooms': roomsNumber,
        'guests': guestsNumber,
        'checkin': getElement(checkins),
        'checkout': getElement(checkouts),
        'features': getElement(someFeatures),
        'description': '',
        'photos': getElement(somePhotos),
      },
      'location': {
        'x': localX,
        'y': localY
      }
    };
    offers.push(array);
  }
};

getOffers();

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
  offerAtt.querySelector('.popup__features').innerHTML = protoPin.offer.features;
  offerAtt.querySelector('.popup__description').innerHTML = protoPin.offer.description;
  offerAtt.querySelector('.popup__photos').innerHTML = protoPin.offer.photos;
  offerAtt.querySelector('.popup__avatar').innerHTML = protoPin.author.avatar;
  return offerAtt;
};

var renderPin = function (protoPin) {
  var pinAtt = templatePinAttributes.cloneNode(true);

  pinAtt.style.left = protoPin.location.x + 'px';
  pinAtt.style.top = protoPin.location.y + 'px';
  pinAtt.querySelector('img').src = protoPin.author.avatar;
  pinAtt.querySelector('img').alt = protoPin.offer.title;

  return pinAtt;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < offers.length; i++) {

  fragment.appendChild(renderPin(offers[i]));
}
mapPinsListElement.appendChild(fragment);

for (i = 0; i < offers.length; i++) {

  fragment.appendChild(renderOffer(offers[i]));
}
mapOffersListElement.appendChild(fragment);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

