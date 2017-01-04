(function () {
    'use strict';
    var SvgIconController = (function () {
        function SvgIconController($svgIcon, $log) {
            this.$svgIcon = $svgIcon;
            this.$log = $log;
            this.url = "";
            console.log("ok2");
        }
        SvgIconController.prototype.$onInit = function () {
            if (this.name) {
                this.url = this.$svgIcon.spritesPath + "#" + this.name;
            }
            else {
                this.$log.debug("no attribute name for svg-icon");
            }
        };
        return SvgIconController;
    }());
    angular
        .module("angular-svg-icons", [])
        .provider('$svgIcon', function () {
        var spritesPath = "sprites.svg";
        return {
            spritesPath: function (value) {
                spritesPath = value;
            },
            $get: function () {
                return {
                    spritesPath: spritesPath
                };
            }
        };
    })
        .component('svgIcon', {
        template: "\n          <svg ng-if=\"svgIcon.url != ''\">\n            <use ng-attr-xlink:href=\"{{ svgIcon.url }}\" xlink:href=\"\">\n          </svg>\n        ",
        controllerAs: "svgIcon",
        controller: SvgIconController,
        bindings: {
            name: "<",
            height: "<",
            width: "<"
        }
    });
})();
