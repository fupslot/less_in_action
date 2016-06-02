  'use strict';

  var vgDropdownDirective = ['$document', '$animate', function($document, $animate) {

    var VG_DROPDOWN_OPEN_CLASS = 'dropdown--open';
    var VG_MENU_OPEN_CLASS = 'dropdown__menu--open';

    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var triggerElement;
        var menuElement;
        var htmlElement = element[0];
        var open = false;

        function triggerElementClickHandler(event) {
          event.stopPropagation();
          open = (open === true ? hideMenu : showMenu)();
          scope.$apply();
        }

        function showMenu() {
          $animate.addClass(element, VG_DROPDOWN_OPEN_CLASS);
          $animate.addClass(menuElement, VG_MENU_OPEN_CLASS);
          // element.addClass(VG_DROPDOWN_OPEN_CLASS);
          // menuElement.addClass(VG_MENU_OPEN_CLASS);
          return true;
        }

        function hideMenu() {
          $animate.removeClass(element, VG_DROPDOWN_OPEN_CLASS);
          $animate.removeClass(menuElement, VG_MENU_OPEN_CLASS);
          // element.removeClass(VG_DROPDOWN_OPEN_CLASS);
          // menuElement.removeClass(VG_MENU_OPEN_CLASS);
          return false;
        }

        var triggerElement = angular.element(htmlElement.querySelector('.dropdown__trigger'));
        var menuElement = angular.element(htmlElement.querySelector('.dropdown__menu'));

        triggerElement.on('click', triggerElementClickHandler);

        $document.on('click', function() {
          if (!open) return;
          open = hideMenu();
          scope.$apply();
        });
      }
    };
  }];

  vg.directive('vgDropdown', vgDropdownDirective);
