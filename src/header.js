import React, {Component} from 'react';

import Graph from './graph';

export default class Header extends Component {
  render() {
    const {functions, changeFunc, outputMaxReal, outputMaxImaginary} = this.props;
    const exampleNumbers = [
      {real: 0, imaginary: 0},
      {real: 1, imaginary: 0},
      {real: 1, imaginary: 1},
      {real: 0, imaginary: 1},
      {real: -1, imaginary: 1},
      {real: -1, imaginary: 0},
      {real: -1, imaginary: -1},
      {real: 0, imaginary: -1},
      {real: 1, imaginary: -1}
    ];
    return <div>
      <h2>Header</h2>
      <div>
        <select onChange={changeFunc}>
          {Object.keys(functions).map((funcName, index) =>
            <option key={index} value={funcName}>{funcName}</option>)}
        </select>
        <Graph
          cellSize={20}
          resolution={3} 
          windowMaxReal={1}
          windowMaxImaginary={1}
          {...{outputMaxReal, outputMaxImaginary}}
          showGridLines={false}
        />
      </div>
    </div>;
  }
}