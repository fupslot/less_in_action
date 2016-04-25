(function () {
  'use strict';

  var TOP_TRESHOLD = 190;
  var MENU_HOLDER_QUERY = '.ex-vigor-content-menu-holder';

  var updateMenuPosition = function(event) {
    var body = document.body;

    var menuHolderEl = document.querySelector(MENU_HOLDER_QUERY);

    if (!menuHolderEl) return;

    if (body.scrollTop >= TOP_TRESHOLD) {
      menuHolderEl.classList.add('stuck');
    }
    else {
      menuHolderEl.classList.remove('stuck');
    }
  };

  updateMenuPosition();

  window.addEventListener('scroll', _.throttle(updateMenuPosition, 300));

})();
