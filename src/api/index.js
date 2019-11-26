/* 
  用来定义请求方法的模块
*/

import axiosInstance from './request'

//请求登录
export const reqLogin = ((username, password) => {
	return axiosInstance({
		method: 'POST',
		url: '/login',
		data: {
			username, password
		}
	})
})


//请求分类列表数据
export const reqGetCategories = () => axiosInstance({
	method: 'GET',
	url: '/category/get',

})


//请求添加分类数据
export const addCategory = (categoryName) => axiosInstance({
	method: 'POST',
	url: '/category/add',
	data:{
		categoryName
	}
})


//修改分类
export const updateCategory = (categoryName,categoryId) => axiosInstance({
	method: 'POST',
	url: '/category/update',
	data:{
		categoryName,
		categoryId
	}
})