// Tiny reproducer for CodeQL js/code-injection (CWE-094)
// https://codeql.github.com/codeql-query-help/javascript/js-code-injection/
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    // BAD: user-controlled input flows directly into eval()
    const cmd = req.query.cmd;
    eval(cmd);
    res.send('done');
});

module.exports = app;
