import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";
import { getProducts } from "../../api";

import "./index.less";

export default class Product extends Component {
  state = {
    products: [],
    total: 0
  };

  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "状态",
      dataIndex: "status",
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            已下架
          </div>
        );
      }
    },
    {
      title: "操作",
      render: product => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link" onClick={this.updateCategory(product)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  //获取商品列表
  gProducts = async (pageNum, pageSize) => {
    const result = await getProducts(pageNum, pageSize);
    this.setState({
      products: result.list,
      total: result.total
    });
    console.log(this.state);
  };

  // 页码发生改变事件
  componentDidMount() {
    this.gProducts(1, 3);
  }

  //点击添加商品按钮事件
  addProduct = () => {
    this.props.history.push("/product/add");
  };

  //修改按钮事件
  updateCategory = (product) => {
    return () => {
      // 地址后面加上id --> 为了在更新商品页面刷新时能够获取到商品id --> 通过id发送请求获取商品数据
      // 第二个参数传入product，组件就能通过location.state获取
      this.props.history.push("/product/update/" + product._id, product);
    };
  };

  render() {
    const { products, total } = this.state;
    console.log(products);
    return (
      <Card
        title={
          <div>
            <Select value={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="input"></Input>
            <Button type="primary">搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.addProduct}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
        // style={{ width: 1630 }}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9", "12"],
            defaultPageSize: 3,
            total, // 总数
            onChange: this.gProducts, // 页码发生改变事件
            onShowSizeChange: this.gProducts // pageSize 变化的回调
          }}
        />
      </Card>
    );
  }
}
