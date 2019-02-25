import {
  createStore,
  applyMiddleware
} from 'redux';

// 引入根reducers
import mainReducer from './reducers/main.js';

// 引入需要的中间件
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

const store = createStore(mainReducer, applyMiddleware(...middlewares));


if (module.hot) {
  module.hot.accept('./reducers/main', () => {
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer)
  });
}


export default store
