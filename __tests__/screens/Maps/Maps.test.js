import React from 'react';
import Maps from '../../../src/screens/Maps';
import {create} from 'react-test-renderer';

describe('Test Snapshoot', () => {
  test('Maps Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(<Maps />);
    expect(snap).toMatchSnapshot();
  });
});
