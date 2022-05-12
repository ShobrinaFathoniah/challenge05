jest.useFakeTimers();

import React from 'react';
import Profile from '../../../src/screens/Profile';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../../src/helpers/reduxTesting';

describe('Test Snapshoot', () => {
  test('Profile Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(ContainerTesting(<Profile />));
    expect(snap).toMatchSnapshot();
  });
});
