function request(options) {
  // 开启loading效果
  uni.showLoading({
    title: 'loading....',
  })
  return new Promise((reslove, reject) => {
    uni.request({
      url: "http://127.0.0.1:8888/api/" + options.url,
      method: options.method || 'get',
      data: options.data,
      success(res) {
        reslove(res.data)
      },
      fail(err) {
        reject(err);
      },
      complete(){
        uni.hideLoading();
      }
    })
  })
}

export default request;

