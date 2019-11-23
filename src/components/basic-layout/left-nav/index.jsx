import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/logo.png";
import menus from "../../../config/menus";
/* 
	需求：给非路由组件传递路由组件的三大属性
	解决：withRouter
	作用：给非路由组件传递路由组件的三大属性
*/
import { Link, withRouter } from "react-router-dom";
import "./index.less";
const { SubMenu } = Menu;

@withRouter
class LeftNav extends Component {
  state = {
    menus: []
  };
  createMenus = menus => {
    return menus.map(menu => {
      //判断是否有children
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(cMenu => {
              return this.createCMenus(cMenu);
            })}
          </SubMenu>
        );
      } else {
        return this.createCMenus(menu);
      }
    });
  };

  findOpenKey = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find(cMenu => cMenu.path === pathname);
        if (cMenu) {
          return menu.path;
        }
      }
    }
  };

  createCMenus = menu => {
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };
  componentDidMount() {
    this.setState({
      menus: this.createMenus(menus)
    });
  }

  render() {
    const { pathname } = this.props.location;

    const openKey = this.findOpenKey(menus, pathname);

    return (
      <div>
        <div className="Nav-logo">
          <img src={logo} alt="logo" />
          <h2>硅谷后台</h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;
