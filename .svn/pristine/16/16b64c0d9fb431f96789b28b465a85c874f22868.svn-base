<template>
  <div class="uncoupon_body">
    <div class="text-center el-row">
      <div class="icon_uncoupon"></div>
    </div>
    <div class="text-center el-row">
      <div class="text">
        没有认筹活动可选<br>
        请联系上一级管理员！
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../assets/scss/_mixins.scss';
  @import '../../assets/scss/pages/_index.scss';
  @import '../../assets/scss/pages/_uncoupon.scss';
</style>
<script>
  import * as config from '@/lib/config'
  import {
    getJsSign,
    wxconfig,
    wxHideMenu
  } from '@/lib/tools';
  export default {
    data(){
      return {

      }
    },
    created(){
      getJsSign(function(sign) {
        wxconfig(sign);
      })
      wxHideMenu()
      wx.ready(function(){
        wx.showMenuItems({
          menuList: [
            'menuItem:favorite',
          ] // 要显示的菜单项，所有menu项见附录3
        });
      })
    },
/*    methods:{
      pushHistory() {
        var state = {
          title: "title",
          url: "#"    };
        window.history.pushState(state, "title", "#");
      }
    }*/
  }
</script>
