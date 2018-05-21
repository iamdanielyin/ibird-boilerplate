/**
 * 导出模块
 */

const env = require('./config')(process.env.CONFIG_ENV, true);

module.exports = function () {
    let port = this.c().port, message = `Running on port ${port}`;

    if (env === 'local') {
        const chalk = require('chalk');
        const ip = require('ip');
        const { writeSync: copy } = require('clipboardy');

        message = chalk.green('Serving!');
        message += '\n\n';
        const localURL = `http://localhost:${port}`;
        let networkURL = null;
        message += `- ${chalk.bold('Local:           ')} ${localURL}`
        try {
            const ipAddress = ip.address()
            const url = `http://${ipAddress}:${port}`
            networkURL = url;
            message += `\n- ${chalk.bold('On Your Network: ')} ${url}`
        } catch (err) { }

        try {
            copy(networkURL || localURL)
            message += `\n\n${chalk.grey('Copied network address to clipboard!\n')}`
        } catch (err) { }
    }
    console.log(message);
};