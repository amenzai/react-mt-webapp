import categoryReducer from './categoryReducer.js';
import contentListReducer from './contentListReducer.js';
import orderReducer from './orderReducer.js';
import scrollViewReducer from 'component/ScrollView/scrollViewReducer.js';

import {
  combineReducers
} from 'redux';

const reducers = combineReducers({
  categoryReducer,
  contentListReducer,
  orderReducer,
  scrollViewReducer
});


export default reducers;
