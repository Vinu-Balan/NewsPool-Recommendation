import { AuthService } from '../../shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, OnInit ,Component, Query, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from 'src/app/services/news.service';
import {SearchQuery} from 'src/app/model/search-query';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'NewsProject';
  sources: any = [];
  articles:any = [];
  data: any = "";
  dataf: any ="";
  k: any = 0;
  isloaded: any = false;
  selectedNewsChannel: string="Top 10 Trending News!";
  newQuery: SearchQuery = new SearchQuery();
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  ngOnInit(): void {
    // this.homeRec();
    this.selectedNewsChannel = "Top 10 Trending News!",
    this.newsApi.initArticles().subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles;
      this.isloaded = true;
    })
    this.newsApi.initSources().subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })
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
    

  }
  constructor(public authService: AuthService,private observer : BreakpointObserver, private cd : ChangeDetectorRef, private newsApi : NewsService,public db: AngularFireDatabase) {}

  saveData(query: String,username: String){
    const ref = this.db.list("recommended");
    ref.push({username: username,query: query}).then((res) =>{
      console.log(res);
    }).catch((e) =>{
      console.log(e);
    })
  }

  homeRec(username: String): void {
    
    const ref = this.db.list('recommended')
    ref.valueChanges().subscribe((data)=>{
      data.forEach(element => {
          this.data = element;
          if(this.data.username==username){
            this.dataf = element;
          }
      });
    })
    this.data = this.dataf;
    console.log(this.data.query)
    if(!this.data.query){
      this.newsApi.initArticles().subscribe((res:any)=>{
        console.log(res);
        this.articles = res.articles;
      })
      this.newsApi.initSources().subscribe((res:any)=>{
        console.log(res);
        this.sources = res.sources;
      })
    }else{
      this.newsApi.getArticlesByQuery(this.data.query)
    .subscribe((res:any)=>{
      this.selectedNewsChannel = "Recommended For You",
      this.articles = res.articles;
    });
    }
    this.newsApi.initSources().subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources;
    })

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
  searchQuery(query: String,username: String){
    this.saveData(query,username);
    this.newsApi.getArticlesByQuery(query)
    .subscribe((res:any)=>{
      this.selectedNewsChannel = "Results for "+query,
      this.articles = res.articles;
    });
    
  }
}



