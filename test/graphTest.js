import React from 'react';
import {expect} from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import Graph from '../src/graph';
import Cell from '../src/cell';

describe('graph', () => {
  const resolution = 3;
  const windowMaxReal = 2;
  const windowMaxImaginary = 2;
  let identityGraph;
  before(() => {
    Enzyme.configure({adapter: new Adapter()});
    // If no function is specified, the graph uses the identity function.
    identityGraph = shallow(<Graph {...{resolution, windowMaxReal, windowMaxImaginary}}/>);
  });

  it('should render a react component', () => {
    expect(new Graph({resolution: 10})).to.be.an.instanceof(React.Component);
  });

  describe('row', () => {
    it('should have <resolution> rows', () => {
      expect(identityGraph.children()).to.have.length(resolution);
      identityGraph.children().forEach(element => {
        expect(element.props().style.flexDirection).to.equal('row');
      });
    });

    it('each row should have <resolution> cells', () => {
      expect(identityGraph.children()).to.have.length(resolution);
      identityGraph.children().forEach(element => {
        expect(element.children()).to.have.lengthOf(resolution);
        element.children().forEach(child => {
          expect(child.getElement().type).to.deep.equal(Cell);
        })
      });
    });

    it('should have the same imaginary component for each Cell in a given row', () => {
      identityGraph.children().forEach(row => {
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
      identityGraph.children().forEach(row => {
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
});