/**
 * 模块依赖
 */

const path = require('path');
const fs = require('fs');

/**
 * 导出函数
 * 当文件不存在时，抛出异常
 * @param {string} env - 环境变量
 * @param {boolean} [onlyKey] - 只返回环境变量的键
 */

const cache = {};
module.exports = (env, onlyKey) => {
    if (cache.env) {
        return onlyKey ? cache.env : cache.config;
    }

    env = process.env.CONFIG_ENV = (env || process.env.CONFIG_ENV || 'local');

    const fileName = path.join(__dirname, `../config/environments/${env}.json`);
    try {
        console.log(`\n/// 应用环境变量 => ${env} ///\n`);
        const data = fs.readFileSync(fileName).toString();
        cache.env = env;
        cache.config = JSON.parse(data)
        return onlyKey ? cache.env : cache.config;
    } catch (err) {
        throw new Error(`读取配置文件异常：${fileName}`);
    }
};