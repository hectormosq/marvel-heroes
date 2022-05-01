import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarvelHero } from '@app/core/models/marvel-hero';
import { BackendApiService } from '@app/core/services/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class HeroEditService {
  constructor(private _formBuilder: FormBuilder) {}

  buildFormGroup(hero?: MarvelHero): FormGroup {
    return this._formBuilder.group({
      citizenshipLabel: hero?.citizenshipLabel,
      creatorLabel: hero?.creatorLabel,
      genderLabel: hero?.genderLabel,
      memberOfLabel: hero?.memberOfLabel,
      nameLabel: hero?.nameLabel,
      occupationLabel: hero?.occupationLabel,
      skillsLabel: hero?.skillsLabel,
    });
  }
}
