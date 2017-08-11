(function () {
  'use strict';

  function changeLang() {
    var lang = this.value;
    var canonical = this.dataset.canonical;
    if (lang === 'pt-br') lang = '';
    if (lang) lang += '/';

    location.href = '/' + lang + canonical;
  }

  //document.getElementById('lang-select').addEventListener('change', changeLang);
}());
