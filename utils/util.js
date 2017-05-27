function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function obj2string(o) {
  var r = [];
  if (typeof o == "string") {
    return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
  }
  if (typeof o == "object") {
    if (!o.sort) {
      for (var i in o) {
        r.push("\r\n" + i + ":" + obj2string(o[i]));
      }
      if (!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
        r.push("toString:" + o.toString.toString());
      }
      r = "\r\n{" + r.join() + "\r\n}";
    } else {
      for (var i = 0; i < o.length; i++) {
        r.push(obj2string(o[i]))
      }
      r = "\r\n[" + r.join() + "]";
    }
    return r;
  }
  return o.toString();
}

function isEmptyObject(obj) {
  for (var n in obj) {
    return false
  }
  return true;
}

function dateDiff(hisTime, nowTime) {
  if (!arguments.length) return '';
  var now = nowTime ? nowTime : new Date().getTime(),
    diffValue = now - hisTime.getTime(),

    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24,
    halfamonth = day * 15,
    month = day * 30,
    year = month * 12,

    _year = diffValue / year,
    _month = diffValue / month,
    _week = diffValue / (7 * day),
    _day = diffValue / day,
    _hour = diffValue / hour,
    _min = diffValue / minute;

  var result = ''

  if (_year >= 1) result = parseInt(_year) + "年前";
  else if (_month >= 1) result = parseInt(_month) + "个月前";
  else if (_week >= 1) result = parseInt(_week) + "周前";
  else if (_day >= 1) result = parseInt(_day) + "天前";
  else if (_hour >= 1) result = parseInt(_hour) + "小时前";
  else if (_min >= 1) result = parseInt(_min) + "分钟前";
  else result = "刚刚";
  return result;
}

module.exports = {
  formatTime: formatTime,
  obj2string: obj2string,
  isEmptyObject: isEmptyObject,
  dateDiff: dateDiff
}
