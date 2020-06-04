import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../../services/app.service';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {
  new: any;
  comments = [];

  get name() {
    return this.commentForm.get('name');
  }

  get email() {
    return this.commentForm.get('email');
  }

  get comment() {
    return this.commentForm.get('comment');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'minlength', message: 'Minimum 2 characters is required' },
      { type: 'maxlength', message: 'Maximum 30 characters' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    comment: [
      { type: 'required', message: 'Comment is required' },
      { type: 'minlength', message: 'Minimum 3 characters is required' },
      { type: 'maxlength', message: 'Maximum 150 characters' },
    ]
  };

  commentForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.max(30)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/)]],
    comment: ['', [Validators.required, Validators.minLength(3), Validators.max(150)]]
  });

  constructor(private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private _location: Location,
    private formBuilder: FormBuilder
  ) { }

  sendComment() {
    this.comments.push(this.commentForm.value);
    console.log(this.comments);
  }

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
