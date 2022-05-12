jest.useFakeTimers();

import React from 'react';
import Home from '../../../src/screens/Home';
import {create} from 'react-test-renderer';

describe('Test Snapshoot', () => {
  test('Home Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(<Home />);
    expect(snap).toMatchSnapshot();
  });
});
