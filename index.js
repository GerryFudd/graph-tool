import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Container extends Component {
  render() {
    return <p>Hello!</p>
  }
}

const root = document.getElementById('root');

ReactDOM.render(<Container/>, root);

var MAX = 2;
var WINDOW_MAX_X = 2;
var WINDOW_MAX_Y = 2;
var RESOLUTION = 300;
var PAGE_SIZE = window.outerWidth;
var CELL_SIZE = Math.floor(PAGE_SIZE / RESOLUTION);

function scaleTo256(num) {
  return Math.floor(255 * num);
}

function convertNumberToHexString(num) {
  if (num > 1) {
    return 'ff';
  }

  if (num < 0) {
    return '00';
  }

  return ('0' + scaleTo256(num).toString(16)).slice(-2);
}

var colorMapping = [
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 1],
  [1, 0, 0]
];

function makeRGBScale(value) {
  if (value >= 1) {
    return {
      red: colorMapping[colorMapping.length - 1][0],
      green: colorMapping[colorMapping.length - 1][1],
      blue: colorMapping[colorMapping.length - 1][2]
    };
  }
  var colorMappingIndex = Math.floor(value * (colorMapping.length - 1));
  var t = value * (colorMapping.length - 1) - colorMappingIndex;
  return {
    red: colorMapping[colorMappingIndex][0] * (1 - t) + colorMapping[colorMappingIndex + 1][0] * t,
    green: colorMapping[colorMappingIndex][1] * (1 - t) + colorMapping[colorMappingIndex + 1][1] * t,
    blue: colorMapping[colorMappingIndex][2] * (1 - t) + colorMapping[colorMappingIndex + 1][2] * t
  }
}

function makeNormFromComplex(real, imaginary) {
  return Math.sqrt(real * real + imaginary * imaginary);
}

function makeRotationFromComplex(real, imaginary) {
  if (real === 0 && imaginary === 0) {
    return 0;
  }
  var arcCos = Math.acos(real / makeNormFromComplex(real, imaginary)) / (2 * Math.PI);
  if (imaginary < 0) {
    arcCos = 1 - arcCos;
  }
  return arcCos;
}

function makeHexFromComplex(real, imaginary) {
  // var brightness = 1 - Math.min(makeNormFromComplex(real, imaginary), MAX * 0.75) / MAX;
  // var scaledRGB = makeRGBScale(makeRotationFromComplex(real, imaginary));
  var scaledRGB = {
    red: (real + MAX) / (2 * MAX),
    green: 1 - (Math.max(real, imaginary) + MAX) / (2 * MAX),
    // blue: makeNormFromComplex(real, imaginary) / (Math.sqrt(2) * MAX)
    blue: (imaginary + MAX) / (2 * MAX)
    // blue: 0,
    // blue: 0.75
  };
  var r = convertNumberToHexString(scaledRGB.red);
  var g = convertNumberToHexString(scaledRGB.green);
  var b = convertNumberToHexString(scaledRGB.blue);
  return '#' + r + g + b;
}

function makeCell(real, imaginary) {
  var cell = document.createElement('div');
  cell.style.cssText = 'background: ' + makeHexFromComplex(real, imaginary) + ';' +
    'width: ' + CELL_SIZE + 'px;' +
    'height: ' + CELL_SIZE + 'px;';
  return cell;
}

function makeGridCell(real, imaginary) {
  var cell = document.createElement('div');
  cell.style.cssText = 'background: #000;' +
    'width: ' + CELL_SIZE + 'px;' +
    'height: ' + CELL_SIZE + 'px;';
  return cell;
}

function insertRow(parent) {
  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  parent.insertAdjacentElement('beforeend', rowDiv)
  return rowDiv;
}

function makeValueFromIndex(i, maximum) {
  return 2 * maximum * (i / RESOLUTION - 0.5);
}

function isInteger(i, maximum) {
  return i % Math.ceil(RESOLUTION/(2 * maximum)) === 0;
}

function generateFromFunction(func) {
  var table = document.createElement('div');
  table.setAttribute('class', 'container');
  if (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.insertAdjacentElement('beforeend', table);
  var rows = [];
  while(rows.length < RESOLUTION) {
    rows.push(insertRow(table));
  }
  rows.forEach(function (row, i) {
    var j = 0;
    for (j; j < RESOLUTION; j++) {
      if ([i, j].indexOf(Math.floor(RESOLUTION / 2)) > -1) {
        row.insertAdjacentElement('beforeend', makeGridCell());
      } else if (
        (
          j === Math.floor(RESOLUTION / 2) + 1 &&
          isInteger(RESOLUTION - i, WINDOW_MAX_Y)
        ) ||
        (
          i === Math.floor(RESOLUTION / 2) - 1 &&
          isInteger(j, WINDOW_MAX_X)
        )
      ) {
        row.insertAdjacentElement('beforeend', makeGridCell());
      } else {
        var real = makeValueFromIndex(j, WINDOW_MAX_X);
        var imaginary = makeValueFromIndex(RESOLUTION - i, WINDOW_MAX_Y);
        var result = func(real, imaginary);
        row.insertAdjacentElement('beforeend', makeCell(result.real, result.imaginary));
      }
    }
  });
}

function reciprocal(real, imaginary) {
  var absoluteValue = makeNormFromComplex(real, imaginary);
  if (absoluteValue === 0) {
    return {real: MAX, imaginary: MAX};
  }
  return {real: real / (absoluteValue * absoluteValue), imaginary: -1 * imaginary / (absoluteValue * absoluteValue)};
}

function squared(real, imaginary) {
  return {real: real * real - imaginary * imaginary, imaginary: 2 * real * imaginary}
}

function scaled(scale) {
  return function (real, imaginary) {
    return {real: scale * real, imaginary: scale * imaginary};
  }
}

function identity(real, imaginary) {
  return {real: real, imaginary: imaginary};
}

// generateFromFunction(identity)
// generateFromFunction(reciprocal)
// generateFromFunction(squared)
// generateFromFunction(scaled(4))
// / (real * real + imaginary * imaginary)