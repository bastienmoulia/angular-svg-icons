# angular-svg-icons

[![npm version](https://badge.fury.io/js/angular-svg-icons.svg)](https://badge.fury.io/js/angular-svg-icons)

## Setup

Install the package from NPM

```
npm install angular-svg-icons
```

Add `angular-svg-icons` dependency to your module

``` js
angular.module('app', ['angular-svg-icons']);
```

Configure the component with the path of the svg sprites file and the folder of individual svg

``` js
angular.module('app').config(['$svgIconProvider', function($svgIconProvider){
  $svgIconProvider.spritesFile('symbol/svg/sprite.css.svg');
  $svgIconProvider.svgFolder('svg');
}]);
```

Use the component in the HTML

``` html
<svg-icon name="'star'" height="20" width="20"></svg-icon>
```

## Generate the SVG sprites

*TODO*

## Configuration

*TODO*

## Browsers support

| Chrome   | Firefox  | IE               | Edge                    | Opera    | Safari |
| -------- | -------- | ---------------- | ----------------------- | -------- | ------ |
| Latest ✔ | Latest ✔ | 9+ with fallback | 12 with fallback, 13+ ✔ | Latest ✔ | 6+ ✔   |

The fallback consists of displaying the individual svg from the directory specified in the config `$svgIconProvider.svgFolder()`.