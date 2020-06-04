import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../../services/app.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {
  new: any;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService, private _location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      const param = res.myNew;
      this.appService.getSpecificNew(param).subscribe(data => {
        let obj = data;
        this.new = obj['articles'][0];
      });
    })

  }

  backPage() {
    this._location.back();
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
