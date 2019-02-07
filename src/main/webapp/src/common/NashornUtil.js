/**
 * 判断是否是Nashorn环境
 * @returns {boolean}
 */
var isInNashorn = function isInNashorn() {
  var isInNashorn =
    typeof document === "undefined" || typeof window === "undefined";
  console.log("isInNashorn:" + isInNashorn);
  return isInNashorn;
};

exports.isInNashorn = isInNashorn;
var inBrowser = typeof window !== "undefined";
exports.inBrowser = inBrowser;
