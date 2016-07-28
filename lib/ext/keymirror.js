//https://github.com/wmira/key-mirror
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports =

/**
 * Takes in a {key:val} and returns a key:key
 *  
 * @param object {key1 : val1 ... keyn:valn}
 */
function (obj) {
    var key;
    var mirrored = {};

    if (obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                mirrored[key] = key;
            }
        }
    }
    return mirrored;
};