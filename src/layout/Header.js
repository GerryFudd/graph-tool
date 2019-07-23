import React, {Component} from 'react';

import Graph from '../components/Graph';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {viewType: 'simple'};
    this.changeViewType = this.changeViewType.bind(this);
  }

  changeViewType(event) {
    const viewType = event.target.value;
    this.setState({viewType});
    this.props.changeViewType(event);
  }
  render() {
    const {functions, viewTypes, changeOrder, order, changeFunc, outputMaxReal, outputMaxImaginary} = this.props;
    const {viewType} = this.state;
    return <div>
      <h2>Color Wheel Graph</h2>
      <div>
        <select onChange={changeFunc}>
          {Object.keys(functions).map((funcName, index) =>
            <option key={index} value={funcName}>{funcName}</option>)}
        </select>
        <select onChange={this.changeViewType}>
          {viewTypes.map((type, index) =>
            <option key={index} value={type}>{type}</option>)}
        </select>
        {viewType !== 'simple' && <input type="number" value={order} onChange={changeOrder} />}
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