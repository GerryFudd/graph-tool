import React, {Component} from 'react';
import {ComplexNumber} from 'calculator';

import Cell from './cell';

export default class Container extends Component {
  isInteger(i, maximum) {
    return i % Math.floor(this.props.resolution/(2 * maximum)) === 0;
  }

  isGridCell(cellIndex, rowIndex) {
    const {windowMaxReal, windowMaxImaginary, resolution} = this.props;

    const zeroIndex = Math.floor(resolution / 2);
    if ([cellIndex, rowIndex].indexOf(zeroIndex) > -1) {
      return true;
    }

    if (
      (this.isInteger(cellIndex, windowMaxReal) && rowIndex === zeroIndex - 1) ||
      (this.isInteger(resolution - rowIndex, windowMaxImaginary) && cellIndex === zeroIndex + 1)
    ) {
      return true;
    }

    return false;
  }

  makeValueFromIndex(i, coordinate) {
    const maximum = this.props[coordinate];
    if (i === Math.floor(this.props.resolution / 2)) {
      return 0;
    }
    return 2 * maximum * (i / this.props.resolution - 0.5);
  }

  makeCellProps(cellIndex, rowIndex) {
    const {func = input => input, resolution, outputMaxReal, outputMaxImaginary} = this.props;
    const real = this.makeValueFromIndex(cellIndex, 'windowMaxReal');
    const imaginary = this.makeValueFromIndex(resolution - rowIndex, 'windowMaxImaginary');
    return {
      outputMaxReal,
      outputMaxImaginary,
      key: cellIndex,
      complex: func(new ComplexNumber(real, imaginary)),
      size: this.props.cellSize,
      cellIsGridCell: this.isGridCell(cellIndex, rowIndex)
    };
  }

  renderRow(rowIndex) {
    const {resolution} = this.props;
    const cells = [];
    // var result = func(real, imaginary);
    while (cells.length < resolution) {
      cells.push(this.makeCellProps(cells.length, rowIndex));
    }
    return <div
      key={rowIndex}
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
    const rowIndices = [];
    while (rowIndices.length < resolution) {
      rowIndices.push(rowIndices.length);
    }
    return <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'background-color': '#ccc'
      }}
    >
      {rowIndices.map(rowIndex => this.renderRow(rowIndex))}
    </div>
  }
}
