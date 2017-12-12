
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Table, Alert, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
// import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './MenuList.less';

const Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class MenuList extends PureComponent {
  state = {
    selectedRowKeys: [],
    columns: [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }],
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/fetch',
    // });
  }

  handleSelectRows = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  }

  handleClearSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  }


  render() {
    // const { rule: { loading: ruleLoading, data } } = this.props;
    const { selectedRowKeys, columns } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>
        <Search
          placeholder="请输入查询关键字"
          onSearch={value => alert(value)}
          enterButton
        />
      </div>
    );

    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    }];

    return (
      <PageHeaderLayout
        title="菜单列表"
      // content={content}
      >
        <Card bordered={false}>
          <div className={styles.tableHeader}>
            <Row>
              <Col
                className={styles.tableButtons}
                xs={24}
                sm={24}
                md={16}
              >
                <ButtonGroup className={styles.buttonGroup}>
                  <Button type="primary" icon="plus">新建</Button>
                  <Button type="danger" icon="minus">删除</Button>
                  <Button type="default" icon="upload">导入</Button>
                  <Button type="default" icon="export">导出</Button>
                </ButtonGroup>
                <ButtonGroup className={styles.buttonGroup}>
                  <Button type="default" icon="reload">刷新</Button>
                </ButtonGroup>
              </Col>
              <Col
                className={styles.tableSearch}
                xs={24}
                sm={24}
                md={8}
              >
                <Search
                  placeholder="请输入查询关键字"
                  onSearch={value => alert(value)}
                  enterButton
                />
              </Col>
            </Row>

          </div>
          <div className={styles.tableAlert}>
            <Alert
              message={(
                <div>
                  <span>
                    已选择<a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>项&nbsp;&nbsp;
                  </span>
                  <a onClick={this.handleClearSelected} style={{ marginLeft: 24 }}>清空</a>
                </div>
              )}
              type="info"
              showIcon
            />
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.key || `${Math.random()}`.substring(2)}
            rowSelection={{
              selectedRowKeys,
              onChange: this.handleSelectRows,
            }}
            size="middle"
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
