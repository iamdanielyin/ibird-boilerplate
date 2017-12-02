/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
    name: {
        type: String,
        displayName: '权限名称',
        required: '权限名称不能为空'
    },
    pid: {
        type: Schema.Types.ObjectId,
        displayName: '父级权限'
    },
    type: {
        type: String,
        displayName: '权限类型',
        required: '权限类型不能为空',
        enum: ['一级菜单', '二级菜单', '三级菜单', '按钮', '其他']
    }
});

module.exports = {
    name: 'Permission',
    displayName: '权限',
    schema: defineSchema
};