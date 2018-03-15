import api from '../api'
import * as types from '../types'

//2 定义初始状态；
const state={
  obj:[],
}


//4 action
const actions={
  getQuestionnaire({commit, state}, req){
    api.getQuestionnaire(req, (res)=>{
      commit(types.SV_GET_QUESTION_NAIRE, res);
    });
  }
}

const getters={}

//3 mutations
const mutations={
  [types.SV_GET_QUESTION_NAIRE](state, res){
    state.obj = res;
  }
}


export default{
  state,
  actions,
  getters,
  mutations
}
