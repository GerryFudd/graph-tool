import React, {Component} from 'react';

var MAX = 2;

const scaleTo256 = num => Math.floor(255 * num);

const convertNumberToHexString = num => {
  if (num > 1) {
    return 'ff';
  }

  if (num < 0) {
    return '00';
  }

  return ('0' + scaleTo256(num).toString(16)).slice(-2);
}

const makeHexFromComplex = (real, imaginary) => {
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

export default class Cell extends Component {
  render() {
    const {size, complex: {real, imaginary}} = this.props;
    return <div
      style={{background: (real === 0 || imaginary === 0) ? '#000' : makeHexFromComplex(real, imaginary),
        width: size,
        height: size
      }}
    ></div>;
  }
}
