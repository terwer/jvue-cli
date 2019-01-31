// =============================
// This is polyfill not in node
// =============================
//
// 模拟window
var window = {
    navigator: {
        userAgent: "Chrome"
    },
    location: {
        href: "./",
        replace:function (win) {
            return win;
        }
    }
};
global.window = window;

var document = {
    querySelector: function (elementName) {
        console.log("document.querySelector invoked,elementName:" + elementName);
        return {
            getAttribute: function (attributeName) {
                console.log(
                    "selector.getAttribute invoked,attributeName:" + attributeName
                );
                return "./"
            }
        };
    }
};
global.document = document;

require("../../dist/js/chunk-vendors.js");
require("../../dist/js/app.js");
require("../../dist/js/about.js");

// const hello = () => {
//   return "Hello World";
// };
//
// console.log(hello());
