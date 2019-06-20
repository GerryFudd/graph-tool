import React from 'react';
import ReactDOM from 'react-dom';

import Container from './layout/Container';

const RESOLUTION = 101;

const root = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Container
      resolution={RESOLUTION}
      cellSize={Math.floor(window.outerWidth / (RESOLUTION - 1))}
    />,
    root
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./layout/Container', render);
}
