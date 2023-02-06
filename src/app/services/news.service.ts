import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  api_key = '1cc70a9372024630b54208a9f0aad783';
  constructor(private http: HttpClient) { }


  initSources() {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }


  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
  }

  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
  getArticlesByQuery(query: String){
    return this.http.get('https://newsapi.org/v2/everything?q='+ query +'&from=2023-02-04&to=2023-02-04'+'&from=2023-01-04&sortBy=publishedAt' + '&apiKey=' + this.api_key);
  }

}
