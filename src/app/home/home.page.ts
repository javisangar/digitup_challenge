import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  news: any;

  constructor(private appService: AppService, private router: Router) {
    this.initializeApp();
  }
  initializeApp() {
    this.getAppService();
  }
  getAppService() {
    this.appService.getNews().subscribe(data => {
      this.news = data.articles;
      console.log(this.news);
    });
  }

  seeNew(myNew) {
    this.router.navigate(['notice-detail/', myNew.title]);
  }

}
