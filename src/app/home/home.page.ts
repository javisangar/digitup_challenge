import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  news = [];
  offset = 0;
  segmentModel = "all";

  constructor(private appService: AppService, private router: Router) {
    this.initializeApp();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  initializeApp() {
    this.getAppService();
  }
  getAppService(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 20;
    }
    this.appService.getNews(this.offset).subscribe(data => {
      this.news = [...this.news, ...data.articles];

      if (event) {
        event.target.complete();
      }

      if (this.offset == 20) {
        this.infiniteScroll.disabled = true;
      }
    });
  }

  seeNew(myNew) {
    this.router.navigate(['notice-detail/', myNew.title]);
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }

}
