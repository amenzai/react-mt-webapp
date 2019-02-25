import './SearchBar.scss'

import React from 'react'

/**
 * @constructor <SearchBar />
 * @description 顶部搜索框
 */

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search-bar">
        <div className="bar-location">
          <span className="location-icon"></span>
          <span className="location-text">郑州市</span>
          <span className="arrow-right-icon"></span>
        </div>
        <div className="search-btn">
          <p className="place-holder">鸡翅</p>
        </div>
      </div>
    )
  }
}

export default SearchBar
