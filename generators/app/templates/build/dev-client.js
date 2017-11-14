/* eslint-disable */
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

//webpack-hot-middleware/client订阅事件，当为reload的事件时，进行页面刷新
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
})
