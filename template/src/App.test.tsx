import * as React from 'react';
import { mount } from 'enzyme';
import App from './App';
import 'jest-enzyme';

it('renders without crashing', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('div')).toExist();
});
