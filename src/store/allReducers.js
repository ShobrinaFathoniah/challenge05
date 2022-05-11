import {combineReducers} from 'redux';
import {loginReducer} from '../screens/Login/redux/reducer';
// import {homeReducer} from '../screens/Home/redux/reducer';
import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  login: loginReducer,
  // home: homeReducer,
  global: globalReducer,
});
