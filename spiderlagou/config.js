var config = {
  positionPostHeader: {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Length': '23',
    'Content-Type': 'application/x-www-form-urlencoded;charset= UTF-8',
    'Cookie': 'user_trace_token=20170910164409-2472c501-8c04-4a71-96cf-5bd8b45c0d2d; LGUID=20170910164410-36ede264-9604-11e7-9160-5254005c3644; JSESSIONID=ABAAABAAAGGABCBCC562FF233B89B8BE863B7CF97F2B029; PRE_UTM=; PRE_HOST=; PRE_SITE=; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2Fzhaopin%2F; ndex_location_city=%E5%85%A8%E5%9B%BD; SEARCH_ID=4428ea8cd57249ee88d7eb841d35dd03; _gid=GA1.2.940899800.1505532104; _ga=GA1.2.1466146068.1505033037; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1505033037,1505532104; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1505533318; LGSID=20170916112204-36854ad9-9a8e-11e7-9196-5254005c3644; LGRID=20170916114220-0ad9570b-9a91-11e7-9196-5254005c3644; TG-TRACK-CODE=search_code',
    'Host': 'www.lagou.com',
    'Origin':'https://www.lagou.com',
    'Pragma':'no-cache',
    'Referer':'https://www.lagou.com/jobs/list_web?labelWords=&fromSearch=true&suginput=',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
    'X-Anit-Forge-Code':0,
    'X-Anit-Forge-Token':'None',
    'X-Requested-With':'XMLHttpRequest',
  },
  proxy: function(){
    return process.env.http_proxy || 'http://10.176.163.58:3128'
  },
  positionDetail: {
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
  }

}

module.exports = config