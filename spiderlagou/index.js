var superagent = require('superagent')
var cheerio = require('cheerio')
require('superagent-proxy')(superagent)

const config = require('./config.js')


var positionArrUrl = 'https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&isSchoolJob=0'


/**
 * @param {*页数} pageIndex
 * @param {*存放职位ID的数组容器} container
 */
function postPositionId(pageIndex, container, count){
  superagent
    .post(positionArrUrl)
    .set(config.positionPostHeader)
    .proxy(config.proxy())
    .send({
      first: false,
      pn: pageIndex,
      kd: 'web'
    })
    .end(function(err, res){
      if(err) {
        return next(err)
      }
      const Odata = JSON.parse(res.text)
      const Aposition = Odata.content.positionResult.result;
      const ApositionLen = Aposition.length;
      for(var j = 0; j < ApositionLen; j++) {
        container.push(Aposition[j].positionId);
      }
      count1++;
      callDetail();
    })
}

/**
 *
 * @param {*职位的ID} positionId
 * @param {*存放职位对象的数组容器} container
 */
function getPositionDetail(positionId, container) {
  superagent
    .get('https://www.lagou.com/jobs/'+positionId+'.html')
    .proxy(config.proxy())
    .end(function(err, sres){
      if(err) {
        return next(err)
      }
      var reg = /[\/\s]/g
      var $ = cheerio.load(sres.text);
      var oJob = config.positionDetail;
      oJob.companyName = $(".job-name>.company").text();
      oJob.jobName = $(".job-name>.name").text();
      oJob.salary = $(".job_request .salary").text();
      oJob.address = $(".job_request>p>span").eq(1).text().replace(reg, '');
      oJob.experience = $(".job_request>p>span").eq(2).text().replace(reg, '');
      oJob.education = $(".job_request>p>span").eq(3).text().replace(reg, '');
      oJob.nature = $(".job_request>p>span").eq(4).text().replace(reg, '');

      $(".position-label>.labels").each(function(){
        oJob.label.push($(this).text());
      })
      oJob.work_addr = $(".work_addr").children("a").not("#mapPreview").text()
      oJob.work_addr += $(".work_addr").contents().eq(6).text().trim()

      console.log('positionId:' + positionId)
      if(positionId == 3046967) {
        console.log($(".job-name>.company").text())
        console.log(oJob)
      }
      positionDetailArr.push(oJob)
      count2++
      print()
    })
}

function callDetail (){
  if(count1 == page) {
    positionIdArr.forEach(function(ele, index){
      getPositionDetail(ele, positionDetailArr)
    })
    //console.log(positionIdArr)
  }
}

function print () {
  if(count2 == 15*2){
    console.log('--------')
    //console.log(positionDetailArr)
  }
}
// 计数器，控制异步
var count1 = 0;
var count2 = 0;
// 开始爬虫
// 爬5页
var page = 2
// 职位ID数组


var positionIdArr = [];

  for(var i = 1; i <= page; i++ ) {
    postPositionId(i, positionIdArr)
  }
// 职位详情数组
var positionDetailArr = []
