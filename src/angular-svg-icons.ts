(function() {
  "use strict";

  class SvgIconController {
    name: string;
    url: string;
    height: number;
    width: number;
    noSupportExternal: boolean;
    constructor(private $svgIcon: any, private $log: angular.ILogService, private $http: angular.IHttpService, private $sce: angular.ISCEService) {
      this.url = "";
      this.noSupportExternal = detectNoSupportExternal();
    }

    $onInit() {
      if (this.name) {
        if (this.noSupportExternal && document.getElementById("svg-icons-sprite") === null) {
          let div = document.createElement("div");
          div.style.cssText = "display: none";
          div.id = "svg-icons-sprite";
          document.body.insertBefore(div, document.body.childNodes[0]);
          this.$http
            .get(this.$svgIcon.spritesFile)
            .then((response: angular.IHttpPromiseCallbackArg<string>) => {
              document.getElementById("svg-icons-sprite").innerHTML = response.data;
            });
        } else {
          this.url = this.$svgIcon.spritesFile + "#" + this.name;
        }
        if (!this.height) {
          this.height = this.$svgIcon.svgHeight;
        }
        if (!this.width) {
          this.width = this.height;
        }
      } else {
        this.$log.debug("no attribute name for svg-icon")
      }
    }
  }

  function detectNoSupportExternal(): boolean {
    const ua: string = window.navigator.userAgent;
    if (ua.indexOf("MSIE ") > 0) { // IE 10 or older
      return true;
    }
    if (ua.indexOf('Trident/') > 0) { // IE 11
      return true;
    }
    const edge: number = ua.indexOf('Edge/');
    if (ua.indexOf('Edge/') > 0) { // Edge (IE 12)
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10) === 12;
    }
    return false; // other browser
  }

  angular
    .module("angular-svg-icons", [])
    .provider("$svgIcon", function () {
      let spritesFile: string = "sprites.svg";
      let svgHeight: number = 15;
      return {
        spritesFile: (value: string) => {
          spritesFile = value;
        },
        svgHeight: (value: number) => {
          svgHeight = value;
        },

        $get: () => {
          return {
            spritesFile: spritesFile,
            svgHeight: svgHeight
          };
        }
      }
    })
    .component("svgIcon", {
      template: `
        <svg ng-attr-height="{{ svgIcon.height }}" ng-attr-width="{{ svgIcon.width }}" xmlns="http://www.w3.org/2000/svg">
          <use ng-if="!svgIcon.noSupportExternal" ng-attr-xlink:href="{{ svgIcon.url }}" xlink:href=""></use>
          <use ng-if="svgIcon.noSupportExternal" ng-attr-xlink:href="{{ '#' + svgIcon.name }}" xlink:href=""></use>
        </svg>
      `,
      controllerAs: "svgIcon",
      controller: SvgIconController,
      bindings: {
        name: "<",
        height: "<",
        width: "<"
      }
    });
})();