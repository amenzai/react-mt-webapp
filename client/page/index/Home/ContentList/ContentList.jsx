import './ContentList.scss'

import React from 'react'
import { connect } from 'react-redux'

import ListItem from 'component/ListItem/ListItem.jsx';

import ScrollView from 'component/ScrollView/ScrollView.jsx'

import { getListData } from '../../actions/contentListAction'

/**
 * @constructor <ContentList />
 * @description 附近商家列表
 */
@connect(state => ({
  list: state.contentListReducer.list,
  page: state.contentListReducer.page,
  isend: state.contentListReducer.isend
}))
class ContentList extends React.Component {
  constructor(props) {
    super(props)

    // 请求第一屏数据
    this.fetchData()
  }

  onLoadPage() {
    // 最多滚动3页3次
    if (this.props.page <= 3) {
      this.fetchData()
    }
  }

  fetchData() {
    this.props.dispatch(getListData({}))
  }

  renderItems() {
    let list = this.props.list
    return list.map((item, index) => {
      return <ListItem key={index} itemData={item} />
    })
  }

  render() {
    return (
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line" />
          <span>附近商家</span>
          <span className="title-line" />
        </h4>
        <ScrollView
          loadCallback={this.onLoadPage.bind(this)}
          isend={this.props.isend}
        >
          {this.renderItems()}
        </ScrollView>
      </div>
    )
  }
}
export default ContentList
