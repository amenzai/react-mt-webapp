import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'

import { HashRouter } from 'react-router-dom';

import Container from './Main/Container'

import store from './store.js'

ReactDom.render(
  <HashRouter>
    <Provider store={store}>
        <Container />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)
