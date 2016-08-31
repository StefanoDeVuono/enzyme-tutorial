var React = require('react'),
    test = require('tape'),
    enzyme = require('enzyme'),
    shallow = enzyme.shallow,
    mount = enzyme.mount,
    BeerListContainer = require('./components');

test('BeerListContainer shoud render InputArea and BeerList', (t) => {
  var wrapper = shallow(<BeerListContainer />);

  t.true(wrapper.containsAllMatchingElements([
    <InputArea />,
    <BeerList />
  ]), 'it works, hopefully.');

  t.end();
});
