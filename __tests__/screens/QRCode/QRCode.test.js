import React from 'react';
import QRCode from '../../../src/screens/QRCode';
import {create} from 'react-test-renderer';

describe('Test Snapshoot', () => {
  test('QRCode Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(<QRCode />);
    expect(snap).toMatchSnapshot();
  });
});
