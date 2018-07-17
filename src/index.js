import React from 'react';
import ReactDOM from 'react-dom';

import Container from './container';

var RESOLUTION = 300;
var PAGE_SIZE = window.outerWidth;

const root = document.getElementById('root');

ReactDOM.render(<Container resolution={RESOLUTION} cellSize={Math.floor(PAGE_SIZE / RESOLUTION)}/>, root);

// var colorMapping = [
//   [1, 0, 0],
//   [1, 1, 0],
//   [0, 1, 0],
//   [0, 0, 1],
//   [1, 0, 1],
//   [1, 0, 0]
// ];

// function makeRGBScale(value) {
//   if (value >= 1) {
//     return {
//       red: colorMapping[colorMapping.length - 1][0],
//       green: colorMapping[colorMapping.length - 1][1],
//       blue: colorMapping[colorMapping.length - 1][2]
//     };
//   }
//   var colorMappingIndex = Math.floor(value * (colorMapping.length - 1));
//   var t = value * (colorMapping.length - 1) - colorMappingIndex;
//   return {
//     red: colorMapping[colorMappingIndex][0] * (1 - t) + colorMapping[colorMappingIndex + 1][0] * t,
//     green: colorMapping[colorMappingIndex][1] * (1 - t) + colorMapping[colorMappingIndex + 1][1] * t,
//     blue: colorMapping[colorMappingIndex][2] * (1 - t) + colorMapping[colorMappingIndex + 1][2] * t
//   }
// }

// function makeRotationFromComplex(real, imaginary) {
//   if (real === 0 && imaginary === 0) {
//     return 0;
//   }
//   var arcCos = Math.acos(real / makeNormFromComplex(real, imaginary)) / (2 * Math.PI);
//   if (imaginary < 0) {
//     arcCos = 1 - arcCos;
//   }
//   return arcCos;
// }

// function makeNormFromComplex(real, imaginary) {
//   return Math.sqrt(real * real + imaginary * imaginary);
// }

// function reciprocal(real, imaginary) {
//   var absoluteValue = makeNormFromComplex(real, imaginary);
//   if (absoluteValue === 0) {
//     return {real: MAX, imaginary: MAX};
//   }
//   return {real: real / (absoluteValue * absoluteValue), imaginary: -1 * imaginary / (absoluteValue * absoluteValue)};
// }

// function squared(real, imaginary) {
//   return {real: real * real - imaginary * imaginary, imaginary: 2 * real * imaginary}
// }

// function scaled(scale) {
//   return function (real, imaginary) {
//     return {real: scale * real, imaginary: scale * imaginary};
//   }
// }

// function identity(real, imaginary) {
//   return {real: real, imaginary: imaginary};
// }

// generateFromFunction(identity)
// generateFromFunction(reciprocal)
// generateFromFunction(squared)
// generateFromFunction(scaled(4))
// / (real * real + imaginary * imaginary)