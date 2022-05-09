import React from 'react';
import Register from '../../../src/screens/Register';
import {create} from 'react-test-renderer';

describe('Test Snapshoot', () => {
  test('Register Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(<Register />);
    expect(snap).toMatchSnapshot();
  });
});
