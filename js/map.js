'use strict';

var numbersOfOffers = 8;
var width = 600;

var maxCost = 1000000;
var minCost = 1000;
var maxLocalY = 630;
var minLocalY = 130;
var maxRooms = 4;
var minRooms = 1;
var maxGuests = 10;

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

function getShuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

var getAvatars = function (){
  var r = [];
  for (var i = 1; i <= 8; i++) r.push(i);
  return r;
}

var avatars = getAvatars();

var getFewElements = function (array) {
  var number = Math.floor(Math.random() * (array.length - 1) + 1);
  var staff = [];
  for (var j = 0; j < number; j++) {
    staff.push(getElement(array));
  }
  return staff;
};

var getOffers = function () {
  var offers = [];
  for (var i = 0; i < numbersOfOffers; i++) {
    avatars = getShuffle(avatars);
    TITLES = getShuffle(TITLES);
    SOMEPHOTOS = getShuffle(SOMEPHOTOS);
    var localX = Math.floor(Math.random() * (width));
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
  offerAtt.querySelector('.popup__features').createElement = protoPin.offer.features;
  offerAtt.querySelector('.popup__description').innerHTML = protoPin.offer.description;
  for (var m = 0; m < 3; m++) {
    var img = document.createElement('img');
    img.src = protoPin.offer.photos[m];
    img.width = '45';
    img.height = '40';
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
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

  return pinAtt;
};

var fragmentWithPins = document.createDocumentFragment();
var fragmentWithOffers = document.createDocumentFragment();
for (var i = 0; i < offers.length; i++) {

  fragmentWithPins.appendChild(renderPin(offers[i]));
  fragmentWithOffers.appendChild(renderOffer(offers[i]));
}
mapPinsListElement.appendChild(fragmentWithPins);
mapOffersListElement.appendChild(fragmentWithOffers);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

