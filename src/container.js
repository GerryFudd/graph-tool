import React, {Component} from 'react';

import Cell from './cell';

var WINDOW_MAX_X = 2;
var WINDOW_MAX_Y = 2;

export default class Container extends Component {
  isInteger(i, maximum) {
    return i % Math.ceil(this.props.resolution/(2 * maximum)) === 0;
  }

  makeValueFromIndex(i, maximum) {
    if (i === Math.floor(this.props.resolution / 2)) {
      return 0;
    }
    return 2 * maximum * (i / this.props.resolution - 0.5);
  }

  makeCellProps(j, imaginary) {
    return {key: j, complex: {real: this.makeValueFromIndex(j, WINDOW_MAX_X), imaginary}, size: this.props.cellSize};
  }

  renderRow(imaginary, key) {
    const {resolution} = this.props;
    const cells = [];
    // var result = func(real, imaginary);
    while (cells.length < resolution) {
      cells.push(this.makeCellProps(cells.length - 1, imaginary));
    }
    return <div
      key={key}
      style={{
        display: 'flex',
        'flex-direction': 'row'
      }}
    >
      {cells.map(cellProps => <Cell {...cellProps}/>)}
    </div>;
  }

  render() {
    const {resolution} = this.props;
    const imaginaryValues = [];
    while (imaginaryValues.length < resolution) {
      imaginaryValues.push(this.makeValueFromIndex(resolution - imaginaryValues.length, WINDOW_MAX_Y))
    }
    return <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'background-color': '#ccc'
      }}
    >
      {imaginaryValues.map((imaginary, key) => this.renderRow(imaginary, key))}
    </div>
  }
}
