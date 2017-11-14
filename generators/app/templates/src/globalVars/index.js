var host = location.host;
var maps = {
    'm.test.com': {
        pageBaseURL: 'https://m.test.com',
        APIBaseURL: 'https://api.test.com',
        themeClass: 'theme-test',
        tokenName: 'TestToken'
    }
}

export default {
    pageBaseURL: maps[host].pageBaseURL,    //前端页面根路径
    APIBaseURL: maps[host].APIBaseURL,               //后台接口根目录
    themeClass: maps[host].themeClass,               //主题样式class
    tokenName: maps[host].tokenName                  //token名称
};