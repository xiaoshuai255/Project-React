import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./utils/history";
import BasicLayout from "./components/basic-layout";
import { authRoutes, noAuthRoutes } from "./config/routes";
import "./index.less";

export default class APP extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch> {/* 让遍历的外层Route只显示一个 */}
				{/* login需要单独验证 */}
          {noAuthRoutes.map((route, index) => { 
            return <Route {...route} key={index} />;
          })}
          <BasicLayout> {/* BasicLayout作为父组件来验证登录  里面组件就不用包了 */}
            <Switch> {/* 让遍历的Route只显示一个 */}
              {authRoutes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    );
  }
}
