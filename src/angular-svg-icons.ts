(function() {
  "use strict";

  class SvgIconController {
    name: string;
    url: string;
    height: number;
    width: number;
    constructor(private $svgIcon: any, private $log: angular.ILogService) {
      this.url = "";
    }
    $onInit() {
      if (this.name) {
        this.url = this.$svgIcon.spritesFile + "#" + this.name;
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

  angular
    .module("angular-svg-icons", [])
    .provider("$svgIcon", function () {
      let spritesFile: string = "sprites.svg";
      let svgFolder: string = "svg";
      let svgHeight: number = 15;
      return {
        spritesFile: (value: string) => {
          spritesFile = value;
        },
        svgFolder: (value: string) => {
          svgFolder = value;
        },
        svgHeight: (value: number) => {
          svgHeight = value;
        },

        $get: () => {
          return {
            spritesFile: spritesFile,
            svgFolder: svgFolder,
            svgHeight: svgHeight
          };
        }
      }
    })
    .component("svgIcon", {
      template: `
        <svg ng-if="svgIcon.url !== '' && !svgIcon.isIe" ng-attr-height="{{ svgIcon.height }}" ng-attr-width="{{ svgIcon.width }}" xmlns="http://www.w3.org/2000/svg">
          <use ng-attr-xlink:href="{{ svgIcon.url }}" xlink:href="">
        </svg>
        <img ng-src="{{ svgIcon.url }}" alt="{{ svgIcon.name }}" ng-attr-height="{{ svgIcon.height }}" ng-attr-width="{{ svgIcon.width }}" ng-if="svgIcon.url !== '' && svgIcon.isIe">
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