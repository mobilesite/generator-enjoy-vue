const list = {
    "code": 0,
    "msg": "",
    "error": "",
    "data": [
        
    ]
};

export default {
    getList(cb) {
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                resolve(list);
            }, 500)
        })
    }
}