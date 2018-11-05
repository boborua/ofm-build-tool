import * as React from 'react';
import { mount } from 'enzyme';
import App from './App';
import 'jest-enzyme';

describe('environmental variables', () => {
  const OLD_ENV = process.conf;

  beforeEach(() => {
    jest.resetModules(); // this is important
    process.conf = { ...OLD_ENV };
  });

  afterEach(() => {
    process.conf = OLD_ENV;
  });

  it('change version to dev', () => {
    process.conf.version = 'version-dev';
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('dev');
  });

  it('global env should not be modify', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('dist');
  });

  it('change version to test', () => {
    process.conf.version = 'version-test';
    const wrapper = mount(<App />);
    expect(wrapper).toIncludeText('test');
  });
});
