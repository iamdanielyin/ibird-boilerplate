/**
 * 模块依赖
 */

const path = require('path');
const fs = require('fs');

/**
 * 导出函数
 * 当文件不存在时，抛出异常
 * @param {string} env - 环境变量
 */
module.exports = env => {
    env = env || process.env.NODE_ENV || 'dev';
    const fileName = path.join(__dirname, `../config/environments/${env}.json`);
    try {
        console.log(`\n/// 应用环境变量 => ${env} ///\n`);
        const data = fs.readFileSync(fileName).toString();
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`读取配置文件异常：${fileName}`);
    }
};