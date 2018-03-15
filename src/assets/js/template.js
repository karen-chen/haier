/**
 * Created by Administrator on 2017/8/22.
 */
/*门店列表模板*/
Vue.component('listShop',{
    props:["logo","name","distance","icon"],
    template:`<li>
                <el-row>
                    <el-col :span="3">
                        <div class="logo_shop">
                           <img :src="logo">
                        </div>
                    </el-col>
                    <el-col :span="19" class="p10">
                        <h3>{{name}}</h3>
                        <h4>距离{{distance}}</h4>
                    </el-col>
                    <el-col :span="2" class="text-right">
                        <i class="seach_icon"></i>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">
                        <div class="pic_icon">
                           <img :src="icon">
                        </div>
                    </el-col>
                    <el-col :span="22">
                        <p>现在参加认筹活动即可享受10元抵扣100元，数量有限先到先得</p>
                    </el-col>
                </el-row>
            </li>`
});
//上传图片模板
Vue.component('commentPic',{
    props:["pic","show"],
    template:`<div class="comment_pic">
                <img :src="pic">
                <div class="del_btn">&times;</div>
                <!--正在上传中-->
               <div class="spinner" v-show="show">
                 <div class="spinner_main">
                    <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                  </div>
                  <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                  </div>
                  <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                  </div>
                 </div>
                </div>
            </div>`
});
//提示框模板
Vue.component('popTips',{
    props:["title"],
    template:`<div class="pop_mask">
                 <div class="tips">{{title}}</div>
             </div>`
});
//评论模板
Vue.component('commentariesList',{
    props:["person","name","date","messages","picture"],
    template:`      <div class="commentaries_list">
            <el-row class="pb25">
                <el-col :span="3">
                    <div class="comment_pic">
                        <img :src="person">
                    </div>
                </el-col>
                <el-col :span="21">
                    <el-row class="mt20">
                        <el-col :span="14">
                            {{name}}
                        </el-col>
                        <el-col :span="10" class="text-right">{{date}}</el-col>
                    </el-row>
                    <el-row class="pb25">
                        <el-col>
                            {{messages}}
                        </el-col>
                    </el-row>
                    <el-row class="pb0">
                        <el-col :span="6">
                            <div class="comment_picture">
                                <img :src="picture">
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>`
});
//没有信息模板
Vue.component('notFind',{
    props:["messages"],
    template:`    <div class="not_find">
                    <span></span>
                    <p>{{messages}}</p>
                </div>`
});
//没有信息模板
Vue.component('popPic',{
    props:["messages"],
    template:`     <div class="pop_mask">
                        <el-row>
                            <el-col :span="12">
                                <img src="images/card_logo_01.jpg">
                            </el-col>
                            <el-col :span="12">
                                <img src="images/card_logo_01.jpg">
                            </el-col>
                            <el-col :span="12">
                                <img src="images/card_logo_01.jpg">
                            </el-col>
                        </el-row>
                    </div>`
});
