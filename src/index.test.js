import { test } from 'ava';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jsdom-global/register';

import WaitForIt from '.';

configure({ adapter: new Adapter() });

test('shows loading on an infinitely waiting promise', ava => {
  const wrapper = shallow(
    <WaitForIt
      promise={new Promise((resolve) => {})}
    />
  );

  ava.is(wrapper.state('loading'), true);
});

test('resolves loading when done', ava => {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, 100);
  });

  const wrapper = shallow(
    <WaitForIt
      promise={promise}
    />
  );

  return wrapper.state('promise')
    .then(() => {
      ava.is(wrapper.state('loading'), false)
    });
});

test('renders the resolve payload by default', ava => {
  const wrapper = mount(
    <WaitForIt
      promise={Promise.resolve('Done')}
    />
  );

  return wrapper.state('promise')
    .then(() => {
      wrapper.update();
      ava.is(wrapper.state('loading'), false);
      ava.is(wrapper.state('data'), 'Done');
      ava.is(wrapper.state('error'), null);
      ava.snapshot(wrapper);
    });
});

test('renders the rejected message', ava => {
  const wrapper = mount(
    <WaitForIt
      promise={Promise.reject('Error message')}
    />
  );

  return wrapper.state('promise')
    .then(() => {
      wrapper.update();
      ava.is(wrapper.state('loading'), false);
      ava.is(wrapper.state('data'), null);
      ava.is(wrapper.state('error'), 'Error message');
      ava.snapshot(wrapper);
    });
});
