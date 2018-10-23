import * as React from 'react';
import { mount } from 'enzyme';
import App from './App';
import 'jest-enzyme';

describe('environmental variables', () => {
  const OLD_ENV = global.env;

  beforeEach(() => {
    jest.resetModules(); // this is important
    global.env = { ...OLD_ENV };
  });

  afterEach(() => {
    global.env = OLD_ENV;
  });

  it('change version to dev', () => {
    global.env.version = 'version-dev';
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('dev');
  });

  it('global env should not be modify', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('dist');
  });

  it('change version to test', () => {
    global.env.version = 'version-test';
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('test');
  });
});
