// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const axios = require('axios')

// 云函数入口函数
exports.main = async (event, context) => {
  // 请求后端服务器获取指定Domain对象所包含的所有Idea对象和Relationship对象
  // 参数: event
  // {
  //    domain_id 必要 
  //    backend_host 必要 后端服务器主机
  // }
  // 返回
  // 正常:
  // {
  //   code: 0 code = 0表示正常
  //   
  // }
  // 不正常:
  // {
  //   code: 非0, 非0表示不正常
  //   error: 异常信息体
  //   msg: 异常错误信息描述
  // }
  // 参数检查
  if (!event.domain_id || !event.backend_host)
    return {code: -1, msg: '输入参数不正确', error: {}}

  let response = {}
  let _ = await axios({
    url: event.backend_host + '/domain/get_domain_contains',
    params: {domain_id: event.domain_id},
    method: 'GET',
    responseType: 'json'
  }).then(res => {
    response = res.data
    console.log(res.data)
  }).catch(error => {
    response.msg = '获取domain图结构失败'
    response.error = error
    if (response.error.response.data.code === 404000)
      response.msg += ' 原因: 找不到id为' + event.domain_id + '的domain对象'
    response.code = -1
  })
  return response
}