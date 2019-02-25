import 'component/common.scss'

import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import BottomBar from '../BottomBar/BottomBar'
import Home from '../Home/Home'

import Loading from './Loading'

const Order = Loadable({
  loader: () => import(/* webpackChunkName: "order" */ '../Order/Order'),
  loading: Loading
})

const My = Loadable({
  loader: () => import(/* webpackChunkName: "my" */ '../My/My'),
  loading: Loading
})

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/order" component={Order} />
        <Route path="/my" component={My} />
        <BottomBar />
      </div>
    )
  }
}

export default Main
