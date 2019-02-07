/**
 * poli-fill the following
 * global,process,console,Object.assign
 * setTimeout,clearTimeout,setImmediate,clearImmediate,setInterval,clearInterval
 * XMLHttpRequest
 */
// 模拟global
var global = this;

// 模拟console
var console = {};
console.debug = print;
console.warn = print;
console.log = print;
console.error = print;
console.trace = print;
console.assert = print;
global.console = console;

// 模拟Object.assign
Object.assign = function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
