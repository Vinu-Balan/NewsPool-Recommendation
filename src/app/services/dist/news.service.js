"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewsService = void 0;
var core_1 = require("@angular/core");
var NewsService = /** @class */ (function () {
    function NewsService(http) {
        this.http = http;
        this.api_key = '1cc70a9372024630b54208a9f0aad783';
    }
    NewsService.prototype.initSources = function () {
        return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
    };
    NewsService.prototype.initArticles = function () {
        return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
    };
    NewsService.prototype.getArticlesByID = function (source) {
        return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
    };
    NewsService.prototype.getArticlesByQuery = function (query) {
        return this.http.get('https://newsapi.org/v2/everything?q=' + query + '&from=2023-02-04&to=2023-02-04' + '&from=2023-01-04&sortBy=publishedAt' + '&apiKey=' + this.api_key);
    };
    NewsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
