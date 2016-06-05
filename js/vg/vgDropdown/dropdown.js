  'use strict';

  // extend UIComponent
  var vgDropdownComponent = function(params) {
    params = params || {};

    this._id = params.id;
    this._name = params.name;
    this._visibility = false;

    // vg.UI.UIComponent.call(this);
    // vg.Events.call(this);
  }

  // angular.extend(vgDropdownComponent.prototype, vg.Events);

  vgDropdownComponent.prototype.getId = function() {
    return this._id;
  }

  vgDropdownComponent.prototype.getName = function() {
    return this._name;
  };

  vgDropdownComponent.prototype.getVisibility = function() {
    return this._visibility;
  };

  vgDropdownComponent.prototype.setVisibility = function(value) {
    this._visibility = !!value;
  };

  vgDropdownComponent.prototype.toggleVisibility = function() {
    this._visibility = !this._visibility;
  };

  var vgDropdownController = function() {
    this.component = new vgDropdownComponent({id: 'vg01', name: 'dropdown1'});
  };


  var vgDropdownDirective = ['$document', '$animate', function($document, $animate) {
    var VG_DROPDOWN_OPEN_CLASS = 'dropdown--open';
    var VG_MENU_OPEN_CLASS = 'dropdown__menu--open';

    return {
      restrict: 'A',
      controller: vgDropdownController,
      controllerAs: '$ctrl',
      link: function(scope, element, attr) {
        var triggerElement;
        var menuElement;
        var htmlElement = element[0];
        var ctrl = scope.$ctrl;

        function triggerElementClickHandler(event) {
          event.stopPropagation();
          var toggleMenu = ctrl.component.getVisibility() ? hideMenu : showMenu;
          ctrl.component.toggleVisibility();
          toggleMenu();
          scope.$apply();
        }

        function showMenu() {
          $animate.addClass(element, VG_DROPDOWN_OPEN_CLASS);
          $animate.addClass(menuElement, VG_MENU_OPEN_CLASS);
        }

        function hideMenu() {
          $animate.removeClass(element, VG_DROPDOWN_OPEN_CLASS);
          $animate.removeClass(menuElement, VG_MENU_OPEN_CLASS);
        }

        var triggerElement = htmlElement.querySelector('.dropdown__trigger');
        var menuElement = htmlElement.querySelector('.dropdown__menu');

        triggerElement.addEventListener('click', triggerElementClickHandler);

        $document.on('click', function() {
          if (!ctrl.component.getVisibility()) return;
          ctrl.component.setVisibility(false);
          hideMenu();
          scope.$apply();
        });
      }
    };
  }];

  vg.directive('vgDropdown', vgDropdownDirective);
