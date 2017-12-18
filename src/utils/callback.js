/**
 * 导出模块
 */

module.exports = function () {
    let port = this.c().port, message = `Running on port ${port}`;

    if (process.env.NODE_ENV !== 'production') {
        const boxen = require('boxen');
        const chalk = require('chalk');
        const ip = require('ip');
        const { writeSync: copy } = require('clipboardy');

        message = chalk.green('Serving!');
        message += '\n\n'
        const localURL = `http://localhost:${port}`
        message += `- ${chalk.bold('Local:           ')} ${localURL}`
        try {
            const ipAddress = ip.address()
            const url = `http://${ipAddress}:${port}`

            message += `\n- ${chalk.bold('On Your Network: ')} ${url}`
        } catch (err) { }

        try {
            copy(localURL)
            message += `\n\n${chalk.grey('Copied local address to clipboard!')}`
        } catch (err) { }

        message = boxen(message, {
            padding: 1,
            borderColor: 'green',
            margin: 1
        });
    }
    console.log(message);
};