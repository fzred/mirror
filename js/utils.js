/******** 本示例仅做开发参考使用，不建议在生产环境下暴露 key！ ********/
var UID = "U753641B71"; // 测试用 用户ID，请更换成您自己的用户ID
var KEY = "y8ibnpi53yxv7gmw"; // 测试用key，请更换成您自己的 Key
var API = ""; // 获取天气实况
var LOCATION = "深圳"; // 除拼音外，还可以使用 v3 id、汉语等形式
const appEl = document.querySelector('#app')
export function enKEY() {
  // 获取当前时间戳
  var ts = Math.floor((new Date()).getTime() / 1000);
  // 构造验证参数字符串
  var str = "ts=" + ts + "&uid=" + UID;
  // 使用 HMAC-SHA1 方式，以 API 密钥（key）对上一步生成的参数字符串（raw）进行加密
  // 并将加密结果用 base64 编码，并做一个 urlencode，得到签名 sig
  var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64);
  sig = encodeURIComponent(sig);
  str = str + "&sig=" + sig + '&location='+LOCATION;
  return str
}
