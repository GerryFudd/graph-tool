import React, {Component} from 'react';
import {Polynomial, ComplexNumber} from 'complex-calculator';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import {Graph} from '../components';
import Header from './Header';

const identity = complexNumber => complexNumber;
const reciprocal = complexNumber => complexNumber.pow(-1);
const squared = complexNumber => complexNumber.pow(2);
const exponential = complexNumber => new ComplexNumber(Math.cos(complexNumber.imaginary), Math.sin(complexNumber.imaginary)).times([Math.exp(complexNumber.real), 0]);
const exampleWithTwoImaginaryPoles = complexNumber => complexNumber.pow(2).plus([1, 0]).pow(-1);

const functions = {identity, squared, reciprocal, exponential, exampleWithTwoImaginaryPoles};

const viewSettings = {
  identity: {
    windowMaxReal: 2,
    windowMaxImaginary: 2,
    outputMaxReal: 2,
    outputMaxImaginary: 2
  },
  squared: {
    windowMaxReal: 2,
    windowMaxImaginary: 2,
    outputMaxReal: 2,
    outputMaxImaginary: 2
  },
  reciprocal: {
    windowMaxReal: 2,
    windowMaxImaginary: 2,
    outputMaxReal: 2,
    outputMaxImaginary: 2
  },
  exponential: {
    windowMaxReal: 2,
    windowMaxImaginary: Math.PI,
    outputMaxReal: 2,
    outputMaxImaginary: 2
  },
  exampleWithTwoImaginaryPoles: {
    windowMaxReal: 2,
    windowMaxImaginary: 2,
    outputMaxReal: 2,
    outputMaxImaginary: 2
  }
}

const factorial = num => {
  if (num <= 1) {
    return 1;
  }

  return num * factorial(num - 1);
};

const viewTypes = ['simple', 'difference', 'sideBySide'];

const taylorSeries = {
  identity: {
    center: new ComplexNumber(0, 0),
    coeficientsFunc: index => index === 1 ? 1 : 0
  },
  reciprocal: {
    center: new ComplexNumber(1, 0),
    coeficientsFunc: index => index
  },
  squared: {
    center: new ComplexNumber(0, 0),
    coeficientsFunc: index => index === 2 ? 1 : 0
  },
  exponential: {
    center: new ComplexNumber(0, 0),
    coeficientsFunc: index => 1/factorial(index)
  },
  exampleWithTwoImaginaryPoles: {
    center: new ComplexNumber(0, 0),
    coeficientsFunc: index => {
      switch(index % 4) {
        case 0:
          return 1;
        case 2:
          return -1;
        case 1:
        case 3:
          return 0;
      }
    }
  }
};

const makeTaylorFunc = ({center, coeficientsFunc}, order) => {
  const coeficients = [];
  while(coeficients.length < order + 1) {
    coeficients.push(coeficientsFunc(coeficients.length));
  }
  return complexNumber => new Polynomial(coeficients).evaluate(complexNumber.plus(center.times([-1, 0])));
}

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {viewSettings: viewSettings.identity, func: functions.identity, taylorSeries: taylorSeries.identity, order: 0, viewType: 'simple'};
    this.changeFunc = this.changeFunc.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.changeViewType = this.changeViewType.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState){
    // return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    return this.state.viewType !== nextState.viewType || this.state.order !== nextState.order || this.state.func !== nextState.func;
  }

  changeFunc(event) {
    const newfunc = event.target.value;
    this.setState({
      func: functions[newfunc],
      viewSettings: viewSettings[newfunc],
      taylorSeries: taylorSeries[newfunc],
      order: 0
    });
  }

  changeViewType(event) {
    const viewType = event.target.value;
    this.setState({viewType}); 
  }

  changeOrder(event) {
    this.setState({
      order: event.target.value ? Number.parseInt(event.target.value, 10) : 0
    });
  }

  renderGraph() {
    const {func, viewSettings} = this.state;
    return <Graph {...Object.assign({}, this.props, viewSettings)} func={func}/>
  }

  renderTaylorSeries() {
    const {taylorSeries, order, viewSettings} = this.state;
    const taylorfunc = makeTaylorFunc(taylorSeries, order);
    return <Graph {...Object.assign({}, this.props, viewSettings)} func={taylorfunc} />;
  }

  renderDifference() {
    const {func, taylorSeries, viewSettings, order} = this.state;
    const taylorfunc = makeTaylorFunc(taylorSeries, order);
    const differenceFunc = complexNumber => func(complexNumber).plus(taylorfunc(complexNumber).times([-1, 0]));
    return <Graph {...Object.assign({}, this.props, viewSettings)} func={differenceFunc} />;
  }

  renderSideBySide() {
    return <div>
      {this.renderGraph()}
      {this.renderTaylorSeries()}
    </div>;
  }

  renderGraphs() {
    const {viewType} = this.state;
    switch(viewType) {
      case 'simple':
        return this.renderGraph();
      case 'difference':
        return this.renderDifference();
      case 'sideBySide':
        return this.renderSideBySide();
    }
  }

  render() {
    const {viewSettings: {outputMaxReal, outputMaxImaginary}, order, viewType} = this.state;
    return <div
      style={{
        display: 'flex',
        'flexDirection': 'column'
      }}
    >
      <Header
        changeOrder={this.changeOrder}
        changeViewType={this.changeViewType}
        changeFunc={this.changeFunc}
        functions={functions}
        viewTypes={viewTypes}
        order={order}
        {...{outputMaxReal, outputMaxImaginary}}
      />
      {this.renderGraphs()}
      <ReactTooltip class={'custom-tool-tip'}/>
    </div>
  }
}
