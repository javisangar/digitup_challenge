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
  favorites = [];

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

  segmentChanged(event) {
    console.log(this.segmentModel);
    console.log(event);
  }
  toFavorites(article) {
    this.favorites.push(article);
  }

  deleteFromFavorites(favorite) {
    for (let i = 0; i < this.favorites.length; i++) {
      if (favorite.title == this.favorites[i].title) {
        this.favorites.splice(i, 1);
      }
    }
  }
  copyMessage(myNew) {
    const val = myNew.url;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    console.log('Url copied to clipboard');
  }

}
