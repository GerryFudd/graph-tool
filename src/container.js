import React, {Component} from 'react';
import {Polynomial, ComplexNumber} from 'calculator';
import ReactTooltip from 'react-tooltip';

import Graph from './graph';
import Header from './header';

const identity = complexNumber => complexNumber;
const reciprocal = complexNumber => complexNumber.pow(-1);
const squared = complexNumber => complexNumber.pow(2);
const exponential = complexNumber => new ComplexNumber(Math.cos(complexNumber.imaginary), Math.sin(complexNumber.imaginary)).times([Math.exp(complexNumber.real), 0]);

const functions = {identity, squared, reciprocal, exponential};

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
  }
}

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {viewSettings: viewSettings.identity, func: functions.identity};
    this.changeFunc = this.changeFunc.bind(this);
  }

  changeFunc(event) {
    const newfunc = event.target.value;
    this.setState({
      func: functions[newfunc],
      viewSettings: viewSettings[newfunc]
    });
  }

  render() {
    const {func, viewSettings} = this.state;
    const {outputMaxReal, outputMaxImaginary} = viewSettings;
    return <div
      style={{
        display: 'flex',
        'flexDirection': 'column'
      }}
    >
      <Header changeFunc={this.changeFunc} functions={functions} {...{outputMaxReal, outputMaxImaginary}}/>
      <Graph {...Object.assign({}, this.props, viewSettings)} func={func}/>
      <ReactTooltip class={'custom-tool-tip'}/>
    </div>
  }
}
