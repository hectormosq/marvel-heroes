import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '@app/core/components/abstract/base/base.component';
import { BackendApiService } from '@app/core/services/backend-api.service';
import { HeroEditService } from './hero-edit.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
})
export class HeroEditComponent extends BaseComponent implements OnInit, OnDestroy {
  @Output() saved = new EventEmitter();

  editing = false;
  heroForm: FormGroup;
  subscrption: any;

  constructor(
    private _heroEditService: HeroEditService,
    private _backApi: BackendApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this._buildForm();
  }

  cancel() {
    this.editing = false;
  }

  save() {
    const formValues = this.heroForm.getRawValue();
    this.subscrption = this._backApi
      .saveHero(formValues)
      .subscribe((response) => {
        this.heroForm.reset()
        this.editing = false;
        this.saved.emit()
      });
  }

  private _buildForm() {
    this.heroForm = this._heroEditService.buildFormGroup();
  }

  override ngOnDestroy() {
    console.log(this.subscrption);
  }


}
