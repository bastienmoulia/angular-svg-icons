(function() {
  "use strict";

  class SvgIconController {
    name: string;
    url: string;
    height: number;
    width: number;
    noSupportExternal: boolean;
    svgContent: string;
    svgViewBox: string;
    constructor(private $svgIcon: any, private $log: angular.ILogService, private $http: angular.IHttpService, private $sce: angular.ISCEService) {
      this.url = "";
      this.noSupportExternal = detectNoSupportExternal();
      this.svgContent = "";
    }

    $onInit() {
      if (this.name) {
        if (this.noSupportExternal) {
          this.$http
            .get(this.$svgIcon.spritesFile)
            .then((response: angular.IHttpPromiseCallbackArg<string>) => {
              const parser = new DOMParser();
              let doc = parser.parseFromString(response.data, "image/svg+xml");
              let image = doc.getElementById(this.name);
              this.svgContent = this.$sce.trustAsHtml(image.innerHTML);
              this.svgViewBox = image.getAttribute("viewBox");
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
    if (ua.indexOf("MSIE ") > 0) {
      // IE 10 or older
      return true;
    }
    if (ua.indexOf('Trident/') > 0) {
      // IE 11
      return true;
    }
    const edge: number = ua.indexOf('Edge/');
    if (ua.indexOf('Edge/') > 0) {
      // Edge (IE 12)
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10) === 12;
    }
    // other browser
    return false;
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
        <svg ng-if="svgIcon.url !== '' || svgIcon.svgContent !== ''" ng-attr-height="{{ svgIcon.height }}" ng-attr-width="{{ svgIcon.width }}" xmlns="http://www.w3.org/2000/svg" ng-attr-view_box="{{ svgIcon.svgViewBox }}">
          <use ng-if="!svgIcon.noSupportExternal" ng-attr-xlink:href="{{ svgIcon.url }}" xlink:href=""></use>
          <g ng-if="svgIcon.noSupportExternal" ng-bind-html="svgIcon.svgContent"></g>
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