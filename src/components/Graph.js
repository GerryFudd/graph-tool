import React, {Component} from 'react';
import {ComplexNumber} from 'complex-calculator';

import Cell from './Cell';

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.zeroIndex = Math.ceil((this.props.resolution - 1) / 2);
    this.state = {};

    this.updateRows = this.updateRows.bind(this);

    this.pageIsActive = true;
  }
  updateRows() {
    const {
      resolution
    } = this.props;
    const rowIndices = [];
    while (rowIndices.length < resolution) {
      rowIndices.push(rowIndices.length);
    }
    new Promise(resolve => {
      setTimeout(() => resolve(rowIndices.map(rowIndex => this.renderRow(rowIndex))), 0);
    })
      .then(rows => {
        if (this.pageIsActive) {
          this.setState({rows});
        }
      });
  }
  componentDidMount() {
    this.updateRows();
  }
  componentDidUpdate(newProps) {
    if (newProps.func !== this.props.func) {
      this.updateRows();
    }
  }
  componentWillUnmount() {
    this.pageIsActive = false;
  }
  isInteger(i, maximum) {
    return i % Math.ceil((this.props.resolution - 1)/(2 * maximum)) === 0;
  }

  isGridCell(cellIndex, rowIndex) {
    const {windowMaxReal, windowMaxImaginary, resolution} = this.props;

    const zeroIndex = this.zeroIndex;
    if ([cellIndex, rowIndex].indexOf(zeroIndex) > -1) {
      return true;
    }

    const absoluteCellIndex = Math.abs(cellIndex - zeroIndex);
    const absoluteRowIndex = Math.abs(resolution - 1 - rowIndex - zeroIndex);

    if (
      (this.isInteger(absoluteCellIndex, windowMaxReal) && rowIndex === zeroIndex - 1) ||
      (this.isInteger(absoluteRowIndex, windowMaxImaginary) && cellIndex === zeroIndex + 1)
    ) {
      return true;
    }

    return false;
  }

  makeValueFromIndex(i, coordinate) {
    const maximum = this.props[coordinate];
    const {resolution} = this.props;
    const zeroIndex = this.zeroIndex;
    if (i === zeroIndex) {
      return 0;
    }

    return (maximum / (resolution - 1)) * (2 * i - resolution + 1);
  }

  makeCellProps(cellIndex, rowIndex) {
    const {func = input => input, cellSize, resolution, outputMaxReal, outputMaxImaginary, showGridLines = true} = this.props;
    const real = this.makeValueFromIndex(cellIndex, 'windowMaxReal');
    const imaginary = this.makeValueFromIndex(resolution - 1 - rowIndex, 'windowMaxImaginary');
    return {
      outputMaxReal,
      outputMaxImaginary,
      key: cellIndex,
      complex: func(new ComplexNumber(real, imaginary)),
      size: cellSize,
      cellIsGridCell: showGridLines && this.isGridCell(cellIndex, rowIndex)
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
        'flexDirection': 'row'
      }}
    >
      {cells.map(cellProps => <Cell {...cellProps}/>)}
    </div>;
  }

  render() {
    const {rows} = this.state;
    const {
      resolution,
      func,
      showGridLines,
      cellSize,
      windowMaxImaginary,
      windowMaxReal,
      outputMaxImaginary,
      outputMaxReal,
      ...otherProps
    } = this.props;
    return <div
      style={{
        display: 'flex',
        'flexDirection': 'column',
        'backgroundColor': '#ccc'
      }}
      {...otherProps}
    >
      {rows || <div style={{
        width: cellSize * resolution,
        height: cellSize * resolution,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}><p>Loading...</p></div>}
    </div>
  }
}
