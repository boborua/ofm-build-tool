import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  mount(<App />);
});

it('global env should not be modify', () => {
  return new Promise(resolve => {
    setTimeout(() => {
      expect(global.env.version).toBe('dist');
      resolve(true);
    }, 4000);
  })
});