/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
    name: {
        type: String,
        displayName: '菜单名称',
        required: '菜单名称不能为空'
    },
    uri: {
        type: String,
        displayName: '菜单地址',
        required: '菜单地址不能为空'
    },
    icon: {
        type: String,
        displayName: '菜单图标',
        default: 'code'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        displayName: '父级菜单'
    },
    is_active: {
        type: Boolean,
        displayName: '是否启用',
        default: true
    },
    is_out: {
        type: Boolean,
        displayName: '是否外链',
        default: false
    },
    permission: {
        type: Schema.Types.ObjectId,
        displayName: '关联权限'
    },
    order: {
        type: Number,
        displayName: '显示顺序'
    }
});

module.exports = {
    name: 'Menu',
    displayName: '菜单',
    schema: defineSchema
};