(function () {
    "use strict";
    var SvgIconController = (function () {
        function SvgIconController($svgIcon, $log) {
            this.$svgIcon = $svgIcon;
            this.$log = $log;
            this.url = "";
        }
        SvgIconController.prototype.$onInit = function () {
            if (this.name) {
                this.url = this.$svgIcon.spritesFile + "#" + this.name;
                if (!this.height) {
                    this.height = this.$svgIcon.svgHeight;
                }
                if (!this.width) {
                    this.width = this.height;
                }
            }
            else {
                this.$log.debug("no attribute name for svg-icon");
            }
        };
        return SvgIconController;
    }());
    angular
        .module("angular-svg-icons", [])
        .provider("$svgIcon", function () {
        var spritesFile = "sprites.svg";
        var svgFolder = "svg";
        var svgHeight = 15;
        return {
            spritesFile: function (value) {
                spritesFile = value;
            },
            svgFolder: function (value) {
                svgFolder = value;
            },
            svgHeight: function (value) {
                svgHeight = value;
            },
            $get: function () {
                return {
                    spritesFile: spritesFile,
                    svgFolder: svgFolder,
                    svgHeight: svgHeight
                };
            }
        };
    })
        .component("svgIcon", {
        template: "\n        <svg ng-if=\"svgIcon.url !== '' && !svgIcon.isIe\" ng-attr-height=\"{{ svgIcon.height }}\" ng-attr-width=\"{{ svgIcon.width }}\" xmlns=\"http://www.w3.org/2000/svg\">\n          <use ng-attr-xlink:href=\"{{ svgIcon.url }}\" xlink:href=\"\">\n        </svg>\n        <img ng-src=\"{{ svgIcon.url }}\" alt=\"{{ svgIcon.name }}\" ng-attr-height=\"{{ svgIcon.height }}\" ng-attr-width=\"{{ svgIcon.width }}\" ng-if=\"svgIcon.url !== '' && svgIcon.isIe\">\n      ",
        controllerAs: "svgIcon",
        controller: SvgIconController,
        bindings: {
            name: "<",
            height: "<",
            width: "<"
        }
    });
})();
