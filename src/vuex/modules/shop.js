/**
 * Created by Administrator on 2017/9/19.
 */
import api from '../api'
import * as types from '../types'
import * as config from '@/lib/config'

//2 定义初始状态；
const state={
  imgUrl:'',
}

//4 action
const actions={
  getBanner({commit, state}, req){
    api.getBanner(req, (res)=>{
      commit(types.SL_GET_BANNER, res);
    });
  }
}


const getters={}

//3 mutations
const  mutations={
  [types.SL_GET_BANNER](state, res){
    state.imgUrl = config.imageServerUrl + res;
  }
}


export default{
  state,
  actions,
  getters,
  mutations
}
