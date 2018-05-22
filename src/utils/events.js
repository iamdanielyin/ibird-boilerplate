/**
 * 事件订阅
 * @param {*} app 
 */

const moment = require('moment');

module.exports = app => {

  // 模型注册前事件
  app.on('ibird-mongoose:model:pre', obj => {
    // 添加默认字段
    obj.schema.add({
      _creator: {
        type: String,
        displayName: '创建人',
        required: '创建人不能为空',
        ref: 'User',
        default: 'super'
      },
      _created: {
        type: Number,
        displayName: '创建时间',
        index: true
      },
      _created_fmt: {
        type: String,
        displayName: '创建时间（格式化）'
      },
      _modifier: {
        type: String,
        displayName: '修改人',
        ref: 'User'
      },
      _modified: {
        type: Number,
        displayName: '修改时间',
        index: true
      },
      _modified_fmt: {
        type: String,
        displayName: '修改时间（格式化）'
      },
      _dr: {
        type: Boolean,
        displayName: '删除标记',
        default: false
      },
      _remark: {
        type: String,
        displayName: '备注'
      }
    });

    // 格式化字符串
    const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

    // 修改前中间件
    obj.schema.pre('update', function (next) {
      this._modified = moment().unix();
      this._modified_fmt = moment(this._modified, 'X').format(TIME_FORMAT);
      next();
    });

    // 保存前中间件
    obj.schema.pre('save', function (next) {
      if (!this._created) {
        this._created = moment().unix();
        this._created_fmt = moment(this._created, 'X').format(TIME_FORMAT);
        
        this._modified = moment().unix();
        this._modified_fmt = moment(this._modified, 'X').format(TIME_FORMAT);
      }
      next();
    });

    // 默认开放所有模型API
    obj.routeSwitch = {
      list: true,
      id: true,
      create: true,
      update: true,
      remove: true
    };
  });

}