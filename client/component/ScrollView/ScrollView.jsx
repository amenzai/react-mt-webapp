import './ScrollView.scss'

import React from 'react'

import { connect } from 'react-redux'

import Loading from 'component/Loading/Loading.jsx'

/**
 * <ScrollView loadCallback={function} isend={bool}/>
 * @description 滚动加载组件
 */
@connect(state => ({
  readyToLoad: state.scrollViewReducer.readyToLoad
}))
class ScrollView extends React.Component {
  constructor(props) {
    super(props)
  }
  onLoadPage = () => {
    let clientHeight = document.documentElement.clientHeight
    let scrollHeight = document.body.scrollHeight
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop

    let proLoadDis = 30

    if (scrollTop + clientHeight >= scrollHeight - proLoadDis) {
      if (!this.props.isend) {
        if (!this.props.readyToLoad) {
          return
        }
        this.props.loadCallback && this.props.loadCallback()
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onLoadPage)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onLoadPage)
  }
  render() {
    return (
      <div className="scrollview">
        {this.props.children}
        {!this.props.readyToLoad && <Loading />}
        {this.props.isend && <p className="nomore">没有更多数据</p>}
      </div>
    )
  }
}

export default ScrollView
