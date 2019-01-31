/* @flow */

// export const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
var inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
exports.inBrowser = inBrowser;