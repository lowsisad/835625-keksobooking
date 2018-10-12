// Файл load.js
'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  }
})();

// Файл main.js
'use strict';
window.backend;
(function () {
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    window.backend = {'inform': data};
    console.log(window.backend.inform);
  };

  window.load('https://js.dump.academy/keksobooking/data', onSuccess, onError);
  // window.backend.gift = function () {
    // console.log('123');
    // return window.backend.inform;
  // }
})();

