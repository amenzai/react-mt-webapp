import {
  HEAD_DATA
} from './actionTypes';
import axios from 'axios';

export const getHeaderData = () => async (dispatch) => {
  let resp = await axios({
    method: 'get',
    url: './json/head.json',
  });
  // let resp = await axios({
  //   method: 'post',
  //   url: 'http://oas.vastsum.net/api',
  //   data: {
  //     url: 'http://i.waimai.meituan.com/ajax/v7/home/head',
  //     params: {
  //       not_need_primary_filter: false,
  //       userid: 280770501
  //     }
  //   }
  // });

  dispatch({
    type: HEAD_DATA,
    obj: resp.data
  });

}
