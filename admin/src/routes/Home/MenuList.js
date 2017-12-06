
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
// import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './MenuList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class MenuList extends PureComponent {
  state = {
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/fetch',
    // });
  }

  render() {
    // const { rule: { loading: ruleLoading, data } } = this.props;
    // const { selectedRows, modalVisible, addInputValue } = this.state;

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          MenuList.js
        </Card>
      </PageHeaderLayout>
    );
  }
}
