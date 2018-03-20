没有使用传说中的LoadRunner，在网上发现了[loadtest](https://www.npmjs.com/package/loadtest)。真是应了那句话，
> 凡是能用JavaScript写的，都将会有JavaScript的实现方法。

压力测试没有想象中的那么简单，以后有机会一定再做一次。压死它
```
loadtest -n 10000 -c 100 -k http://www.jiayuan.com/
```
