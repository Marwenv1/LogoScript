"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var cheerio = require("cheerio");
var Helpers_1 = require("./Helpers");
var HtmlLoader_1 = require("./HtmlLoader");
var ImageSearch = /** @class */ (function () {
    function ImageSearch() {
    }
    ImageSearch.findImages = function (url, showAllImages) {
        return __awaiter(this, void 0, void 0, function () {
            var response, $, logos, correctLogos, logo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HtmlLoader_1.HtmlLoader.getHTML(url)];
                    case 1:
                        response = _a.sent();
                        $ = cheerio.load(response.html);
                        logos = __spreadArrays([
                            { type: 'og:logo', url: $('meta[property="og:logo"]').attr('content') },
                            { type: 'meta-itemprop/logo', url: $('meta[itemprop="logo"]').attr('content') }
                        ], $('link[rel*="icon"]')
                            .map(function (i, el) {
                            return { type: 'link-rel/icon', url: $(el).attr('href'), size: $(el).attr('sizes') };
                        })
                            .get(), [
                            { type: 'img-itemprop/logo', url: $('img[itemprop="logo"]').attr('src') },
                            {
                                type: 'meta-name/msapplication-TileImage',
                                url: $('meta[name*="msapplication-TileImage"]').attr('content')
                            },
                            { type: 'meta-content/logo', url: $('meta[content*="logo"]').attr('content') },
                            { type: 'meta-content/image', url: $('meta[itemprop*="image"]').attr('content') }
                        ], $('script[type*="application/ld+json"]')
                            .map(function (i, el) {
                            return { type: 'json-ld-logo', url: Helpers_1.Helpers.findJsonLdImages($(el).html()) };
                        })
                            .get(), [
                            { type: 'img-alt/logo', url: $('img[alt*="logo"]').attr('src') },
                            { type: 'img-alt/logo-class', url: $('img[class*="logo"]').attr('src') },
                            { type: 'img-src/logo', url: $('img[src*="logo"]').attr('src') },
                            { type: 'og:image', url: $('meta[property="og:image"]').attr('content') },
                            { type: 'svg:image', data: true, url: Helpers_1.Helpers.svgToDataURL($('a[class*="logo"]').html()) },
                        ]).filter(function (e) { return e.url; });
                        correctLogos = logos.map(function (image) {
                            return !Helpers_1.Helpers.validUrl(image.url) && image.url.indexOf('data:') === -1
                                ? __assign(__assign({}, image), { url: response.url + image.url }) : image;
                        });
                        if (showAllImages) {
                            return [2 /*return*/, correctLogos];
                        }
                        else {
                            logo = correctLogos[0];
                            return [2 /*return*/, logo];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ImageSearch;
}());
exports.ImageSearch = ImageSearch;
