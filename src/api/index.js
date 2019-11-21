/* 
  用来定义请求方法的模块
*/

import axiosInstance from './request'

//请求登录
export const reqLogin = ((username,password) => {
	return axiosInstance({
		method: 'POST',
		url: '/login',
		data: {
			username, password
		}
	})
})