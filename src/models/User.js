/**
 * 模块依赖
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defineSchema = new Schema({
    username: {
        type: String,
        displayName: '账号',
        unique: true,
        required: '账号不能为空',
        index: true
    },
    password: {
        type: String,
        displayName: '密码',
        required: '密码不能为空'
    },
    is_active: {
        type: Boolean,
        displayName: '是否启用',
        default: true
    },
    avatar: {
        type: String,
        displayName: '头像'
    },
    name: {
        type: String,
        displayName: '姓名',
        required: '姓名不能为空'
    },
    mobile: {
        type: String,
        displayName: '手机'
    },
    email: {
        type: String,
        displayName: '邮箱'
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        displayName: '关联角色'
    }]
});

module.exports = {
    name: 'User',
    displayName: '用户',
    schema: defineSchema
};