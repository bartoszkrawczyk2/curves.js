import { combineReducers } from 'redux';
import curves from './containers/curves/reducer';
import image from './containers/image/reducer';

export default combineReducers({
    curves,
    image
});