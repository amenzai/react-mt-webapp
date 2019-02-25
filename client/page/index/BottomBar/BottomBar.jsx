import './BottomBar.scss'

import React from 'react'

import { NavLink, withRouter } from 'react-router-dom'

import { TABKEY } from '../config.js'

/**
 * @constructor <BottomBar>
 * @description 首页底部tab栏
 */
@withRouter
class BottomBar extends React.Component {
  constructor(props) {
    super(props)
    this.tabs = [
      {
        name: '首页',
        key: TABKEY.home
      },
      {
        name: '订单',
        key: TABKEY.order
      },
      {
        name: '我的',
        key: TABKEY.my
      }
    ]
  }
  renderItems() {

    return this.tabs.map((item, index) => {
      let cls = item.key + ' btn-item'
      let name = item.name

      return (
        <NavLink
          key={index}
          className={cls}
          replace={true}
          to={'/' + item.key}
          activeClassName="active"
        >
          <div className="tab-icon" />
          <div className="btn-name">{name}</div>
        </NavLink>
      )
    })
  }
  render() {
    return <div className="bottom-bar">{this.renderItems()}</div>
  }
}

export default BottomBar
