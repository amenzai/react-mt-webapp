import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

// 引入需要的中间件
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'

// 引入根reducers
import mainReducer from './reducers/main.js';

const middlewares = [
  thunkMiddleware,
  createLogger()
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancers(
	applyMiddleware(...middlewares)
));


if (module.hot) {
  module.hot.accept('./reducers/main', () => {
    const nextRootReducer = require('./reducers/main.js').default;
    store.replaceReducer(nextRootReducer)
  });
}


export default store
