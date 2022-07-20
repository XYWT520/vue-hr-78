module.exports = [
  {
    url: '/news/getList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: ['第一条新闻', '第二条新闻', '第三条新闻']
      }
    }
  }
]
