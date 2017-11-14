var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

// 这里之所以merge，是因为希望如果在不为dev.env.js指定特定的环境变量的时候，希望能使用pord.env.js中指定的环境变量
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
