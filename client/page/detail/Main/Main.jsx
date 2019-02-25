import 'component/common.scss'
import './Main.scss'

import React from 'react'

import { connect } from 'react-redux'

import NavHeader from 'component/NavHeader/NavHeader'

import { Route, NavLink, Redirect, withRouter } from 'react-router-dom'

import Menu from '../Menu/Menu'
import Comment from '../Comment/Comment'
import Restanurant from '../Restanurant/Restanurant'

import {
  TABKEY
} from '../config.js';
@withRouter
@connect(state => ({
  showChooseContent: state.menuReducer.showChooseContent,
  poiInfo: state.menuReducer.poiInfo
}))
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.tabs = [{
      name: '点菜',
      key: TABKEY.menu
    },
    {
      name: '评价',
      key: TABKEY.comment
    },
    {
      name: '商家',
      key: TABKEY.restanurant
    }
  ]
  }
  renderTabs() {
    return this.tabs.map(item => {
      return (
        <NavLink
          activeClassName="active"
          replace={true}
          to={'/' + item.key}
          key={item.key}
          className="tab-item"
        >
          {item.name}
        </NavLink>
      )
    })
  }
  render() {
    let poiName = this.props.poiInfo.poi_info
      ? this.props.poiInfo.poi_info.name
      : ''
    return (
      <div className="detail">
        <NavHeader title={poiName} />
        <div className="tab-bar">{this.renderTabs()}</div>
        <Route exact path="/" render={() => <Redirect to="/menu" />} />
        <Route path="/menu" component={Menu} />
        <Route path="/comment" component={Comment} />
        <Route path="/restanurant" component={Restanurant} />
        {this.props.showChooseContent ? <div className="mask" /> : null}
      </div>
    )
  }
}

export default Main
