<template>
  <div class="body">
    <transition mode="out-in" >
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import * as config from '@/lib/config'
import {
  userData,
  EnumConfigType,
  ShareInfo
} from '@/lib/tools';


export default {
  // data() {
  //   return {
  //     showTips: true,
  //     msg: '',
      
  //   }
  // },

    props: ['showTips', 'msg'],
  created() {
    
  },

  methods: {

  }
}





</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.body {
  width: 100%;
  height: 100%;
}

.popBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  .getsuccess {
    width: pTR(560);
    height: pTR(356);
    background: #fff;
    border-radius: pTR(10);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .text {
      padding: pTR(90) 0 pTR(80);
      font-size: pTR(36);
      color: #757575;
    }
    .sureBtn {
      width: pTR(520);
      height: pTR(88);
      line-height: pTR(88);
      border-radius: pTR(10);
      font-size: pTR(36);
      color: #fff;
      background: #f52b3a;
      margin: 0 auto
    }
    .closeBtn {
      position: absolute;
      width: pTR(50);
      height: pTR(50);
      background: url(../../assets/czlImg/closeBtn.png) center center no-repeat;
      background-size: pTR(16) pTR(16);
      right: 0;
      top: 0;
    }
  }
}


.v-enter{
  opacity:0
}

.v-enter-to{
  opacity:1
}

.v-enter-active{
  transition:0.2s
}

.v-leave{
  opacity:1
}

.v-leave-to{
  opacity:0
}

.v-leave-active{
  transition:0.2s
}


</style>
