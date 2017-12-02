/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
    name: {
        type: String,
        displayName: '角色名称',
        unique: true,
        required: '角色名称不能为空'
    },
    type: {
        type: String,
        displayName: '角色类型',
        enum: ['业务角色', '管理角色'],
        default: '业务角色'
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        displayName: '关联权限'
    }]
});

module.exports = {
    name: 'Role',
    displayName: '角色',
    schema: defineSchema
};