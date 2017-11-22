```
/*
 * @Author: woden0415.wangdong 
 * @Date: 2017-11-22 18:05:58 
 * @Description: 省市区/县数据字典，查询省，市，区/县
*/
```

数据来源于[行政区划](http://www.xzqh.org)

页面爬虫
```
var str = '{\n\t'
$('.cate ul').each(function (index, item) {
  if (index === 0) {
    str += '\''+ $(item).find('span').text() + '\':'+' '+'['
  } else {
    var arr = []
    $(item).find('li').each(function (index, item) {
      if (index === 0) {
        str += '{\'' + $(item).find('a').text() + '\':'+' '
      } else {
        if (index === 1) {
          str += '[\'' + $(item).find('a').text() + '\','+' '
        } else {
          if ($(item).find('a').text() !== '') {
            str += '\'' + $(item).find('a').text() + '\','+' '
          } 
        }
      }
    })
    str += ']},'
  }
})
str += ']},'
console.log(str)
```

使用方法：
```
使用方法：
1. 查询省列表 PCA_select('', '', addr)
2. 查询省下市列表  PCA_select(province, '', addr)
3. 查询某市下县/区列表  PCA_select(province, city, addr)
```