import React, { Component } from "react";
import logo from "./logo.png";
import { Form, Input, Icon, Button, message } from "antd";
import axios from "axios";

import "./index.less";

const { Item } = Form;

@Form.create()
class Login extends Component {
	//表单校验函数
  validator = (rule, value, callback) => {
    /*
      rule 用来获取当前校验的是哪个表单/Input
      value 当前表单项的值
      callback 不管校验成功还是失败 必须调用的函数
        callback() 代表校验成功
				callback('xxx') 代表校验失败
				rule.filed表示的是getFieldDecorator的第一个参数，(在这里是username或password)
    */
    const name = rule.filed === "username" ? "用户名" : "密码";

    if (!value) {
      callback(`请输入${name}`);
    } else if (value.length < 4) {
      callback(`${name}长度不能少于4位`);
    } else if (value.length > 13) {
      callback(`${name}长度不能大于13位`);
    } else if (!/\w/.test(value)) {
      callback(`${name}可以是数字、字母、下划线`);
    } else {
      callback();
    }
  };

  //登录
  handleSubmit = e => {
    //阻止表单的默认行为
		e.preventDefault();
		

    this.props.form.validateFields((err, values) => {
      if (!err) {
        //校验成功，请求登录
        axios
          .post("http://localhost:5000/api/login", values)
          .then(response => {
            //请求成功，但是不代表登录成功，需要判断response.data的值
            if (response.data.status === 0) {
              //登录成功，跳转页面
              this.props.history.push("./");
            } else {
              //登录失败,将失败信息提示出来
              message.error(response.data.msg);
              //清空密码框
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(err => {
						console.log(err);
						//弹出错误信息
						message.error('网络出现错误，请刷新重试');
            //清空密码框
            this.props.form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    //getFieldDecorator是高阶组件用法
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" className="login-img" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit}>
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  //#region
                  /* {
										required: true,
										message:'必须输入用户名'
									},
                  {
										min:4,
										message: "用户名长度不能少于4位",
									},
									{
										max:13,
										message: "用户名长度不能超过13位",
									},{
										pattern:'/\w/',
										message:'用户名可以是数字、字母、下划线'
									} */
                  //#endregion
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  placeholder="用户名"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  //#region
                  /*   {
                    required: true,
                    message: "必须输入密码"
                  },
                  {
                    min: 4,
                    message: "密码长度不能少于4位"
                  },
                  {
                    max: 13,
                    message: "密码长度不能超过13位"
                  },
                  {
                    pattern: "/w/",
                    message: "密码可以是数字、字母、下划线"
									} */
                  //#endregion
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button type="primary" className="login-btn" htmlType="submit">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

// Form.create方法是一个高阶组件用法。 作用：给组件传递form属性
// export default Form.create()(Login);

export default Login;
