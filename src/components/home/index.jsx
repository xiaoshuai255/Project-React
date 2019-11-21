import React, { Component } from "react";
import { Menu, Icon } from "antd";

import logo from "./logo.png";
import './index.less'

const { SubMenu } = Menu;

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-left">
          <div className="home-left-top">
            <img src={logo} alt="logo" className="home-img"/>
            <h2>硅谷后台</h2>
            <Menu>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>首页</span>
                  </span>
                }
              ></SubMenu>

              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>商品</span>
                  </span>
                }
              >
                <Menu.Item key="1">分类管理</Menu.Item>
                <Menu.Item key="2">商品管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>用户管理</span>
                  </span>
                }
              ></SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>权限管理</span>
                  </span>
                }
              ></SubMenu>

              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="mail" />
                    <span>图形图表</span>
                  </span>
                }
              >
                <Menu.Item key="3">柱状图</Menu.Item>
                <Menu.Item key="4">折线图</Menu.Item>
                <Menu.Item key="5">饼状图</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="home-right"></div>
      </div>
    );
  }
}







