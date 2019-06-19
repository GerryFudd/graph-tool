import React from 'react';
import {expect} from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ComplexNumber} from 'calculator';


import Graph from '../src/graph';
import Cell from '../src/cell';

describe('graph', () => {
  const resolution = 3;
  const windowMaxReal = 2;
  const windowMaxImaginary = 2;
  const squared = x => x.pow(2);
  let identityGraph;
  let squaredGraph;
  let identityRows;
  let squaredRows;
  before(() => {
    Enzyme.configure({adapter: new Adapter()});
    // If no function is specified, the graph uses the identity function.
    identityGraph = shallow(<Graph {...{resolution, windowMaxReal, windowMaxImaginary}}/>);
    identityRows = identityGraph.children();
    // y = x^2 used to test that functions are evaluated
    squaredGraph = shallow(<Graph {...{func: squared, resolution, windowMaxReal, windowMaxImaginary}}/>);
    squaredRows = squaredGraph.children();
  });

  it('should render a react component', () => {
    expect(new Graph({resolution: 10})).to.be.an.instanceof(React.Component);
  });

  describe('row', () => {
    it('should have <resolution> rows', () => {
      expect(identityRows).to.have.length(resolution);
      identityRows.forEach(element => {
        expect(element.props().style.flexDirection).to.equal('row');
      });
    });

    it('each row should have <resolution> cells', () => {
      identityRows.forEach(element => {
        expect(element.children()).to.have.lengthOf(resolution);
        element.children().forEach(child => {
          expect(child.getElement().type).to.deep.equal(Cell);
        })
      });
    });
  });

  describe('identityGraph', () => {
    it('should have the same imaginary component for each Cell in a given row', () => {
      identityRows.forEach(row => {
        let rowValue;
        row.children().forEach(child => {
          if (typeof rowValue !== 'number') {
            rowValue = child.props().complex.imaginary;
          } else {
            expect(child.props().complex.imaginary).to.equal(rowValue);
          }
        });
      });
    });

    it('should have the same real component for each Cell at a given row index', () => {
      let indexValues = {};
      identityRows.forEach(row => {
        row.children().forEach((child, index) => {
          if (typeof indexValues[index] !== 'number') {
            indexValues[index] = child.props().complex.real;
          } else {
            expect(child.props().complex.real).to.equal(indexValues[index]);
          }
        });
      });
    });
  });

  describe('squaredGraph', () => {
    it('should create cells whose complex numbers are the the square of the inputs', () => {
      squaredGraph.children().forEach((row, rowIndex) => {
        row.children().forEach((child, index) => {
          const inputComplex = identityRows.at(rowIndex).children().at(index).props().complex;
          const input = new ComplexNumber(inputComplex.real, inputComplex.imaginary);
          const {real, imaginary} = squared(input);
          expect(child.props().complex).to.deep.equal({real, imaginary});
        });
      });
    });
  });
});