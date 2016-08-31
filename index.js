var React = require('react'),
    ReactDOM = require('react-dom');

var BeerListContainer = require('./components');

ReactDOM.render(
  <BeerListContainer />,
  document.querySelector('#root')
);
