(function () {
    "use strict";
    var SvgIconController = (function () {
        function SvgIconController($svgIcon, $log, $http, $sce) {
            this.$svgIcon = $svgIcon;
            this.$log = $log;
            this.$http = $http;
            this.$sce = $sce;
            this.url = "";
            this.noSupportExternal = detectNoSupportExternal();
            this.svgContent = "";
        }
        SvgIconController.prototype.$onInit = function () {
            var _this = this;
            if (this.name) {
                if (this.noSupportExternal) {
                    this.$http
                        .get(this.$svgIcon.spritesFile)
                        .then(function (response) {
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(response.data, "image/svg+xml");
                        var image = doc.getElementById(_this.name);
                        _this.svgContent = _this.$sce.trustAsHtml(image.innerHTML);
                        _this.svgViewBox = image.getAttribute("viewBox");
                    });
                }
                else {
                    this.url = this.$svgIcon.spritesFile + "#" + this.name;
                }
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
    function detectNoSupportExternal() {
        var ua = window.navigator.userAgent;
        if (ua.indexOf("MSIE ") > 0) {
            return true;
        }
        if (ua.indexOf('Trident/') > 0) {
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (ua.indexOf('Edge/') > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10) === 12;
        }
        return false;
    }
    angular
        .module("angular-svg-icons", [])
        .provider("$svgIcon", function () {
        var spritesFile = "sprites.svg";
        var svgHeight = 15;
        return {
            spritesFile: function (value) {
                spritesFile = value;
            },
            svgHeight: function (value) {
                svgHeight = value;
            },
            $get: function () {
                return {
                    spritesFile: spritesFile,
                    svgHeight: svgHeight
                };
            }
        };
    })
        .component("svgIcon", {
        template: "\n        <svg ng-if=\"svgIcon.url !== '' || svgIcon.svgContent !== ''\" ng-attr-height=\"{{ svgIcon.height }}\" ng-attr-width=\"{{ svgIcon.width }}\" xmlns=\"http://www.w3.org/2000/svg\" ng-attr-view_box=\"{{ svgIcon.svgViewBox }}\">\n          <use ng-if=\"!svgIcon.noSupportExternal\" ng-attr-xlink:href=\"{{ svgIcon.url }}\" xlink:href=\"\"></use>\n          <g ng-if=\"svgIcon.noSupportExternal\" ng-bind-html=\"svgIcon.svgContent\"></g>\n        </svg>\n      ",
        controllerAs: "svgIcon",
        controller: SvgIconController,
        bindings: {
            name: "<",
            height: "<",
            width: "<"
        }
    });
})();
