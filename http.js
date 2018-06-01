/**
 * Created by erdou on 2018/6/1.
 */
(function (window, document, undefined) {
    'use strict'

    //1.挂载回调函数
    // 2.将data转化成url字符窜的形式{id:1001,name:"tom" ....} ==>"id=1001&name=tom"
    // 3.处理url中的回调函数   url += callback = 函数名
    // 4.创建script标签
    // 5.将script标签放到页面中

    var jsonp = function (url, data, callback) {

        var fnSuffix = Math.random().toString().replace('.', '')

        var cbFunName = 'my_json_back_' + fnSuffix;

        window[cbFunName]  = callback;
        var queryString = url.indexOf('?') == -1 ? '?' : '&';
        for (var key in data) {
            queryString += key + '=' + data[key] + '&';  //结果 id=1&
        }
        // queryString ==> ?id=1&name=tom&
        queryString += 'callback=' + cbFunName;    // 1.cb为函数名称任意（可以固定cb=appFunBack）2.随机函数名称
        // queryString  ===>  queryString= ?id=1&name=tom&cb=my_json_back_(任意数字)


        var scriptElement = document.createElement('script');

        scriptElement.src = url + queryString; // 不能将其放到append页面中（放到页面中发送请求立即执行函数没有执行完）

        document.body.appendChild(scriptElement)
    };

    window.$jsonp = jsonp;

})(window, document);