import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  news: any;

  constructor(private appService: AppService) {
    this.initializeApp();
  }
  initializeApp() {
    this.getAppService();
  }
  getAppService() {
    this.appService.getNews().subscribe(data => {
      this.news = data.articles;
      console.log(this.news[1].content);
    });
  }

}
