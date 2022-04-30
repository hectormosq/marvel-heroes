import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnDestroy {
  _subscriptions: Subscription[] = [];

  constructor() {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      if (subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }
}
