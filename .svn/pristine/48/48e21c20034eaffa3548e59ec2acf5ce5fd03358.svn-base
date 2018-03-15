import * as config from '@/lib/config'
import * as tool from '@/lib/tools'



export default {

  getQuestionnaire(req, cb) {
    $.ajax({
      type: "GET",
      url: config.locationUrl + "/questionnaire/getQuestionnaire",
      dataType: "jsonp",
      data: {
        questionnaireId:req.questionnaireId
      },
      success(res) {

        console.log(res);

        if (res.ret == 0) {
          cb && cb(res.obj);
        } else {
          console.log('questionnaire/getQuestionnaire:', 'ret != 0');
        }

      },
      error(res) {
        console.log('questionnaire/getQuestionnaire:', 'fail');
      }
    });
  },



}

