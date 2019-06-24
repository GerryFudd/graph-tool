import React from 'react';
import {expect} from 'chai';

import Cell from '../src/components/Cell';

describe('Cell', () => {
  it('should be a component', () => {
    expect(new Cell()).to.be.an.instanceof(React.Component);
  });

  describe('render', () => {
    const size = 10;
    const testCell = new Cell({size, complex: {real: 0, imaginary: 0}});
    it('should create an element with "data-tip" and "style" properties', () => {
      expect(testCell.render().props).to.have.all.keys('data-tip', 'style');
    });

    it('should create an element that is a square with dimensions equal to "size"', () => {
      expect(testCell.render().props.style.width)
        .to
        .equal(testCell.render().props.style.height);
      expect(testCell.render().props.style.width)
        .to
        .equal(size);
    });

    describe('data-tip', () => {
      const testCases = [
        {testNumber: {real: 0, imaginary: 0}, textVersion: '0'},
        {testNumber: {real: 1, imaginary: 0}, textVersion: '1'},
        {testNumber: {real: 0, imaginary: 1}, textVersion: 'i'},
        {testNumber: {real: 1, imaginary: 1}, textVersion: '1 + i'},
        {testNumber: {real: -1, imaginary: 0}, textVersion: '-1'},
        {testNumber: {real: 0, imaginary: -1}, textVersion: '-i'},
        {testNumber: {real: 0, imaginary: -2}, textVersion: '-2i'},
        {testNumber: {real: -1, imaginary: -1}, textVersion: '-1-i'},
        {testNumber: {real: -1, imaginary: -2}, textVersion: '-1-2i'},
        {testNumber: {real: 1, imaginary: -1}, textVersion: '1-i'},
        {testNumber: {real: 1, imaginary: -2}, textVersion: '1-2i'},
        {testNumber: {real: -1, imaginary: 1}, textVersion: '-1+i'}
      ];
      it('should contain the text representation of the complex number', () => {
        testCases.forEach(testCase => {
          expect(new Cell({size: 10, complex: testCase.testNumber}).render().props['data-tip'].replace(/ /g, '')).to.equal(testCase.textVersion.replace(/ /g, ''));
        })
      });
    });
  });
});