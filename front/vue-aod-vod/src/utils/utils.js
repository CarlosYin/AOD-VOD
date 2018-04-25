

// 判断运行环境
exports.runtime = () => {
  let runtime;
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/jdapp/.test(userAgent)) {
    runtime = 'jd';
  } else if (/jdjr-app/.test(userAgent)) {
    runtime = 'jd';
  } else if (/alipayclient/.test(userAgent)) {
    runtime = 'alipay';
  } else if (/micromessenger/.test(userAgent)) {
    runtime = 'wechat';
  } else if (/android/.test(userAgent) || /iphone/.test(userAgent) || /symbianos/.test(userAgent) || /windows phone/.test(userAgent) || /ipad/.test(userAgent)) {
    runtime = 'h5';
  } else {
    runtime = 'web';
  }
  return runtime;
};
