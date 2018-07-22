import React, {Component} from 'react';

const scaleTo256 = num => Math.floor(255 * num);

const scaleToUnit = (value, max) => (value + max) / (2 * max)

const convertNumberToHexString = num => {
  if (num > 1) {
    return 'ff';
  }

  if (num < 0) {
    return '00';
  }

  return ('0' + scaleTo256(num).toString(16)).slice(-2);
}

export default class Cell extends Component {
  makeHexFromComplex() {
    const {outputMaxReal, outputMaxImaginary, complex: {real, imaginary}} = this.props;
    const unitizedReal = scaleToUnit(real, outputMaxReal);
    const unitizedImaginary = scaleToUnit(imaginary, outputMaxImaginary);
    const scaledRGB = {
      red: unitizedReal,
      green: 1 - Math.max(unitizedReal, unitizedImaginary),
      blue: unitizedImaginary
    };
    return ['red', 'green', 'blue']
      .reduce((acc, color) => `${acc}${convertNumberToHexString(scaledRGB[color])}`, '#');
  }

  render() {
    const {size, cellIsGridCell, complex: {real, imaginary}} = this.props;
    return <div
      style={{background: cellIsGridCell ? '#000' : this.makeHexFromComplex(real, imaginary),
        width: size,
        height: size
      }}
    ></div>;
  }
}
