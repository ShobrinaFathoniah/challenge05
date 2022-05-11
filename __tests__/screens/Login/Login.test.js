import React from 'react';
import Login from '../../../src/screens/Login';
import {create} from 'react-test-renderer';
import ContainerTesting from '../../../src/helpers/reduxTesting';

describe('Test Snapshoot', () => {
  test('Login Snapshoot', () => {
    jest.useFakeTimers();

    const snap = create(ContainerTesting(<Login />));
    expect(snap).toMatchSnapshot();
    // expect(2 + 2).toEqual(4);
  });
});
