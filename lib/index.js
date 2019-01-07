/* eslint-disable */
;(function () {

    // 开启严格模式，规范代码，提高浏览器运行效率
    'use strict';
  
    // 加法函数，用来得到精确的加法结果
    // 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    // 调用：accAdd(arg1,arg2)
    // 返回值：arg1加上arg2的精确结果
    function accAdd(arg1, arg2) {
      var r1, r2, m;
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m
    }
    // 减法计算
    function accSub(arg1, arg2) {
      var r1, r2, m, n;
      try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2));
      // last modify by deeka
      // 动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }
  
    // 除法函数，用来得到精确的除法结果
    // 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    // 调用：accDiv(arg1,arg2)
    // 返回值：arg1除以arg2的精确结果
    function accDiv(arg1, arg2) {
      var t1 = 0, t2 = 0, r1, r2;
      try { t1 = arg1.toString().split('.')[1].length } catch (e) { }
      try { t2 = arg2.toString().split('.')[1].length } catch (e) { }
      r1 = Number(arg1.toString().replace('.', ''))
      r2 = Number(arg2.toString().replace('.', ''))
      return (r1 / r2) * Math.pow(10, t2 - t1);
    }
  
    // 乘法函数，用来得到精确的乘法结果
    // 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    // 调用：accMul(arg1,arg2)
    // 返回值：arg1乘以arg2的精确结果
    function accMul(arg1, arg2) {
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try { m += s1.split('.')[1].length } catch (e) { }
      try { m += s2.split('.')[1].length } catch (e) { }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }
    function isNothing(value) {
      return value === '' || value === undefined || value === null || (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
    }
    // toFixed 修复
    function toFixed(num, s) {
      var times = Math.pow(10, s)
      var des = num * times + 0.5
      des = parseInt(des, 10) / times
      return des + ''
    }
    // 分转元
    function toYuan(value) {
      if (isNothing(value)) {
        return;
      }
      value = parseInt(value, 10);
      return accDiv(value, 100);
    }
    // 元转分
    function toCent(value) {
      if (this.isNothing(value)) {
        return;
      }
      value = parseFloat(value);
      // 解决浮点数计算bug
      return parseInt(toFixed(accMul(value, 100), 2), 10);
    }
    var Cal = {
      add: accAdd,
      sub: accSub,
      div: accDiv,
      mul: accMul,
      toFixed: toFixed,
      toYuan: toYuan,
      toCent: toCent
    }
    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = Cal;
  
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return Cal; });
  
  })();