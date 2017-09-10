var superagent = require('superagent')
var express = require('express')
var cheerio = require('cheerio')

require('superagent-proxy')(superagent)

var proxy = process.env.http_proxy || 'http://10.176.163.58:3128';

var app = express()
app.get('/', function(req, res, next) {
  superagent.get('https://www.lagou.com/jobs/3587677.html')
    .proxy(proxy)
    .end(function(err, sres){
      if(err) {
        return next(err)
      }
      var $ = cheerio.load(sres.text);
      var oJob = {
        companyName: '',
        jobName: '',
        salary: '',
        address: '',
        experience: '',
        education: '',
        nature: '',
        label: [],
        description: '',
        work_addr: ''
      };
      oJob.companyName = $(".job-name>.company").text();
      oJob.jobName = $(".job-name>.name").text();
      oJob.salary = $(".job_request>.salary").text();
      oJob.address = $(".job_request>p>span").eq(1).text();
      oJob.experience = $(".job_request>p>span").eq(2).text();
      oJob.education = $(".job_request>p>span").eq(3).text();
      oJob.nature = $(".job_request>p>span").eq(4).text();

      $(".position-label>.labels").each(function(){
        oJob.label.push($(this).text());
      })
      //oJob.description = $(".job_bt").children("div").html();
      oJob.work_addr = $(".work_addr").children("a").not("#mapPreview").text()
      oJob.work_addr += $(".work_addr").contents().eq(6).text().trim()

      console.log(oJob)
      res.send(oJob)
    })
})
app.listen('3001', function(req, res){
  console.log('3001 port is open')
})