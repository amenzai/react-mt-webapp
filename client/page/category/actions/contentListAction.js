import {
  GET_LIST_DATA
} from './actionTypes';
import { CHANGEREADYSTATE } from 'component/ScrollView/scrollViewActionsTypes.js';
import axios from 'axios';

export const getListData = (obj) => async (dispatch, getState) => {
  dispatch({
    type: CHANGEREADYSTATE,
    obj: false
  });
  let url = './json/homelist.json';
  if (obj.filterData || getState().contentListReducer.filterData) {
    url = './json/listparams.json';
  }
  let resp = await axios({
    method: 'get',
    url: url
  });
  setTimeout(() => {
    dispatch({
      type: GET_LIST_DATA,
      filterData: obj.filterData,
      toFirstPage: obj.toFirstPage,
      obj: resp.data
    })
    dispatch({
      type: CHANGEREADYSTATE,
      obj: true
    });
  }, 1500);

}
