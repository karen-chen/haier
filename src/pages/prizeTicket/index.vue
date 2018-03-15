<template>
    <div class="body">
        <router-view></router-view>

<!-- 核销二维码 -->
<!--   <div class="popBox" style="display: none">
      <div class="ma">
          <img class="maimg" src="../../assets/czlImg/vercode.png">
          <p class="matext">请出示给店员使用</p>
          <div class="mabtn"></div>
      </div>
  </div> -->

<!-- 核销成功 -->
  <!-- <div class="masuccess"  style="display: none">核销成功</div> -->


<!-- 奖品券为空 -->

<!--       <div class="null"  style="display: none">
        <div class="nullImg"></div>
        <p class="nulltext">你还没有领取任何奖品</p>
      </div> -->
        
      </div>

    </div>
    
</template>

<script>
export default {

}
</script>

  <style lang="scss" scoped>
     @import '../../assets/scss/_mixins.scss';
     .body{
      width:100%;
      height:100%;
      }

      .popBox{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.8);
      .ma{
        width:pTR(560);
          height:pTR(415);
          position:absolute;
          background:#fff;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          border-radius:pTR(10);
          padding:0 pTR(22);
          .maimg{
             width:pTR(226);
            height:pTR(226);
            display: block;
            margin:pTR(60) auto 0;
          }
          .matext{
            text-align:center;
            padding-top:pTR(40);
          }
          .mabtn{
            position:absolute;
             width:pTR(50);
            height:pTR(50);
            background:url(../../assets/czlImg/closeBtn.png) center center no-repeat;
            background-size:pTR(16) pTR(16);
            right:0;
            top:0;
          }

      }

     
      }
       .masuccess{
        position:fixed;
        width:pTR(288);
        height:pTR(100);
        background:rgba(0,0,0,0.8);
        left:50%;
        top:30%;
        transform:translateX(-50%);
        font-size:pTR(30);
        text-align:center;
        line-height:pTR(100);
        color:#fff;
      }

      .null{
        position:fixed;
        z-index:99;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:#fff;
        .nullImg{
        width:pTR(198);
        height:pTR(129);
        background:url(../../assets/czlImg/icon1.png) 0 0 no-repeat;
        background-size:100%;
        margin:pTR(170) auto pTR(77);
        display: block;
      }

      .nulltext{
        color:#999;
        font-size:pTR(36);
        text-align:center;
      }
      }
        
  </style>