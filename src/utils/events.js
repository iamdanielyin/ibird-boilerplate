/**
 * 事件订阅
 * @param {*} app 
 */

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
      _createdFormat: {
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
      _modifiedFormat: {
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

    // 修改前中间件
    obj.schema.pre('update', function (next) {
      if (!this._modified) {
        this._modified = moment().unix();
        this._modifiedFormat = moment(this._modified, 'X').format(utility.timeFormat);
      }
      next();
    });

    // 保存前中间件
    obj.schema.pre('save', function (next) {
      if (!this._created) {
        this._created = moment().unix();
        this._createdFormat = moment(this._created, 'X').format(utility.timeFormat);
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