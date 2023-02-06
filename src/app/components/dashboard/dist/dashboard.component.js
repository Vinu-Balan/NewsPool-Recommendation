"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var sidenav_1 = require("@angular/material/sidenav");
var search_query_1 = require("src/app/model/search-query");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authService, observer, cd, newsApi, db) {
        this.authService = authService;
        this.observer = observer;
        this.cd = cd;
        this.newsApi = newsApi;
        this.db = db;
        this.title = 'NewsProject';
        this.sources = [];
        this.articles = [];
        this.data = "";
        this.dataf = "";
        this.k = 0;
        this.isloaded = false;
        this.selectedNewsChannel = "Top 10 Trending News!";
        this.newQuery = new search_query_1.SearchQuery();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.homeRec();
        this.selectedNewsChannel = "Top 10 Trending News!",
            this.newsApi.initArticles().subscribe(function (res) {
                console.log(res);
                _this.articles = res.articles;
                _this.isloaded = true;
            });
        this.newsApi.initSources().subscribe(function (res) {
            console.log(res);
            _this.sources = res.sources;
        });
        // console.log(this.data.query);
        // if(this.data.length==0){
        //   this.newsApi.initArticles().subscribe((res:any)=>{
        //     console.log(res);
        //     this.articles = res.articles;
        //   })
        //   this.newsApi.initSources().subscribe((res:any)=>{
        //     console.log(res);
        //     this.sources = res.sources;
        //   })
        // }else{
        //   this.newsApi.getArticlesByQuery(this.data.query)
        // .subscribe((res:any)=>{
        //   this.selectedNewsChannel = "Results for "+this.data.query,
        //   this.articles = res.articles;
        //   this.newsApi.initSources().subscribe((res:any)=>{
        //     console.log(res);
        //     this.sources = res.sources;
        //   })
        // });
        // }
    };
    DashboardComponent.prototype.saveData = function (query, username) {
        var ref = this.db.list("recommended");
        ref.push({ username: username, query: query }).then(function (res) {
            console.log(res);
        })["catch"](function (e) {
            console.log(e);
        });
    };
    DashboardComponent.prototype.homeRec = function (username) {
        var _this = this;
        var ref = this.db.list('recommended');
        ref.valueChanges().subscribe(function (data) {
            data.forEach(function (element) {
                _this.data = element;
                if (_this.data.username == username) {
                    _this.dataf = element;
                }
            });
        });
        this.data = this.dataf;
        console.log(this.data.query);
        if (!this.data.query) {
            this.newsApi.initArticles().subscribe(function (res) {
                console.log(res);
                _this.articles = res.articles;
            });
            this.newsApi.initSources().subscribe(function (res) {
                console.log(res);
                _this.sources = res.sources;
            });
        }
        else {
            this.newsApi.getArticlesByQuery(this.data.query)
                .subscribe(function (res) {
                _this.selectedNewsChannel = "Recommended For You",
                    _this.articles = res.articles;
            });
        }
        this.newsApi.initSources().subscribe(function (res) {
            console.log(res);
            _this.sources = res.sources;
        });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.sideNav.opened = true;
        this.observer.observe(['(max-width:800px)'])
            .subscribe(function (res) {
            if (res === null || res === void 0 ? void 0 : res.matches) {
                _this.sideNav.mode = "over";
                _this.sideNav.close();
            }
            else {
                _this.sideNav.mode = 'side';
                _this.sideNav.open();
            }
        });
        this.cd.detectChanges();
    };
    DashboardComponent.prototype.searchSource = function (source) {
        var _this = this;
        this.newsApi.getArticlesByID(source.id)
            .subscribe(function (res) {
            _this.selectedNewsChannel = source.name;
            _this.articles = res.articles;
            _this.sideNav.close();
        });
    };
    DashboardComponent.prototype.searchQuery = function (query, username) {
        var _this = this;
        this.saveData(query, username);
        this.newsApi.getArticlesByQuery(query)
            .subscribe(function (res) {
            _this.selectedNewsChannel = "Results for " + query,
                _this.articles = res.articles;
        });
    };
    __decorate([
        core_1.ViewChild(sidenav_1.MatSidenav)
    ], DashboardComponent.prototype, "sideNav");
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
