"use strict";
exports.__esModule = true;
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    Helpers.validUrl = function (url) {
        var isValidUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        return isValidUrl.test(url);
    };
    Helpers.findJsonLdImages = function (text) {
        var info = JSON.parse(text);
        return info ? info.logo : null;
    };
    Helpers.svgToDataURL = function (svgStr) {
        if (svgStr && svgStr.indexOf('svg') && svgStr.indexOf('href') === -1) {
            var encoded = encodeURIComponent(svgStr)
                .replace(/'/g, '%27')
                .replace(/"/g, '%22');
            var header = 'data:image/svg+xml,';
            return header + encoded;
        }
        else {
            return null;
        }
    };
    return Helpers;
}());
exports.Helpers = Helpers;
