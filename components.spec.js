import React from 'react';
import { test } from 'tape';
import { shallow, mount } from 'enzyme';
import { BeerListContainer } from './components';
import { InputArea, BeerList } from './components';
import { spy } from 'sinon';

test('BeerListContainer', it => {

  it.test('should render InputArea and BeerList', t => {
    const wrapper = shallow(<BeerListContainer />);

    t.true(wrapper.containsAllMatchingElements([
      <InputArea />,
      <BeerList />
    ]), 'horray!');

    t.end();
  });

  it.test('should start with an empty list', t => {
    const wrapper = shallow(<BeerListContainer />);

    t.deepEqual(wrapper.state('beers'), []);
    t.end();
  });

  it.test('adds items to the list', t => {
    const wrapper = shallow(<BeerListContainer />);

    wrapper.instance().addItem('Sam Adams');

    t.deepEqual(wrapper.state('beers'), ['Sam Adams']);
    t.end();
  });

  it.test('passes addItem to InputArea', t => {
    const wrapper = shallow(<BeerListContainer />);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;

    t.deepEqual(inputArea.prop('onSubmit'), addItem);
    t.end();
  })

  it.test('passes a bound addItem function to InputArea', t => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Sam Adams');

    t.deepEqual(wrapper.state('beers'), ['Sam Adams']);

    t.end();
  });

  it.test('renders the items', t => {
    const wrapper = mount(<BeerListContainer/>);
    wrapper.instance().addItem('Sam Adams');
    wrapper.instance().addItem('Resin');

    t.equal(wrapper.find('li').length, 2);

    t.end();
  })

  it.end();
});

test('InputArea', it => {
  it.test('should contain an input and a button', t => {
    const wrapper = shallow(<InputArea/>);
    t.true(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>
    ]))
    t.end();
  });

  it.test('should accept input', t => {
    const wrapper = mount(<InputArea/>);
    const input = wrapper.find('input');

    input.simulate('change', {target: {value: 'Resin'}});

    t.equal(wrapper.state('text'), 'Resin');
    t.equal(input.prop('value'), 'Resin');

    t.end();
  });

  it.test('should call onSubmit when Add is clicked', t => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({text: 'Octoberfest'});
    const addButton = wrapper.find('button');

    addButton.simulate('click');

    t.true(addItemSpy.calledOnce);
    t.true(addItemSpy.calledWith('Octoberfest'));

    t.end();
  });

  it.end();
});

test('BeerList', it => {
  it.test('should render zero items', t => {
    const wrapper = shallow(<BeerList items={[]}/>);

    t.equal(wrapper.find('li').length, 0);
    t.end();
  });

  it.test('should render undefined items', t => {
    const wrapper = shallow(<BeerList items={undefined}/>);

    t.equal(wrapper.find('li').length, 0);

    t.end();
  });

  it.test('should render some items', t => {
    const items = ['Sam Adams', 'Resin', 'Octoberfest'];
    const wrapper = shallow(<BeerList items={items}/>);

    t.equal(wrapper.find('li').length, 3);

    t.end();
  });

  it.end();
})
