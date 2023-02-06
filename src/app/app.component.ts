import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, Query, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './services/news.service';
import {SearchQuery} from './model/search-query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit  {
  title = 'NewsProject';
  sources: any = [];
  articles:any = [];
  selectedNewsChannel: string="Top 10 Trending News!";
  newQuery: SearchQuery = new SearchQuery();
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  ngOnInit(): void {
    this.newsApi.initArticles().subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles;
    })
    this.newsApi.initSources().subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })

  }
  constructor(private observer : BreakpointObserver, private cd : ChangeDetectorRef, private newsApi : NewsService){

  }
  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
    .subscribe((res)=>{
      if(res?.matches){
        this.sideNav.mode="over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    })
    this.cd.detectChanges();
  }
  searchSource(source:any){
    this.newsApi.getArticlesByID(source.id)
    .subscribe((res:any)=>{
      this.selectedNewsChannel = source.name
      this.articles = res.articles;
      this.sideNav.close();
    })
  }
  searchQuery(query: String){
    this.newsApi.getArticlesByQuery(query)
    .subscribe((res:any)=>{
      this.selectedNewsChannel = "Results for "+query,
      this.articles = res.articles;
    })
  }
}

