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

Configure the components with the path of the svg sprites file and the folder of individual svg

```
angular.module('app').config(['$svgIconProvider', function($svgIconProvider){
  $svgIconProvider.spritesFile('symbol/svg/sprite.css.svg');
  $svgIconProvider.svgFolder('svg');
}]);
```

Use the component in the HTML

```
<svg-icon name="'star'" height="20" width="20"></svg-icon>
```

## Generate the SVG sprites

*TODO*

## Configuration

*TODO*

## Browsers support

*TODO*