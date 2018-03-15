import api from '../api'
import * as types from '../types'

//2 定义初始状态；
const state = {
	//图片服务器地址
	picUrl:"http://tmp.s.weshaketv.com/1234567/haier/",
  //sys/getBaseConfigByType接口数据
  caption: '',
  activityAddress: '',
  activityTime: '',
  //banner/getBannerList接口数据
  bannerGrop: [],
  //banner/getProductModuleList接口数据
  list: [],
  //activity/getRecognizeCardList接口数据
  cardlist:[],
  organizationsid:'',

  //activity/getRecognizeCardDetial



}


//4 action
const actions = {

  //sys/getBaseConfigByType
  getBaseConfigByType({ commit, state }, req) {
    api.getBaseConfigByType(req, (res) => {
      commit(types.BM_GET_BASE_CONFING_BY_TYPE, res);
    });
  },


  //banner/getBannerList
  getBannerList({ commit, state }) {
    api.getBannerList((res) => {
      commit(types.BM_GET_BANNER_LIST, res);
    })
  },

  //banner/getProductModuleList

  getProductModuleList({ commit, state }) {
    api.getProductModuleList((res) => {
      commit(types.BM_GET_PRODUCT_MODULE_LIST, res);
    })
  },

    //activity/getRecognizeCardList接口数据
  getRecognizeCardList({ commit, state }) {
    api.getRecognizeCardList((res) => {
      commit(types.BM_GET_RECOGNIZECARD_LIST, res);
    })
  },

  // activity/getRecognizeCardDetial
  //   getRecognizeCardDetial({ commit, state },req) {
  //   api.getRecognizeCardDetial(req,(res) => {
  //     commit(types.BM_GET_RECOGNIZECARD_LIST, res);
  //   })
    
  // },


}

const getters = {}

//3 mutations

const mutations = {

  //sys/getBaseConfigByType
  [types.BM_GET_BASE_CONFING_BY_TYPE](state, res) {
    state.caption = res.caption;
    state.activityAddress = res.activityAddress;
    state.activityTime = res.activityTime;
  },


  //banner/getBannerList
  [types.BM_GET_BANNER_LIST](state, res) {
    // console.log(1111, res)
    state.bannerGrop = res.items
  },

  //banner/getProductModuleList

  [types.BM_GET_PRODUCT_MODULE_LIST](state, res) {
    state.list = res
  },


  //activity/getRecognizeCardList接口数据
  [types.BM_GET_RECOGNIZECARD_LIST](state, res) {
    console.log(55555, res)
    state.cardlist = res;
    state.organizationId=res[0].organizationId;
  },

  //activity/getRecognizeCardDetial
  [types.BM_GET_RECOGNIZECARD_DETIAL](state, res) {
    // state.cardlist = res;


    // state.organizationsid=res[0].sid;
  },


}


export default {
  state,
  actions,
  getters,
  mutations
}
