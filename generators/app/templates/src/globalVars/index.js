var host = location.host;
var maps = {
    '<%= projectHost %>': {
        pageBaseURL: 'https://<%= projectHost %>',
        APIBaseURL: 'https://<%= projectAPIHost %>',
        themeClass: 'theme-test',
        tokenName: 'TestToken'
    }
}

export default {
    pageBaseURL: maps[host].pageBaseURL,             //前端页面根路径
    APIBaseURL: maps[host].APIBaseURL,               //后台接口根目录
    themeClass: maps[host].themeClass,               //主题样式class
    tokenName: maps[host].tokenName                  //token名称
};