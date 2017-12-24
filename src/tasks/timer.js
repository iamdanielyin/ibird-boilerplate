/**
 * 导出模块
 */

let count = 0;

module.exports = {
    name: 'timer',
    cronTime: '0 0 * * * *',
    onTick: function () {
        console.log(`It's ${new Date().toLocaleString()}.`);
    }
};